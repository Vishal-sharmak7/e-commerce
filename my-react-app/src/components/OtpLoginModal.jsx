import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OtpLoginModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState("phone"); // phone | otp
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = () => {
    if (phone.length !== 10) return alert("Enter valid phone number");
    // 🔗 API call here (send OTP)
    setStep("otp");
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) return alert("Enter valid OTP");
    // 🔗 API call here (verify OTP)
    alert("Logged in successfully");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 🔒 Background Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* 📦 Modal */}
          <motion.div
            className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* ❌ Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              ✕
            </button>

            {/* 🧠 Content */}
            <h2 className="text-2xl font-black tracking-tight mb-2">
              {step === "phone" ? "Login with OTP" : "Verify OTP"}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {step === "phone"
                ? "Enter your mobile number to receive OTP"
                : `OTP sent to +91 ${phone}`}
            </p>

            {step === "phone" ? (
              <>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                  onClick={handleSendOtp}
                  className="mt-6 w-full bg-black text-white py-3 rounded-xl font-bold tracking-wide hover:opacity-90"
                >
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <input
                  type="number"
                  placeholder="Enter 6 digit OTP"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                  onClick={handleVerifyOtp}
                  className="mt-6 w-full bg-black text-white py-3 rounded-xl font-bold tracking-wide hover:opacity-90"
                >
                  Verify & Login
                </button>

                <button
                  onClick={() => setStep("phone")}
                  className="mt-4 w-full text-xs text-gray-500 hover:underline"
                >
                  Change number
                </button>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OtpLoginModal;
