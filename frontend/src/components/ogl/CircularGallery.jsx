import { useRef, useEffect } from 'react'
import {
  Renderer,
  Camera,
  Transform,
  Plane,
  Mesh,
  Program,
  Texture,
} from 'ogl'



function debounce(func, wait) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance)
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance)
    }
  })
}

function createTextTexture(gl, text, font = "bold 30px monospace", color = "black") {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  context.font = font
  const metrics = context.measureText(text)
  const textWidth = Math.ceil(metrics.width)
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2)
  canvas.width = textWidth + 20
  canvas.height = textHeight + 20
  context.font = font
  context.fillStyle = color
  context.textBaseline = "middle"
  context.textAlign = "center"
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillText(text, canvas.width / 2, canvas.height / 2)
  const texture = new Texture(gl, { generateMipmaps: false })
  texture.image = canvas
  return { texture, width: canvas.width, height: canvas.height }
}

class Title {
  constructor({ gl, plane, renderer, text, textColor = "#545050", font = "30px sans-serif" }) {
    autoBind(this)
    this.gl = gl
    this.plane = plane
    this.renderer = renderer
    this.text = text
    this.textColor = textColor
    this.font = font
    this.createMesh()
  }
  createMesh() {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor
    )
    const geometry = new Plane(this.gl)
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true
    })
    this.mesh = new Mesh(this.gl, { geometry, program })
    const aspect = width / height
    const textHeight = this.plane.scale.y * 0.15
    const textWidth = textHeight * aspect
    this.mesh.scale.set(textWidth, textHeight, 1)
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05
    this.mesh.setParent(this.plane)
  }
}

class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font
  }) {
    this.extra = 0
    this.geometry = geometry
    this.gl = gl
    this.image = image
    this.index = index
    this.length = length
    this.renderer = renderer
    this.scene = scene
    this.screen = screen
    this.text = text
    this.viewport = viewport
    this.bend = bend
    this.textColor = textColor
    this.borderRadius = borderRadius
    this.font = font
    this.createShader()
    this.createMesh()
    this.createTitle()
    this.onResize()
  }
  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false })
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          if(d > 0.0) {
            discard;
          }
          
          gl_FragColor = vec4(color.rgb, 1.0);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    })
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = this.image
    img.onload = () => {
      texture.image = img
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight]
    }
  }
  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    })
    this.plane.setParent(this.scene)
  }
  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      fontFamily: this.font
    })
  }
  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra

    const x = this.plane.position.x
    const H = this.viewport.width / 2

    if (this.bend === 0) {
      this.plane.position.y = 0
      this.plane.rotation.z = 0
    } else {
      const B_abs = Math.abs(this.bend)
      const R = (H * H + B_abs * B_abs) / (2 * B_abs)
      const effectiveX = Math.min(Math.abs(x), H)

      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX)
      if (this.bend > 0) {
        this.plane.position.y = -arc
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R)
      } else {
        this.plane.position.y = arc
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R)
      }
    }

    this.speed = scroll.current - scroll.last
    this.program.uniforms.uTime.value += 0.04
    this.program.uniforms.uSpeed.value = this.speed

    const planeOffset = this.plane.scale.x / 2
    const viewportOffset = this.viewport.width / 2
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal
      this.isBefore = this.isAfter = false
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal
      this.isBefore = this.isAfter = false
    }
  }
  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen
    if (viewport) {
      this.viewport = viewport
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height]
      }
    }
    this.scale = this.screen.height / 1500
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y]
    this.padding = 2
    this.width = this.plane.scale.x + this.padding
    this.widthTotal = this.width * this.length
    this.x = this.width * this.index
  }
}

