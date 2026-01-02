import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // 🔥 Import this

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // login | register
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const apiBase = `${import.meta.env.VITE_API_URL}`;
  const [loading, setLoading] = useState(false);


  const handleChange = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  const handleSubmit = async () => {
  if (loading) return; // 🚫 prevent double click

  setLoading(true);

  try {
    if (mode === "register") {
      if (!form.name || !form.email || form.password.length < 4) {
        toast.error("Fill all fields correctly (password min 4)");
        setLoading(false);
        return;
      }

      const res = await fetch(`${apiBase}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.message);
        setLoading(false);
        return;
      }

      toast.success("Registered successfully! Now login ✅");
      setMode("login");
      setForm({ name: "", email: "", password: "" });

    } else {
      if (!form.email || form.password.length < 4) {
        toast.error("Enter valid credentials");
        setLoading(false);
        return;
      }

      const res = await fetch(`${apiBase}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.message);
        setLoading(false);
        return;
      }

      toast.success("Logged in successfully 🎉");

      localStorage.setItem("token", data.jwttoken);
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);
      localStorage.setItem("_id", data._id);
      window.dispatchEvent(new Event("auth-change"));

      onClose();
      navigate("/");
    }
  } catch (err) {
    toast.error("Server error occurred");
  } finally {
    setLoading(false); // ✅ ALWAYS stop loader
  }
};


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-2xl font-black mb-6">
              {mode === "login" ? "Login" : "Register"}
            </h2>

            {mode === "register" && (
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm mb-4"
              />
            )}

            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm mb-4"
            />

            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm mb-6"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold transition
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:opacity-90"}
    text-white flex items-center justify-center gap-2`}
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {mode === "login" ? "Logging in..." : "Registering..."}
                </>
              ) : mode === "login" ? (
                "Login"
              ) : (
                "Register"
              )}
            </button>
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="mt-4 w-full text-xs text-gray-500 hover:underline"
            >
              {mode === "login"
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
