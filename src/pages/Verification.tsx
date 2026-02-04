import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function Verification() {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(298);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = () => {
    const verificationCode = code.join("");
    if (verificationCode.length === 6) {
      // Handle verification logic here
      console.log("Verification code:", verificationCode);
      // Navigate to dashboard after successful verification
      navigate("/");
    }
  };

  const handleResendCode = () => {
    setTimeLeft(298);
    setCode(["", "", "", "", "", ""]);
    // Handle resend code logic here
    console.log("Resending code...");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-24 h-24 md:w-32 md:h-32">
            <img 
              src="/logo-icon.svg" 
              alt="ABBE Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Verify</h1>
          <p className="text-muted-foreground">Your code was sent to you via email</p>
        </div>

        {/* Verification Code Inputs */}
        <div className="flex justify-center gap-3">
          {code.map((digit, index) => (
            <Input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-lg font-semibold border-2 focus:border-primary"
            />
          ))}
        </div>

        {/* Verify Button */}
        <Button 
          onClick={handleVerify}
          disabled={code.join("").length !== 6}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-base"
        >
          Verify
        </Button>

        {/* Resend Code */}
        <div className="text-center">
          {timeLeft > 0 ? (
            <p className="text-muted-foreground text-sm">
              Resend code in {formatTime(timeLeft)} seconds
            </p>
          ) : (
            <button
              onClick={handleResendCode}
              className="text-primary hover:text-primary/80 text-sm font-medium underline"
            >
              Resend code
            </button>
          )}
        </div>

        {/* Back to Login */}
        <div className="text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}