class App {
  constructor(container, { items, bend, textColor = "#ffffff", borderRadius = 0, font = "bold 30px Figtree" } = {}) {
    document.documentElement.classList.remove('no-js')
    this.container = container
    this.scroll = { ease: 0.02, current: 0, target: 0, last: 0 }
    this.onCheckDebounce = debounce(this.onCheck, 200)
    this.createRenderer()
    this.createCamera()
    this.createScene()
    this.onResize()
    this.createGeometry()
    this.createMedias(items, bend, textColor, borderRadius, font)
    this.update()
    this.addEventListeners()
  }
  createRenderer() {
    this.renderer = new Renderer({ alpha: true })
    this.gl = this.renderer.gl
    this.gl.clearColor(0, 0, 0, 0)
    this.container.appendChild(this.gl.canvas)
  }
  createCamera() {
    this.camera = new Camera(this.gl)
    this.camera.fov = 45
    this.camera.position.z = 20
  }
  createScene() {
    this.scene = new Transform()
  }
  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100
    })
  }
  createMedias(items, bend = 1, textColor, borderRadius, font) {
    const defaultItems = [
      { image: "data:image/jpeg;base64,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", text: '-' },
      { image: "data:image/jpeg;base64,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", text: '-' },
      { image: "data:image/jpeg;base64,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", text: '-' },
      { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_QMNgwLHuq5g8PR0cFvgpqQ0F5AM8_knaOw&s", text: '-' },
      { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7MassrOOcT8e43YXnmXhsiFOsbfQmdZik-Q&s", text: '-' },
      { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-fO_olMTyAgpYzWWNUBeNpETkOQhFLUFXbA&s", text: '-' },
      
      
    ]
    const galleryItems = items && items.length ? items : defaultItems
    this.mediasImages = galleryItems.concat(galleryItems)
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font
      })
    })
  }
  onTouchDown(e) {
    this.isDown = true
    this.scroll.position = this.scroll.current
    this.start = e.touches ? e.touches[0].clientX : e.clientX
  }
  onTouchMove(e) {
    if (!this.isDown) return
    const x = e.touches ? e.touches[0].clientX : e.clientX
    const distance = (this.start - x) * 0.02
    this.scroll.target = this.scroll.position + distance
  }
  onTouchUp() {
    this.isDown = false
    this.onCheck()
  }
  onWheel() {
    this.scroll.target += 0.5
    this.onCheckDebounce()
  }

  
  onCheck() {
    if (!this.medias || !this.medias[0]) return
    const width = this.medias[0].width
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width)
    const item = width * itemIndex
    this.scroll.target = this.scroll.target < 0 ? -item : item
  }
  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    }
    this.renderer.setSize(this.screen.width, this.screen.height)
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    })
    const fov = (this.camera.fov * Math.PI) / 180
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect
    this.viewport = { width, height }
    if (this.medias) {
      this.medias.forEach((media) =>
        media.onResize({ screen: this.screen, viewport: this.viewport })
      )
    }
  }
  update() {
    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    )
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left'
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction))
    }
    this.renderer.render({ scene: this.scene, camera: this.camera })
    this.scroll.last = this.scroll.current
    this.raf = window.requestAnimationFrame(this.update.bind(this))
  }
  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this)
    this.boundOnWheel = this.onWheel.bind(this)
    this.boundOnTouchDown = this.onTouchDown.bind(this)
    this.boundOnTouchMove = this.onTouchMove.bind(this)
    this.boundOnTouchUp = this.onTouchUp.bind(this)
    window.addEventListener('resize', this.boundOnResize)
    window.addEventListener('mousewheel', this.boundOnWheel)
    window.addEventListener('wheel', this.boundOnWheel)
    window.addEventListener('mousedown', this.boundOnTouchDown)
    window.addEventListener('mousemove', this.boundOnTouchMove)
    window.addEventListener('mouseup', this.boundOnTouchUp)
    window.addEventListener('touchstart', this.boundOnTouchDown)
    window.addEventListener('touchmove', this.boundOnTouchMove)
    window.addEventListener('touchend', this.boundOnTouchUp)
  }
  destroy() {
    window.cancelAnimationFrame(this.raf)
    window.removeEventListener('resize', this.boundOnResize)
    window.removeEventListener('mousewheel', this.boundOnWheel)
    window.removeEventListener('wheel', this.boundOnWheel)
    window.removeEventListener('mousedown', this.boundOnTouchDown)
    window.removeEventListener('mousemove', this.boundOnTouchMove)
    window.removeEventListener('mouseup', this.boundOnTouchUp)
    window.removeEventListener('touchstart', this.boundOnTouchDown)
    window.removeEventListener('touchmove', this.boundOnTouchMove)
    window.removeEventListener('touchend', this.boundOnTouchUp)
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas)
    }
  }
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 30px Figtree"
}) {
  const containerRef = useRef(null)
  useEffect(() => {
    const app = new App(containerRef.current, { items, bend, textColor, borderRadius, font })
    return () => {
      app.destroy()
    }
  }, [items, bend, textColor, borderRadius, font])
  return (
    <div className='w-full h-full overflow-hidden cursor-grab active:cursor-grabbing' ref={containerRef} />
  )
}
