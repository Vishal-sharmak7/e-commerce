import Cart from "../models/cart.js";
import ProductModel from "../models/merch.model.js";

// POST: Add to cart
const handleCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const product = await ProductModel.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const item = cart.items.find(i => i.product.toString() === productId);
      if (item) {
        item.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET: Get cart by userId
const handleGetCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate("items.product");
    if (!cart) {
      return res.status(200).json({ items: [] }); // empty cart
    }
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// PUT: Update cart item quantity
const handleUpdate = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const item = cart.items.find(i => i.product.toString() === productId);
    if (item) {
      item.quantity = quantity;
      await cart.save();
      return res.json(cart);
    }

    res.status(404).json({ error: "Item not in cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE: Remove item from cart
const handleRemove = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.items = cart.items.filter(i => i.product.toString() !== productId);
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};



const handledeleteCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ user: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export default {
  handleCart,
  handleGetCart,
  handleUpdate,
  handleRemove,
  handledeleteCart,
};
