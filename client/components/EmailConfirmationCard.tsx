import React, { useState } from "react";
import { authAPI } from "@/services/api";

interface EmailConfirmationCardProps {
  email?: string;
  onResend?: () => void;
  onClose?: () => void;
}

export default function EmailConfirmationCard({
  email,
  onResend,
  onClose,
}: EmailConfirmationCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleConfirm = async () => {
    setError(null);
    setSuccessMessage(null);
    try {
      setIsLoading(true);
      const userEmail = localStorage.getItem("userEmail") || "";

      if (!userEmail) {
        setError("Email not found. Please sign up first.");
        return;
      }

      const response: any = await authAPI.sendVerificationEmail(userEmail);
      if (response.success) {
        setSuccessMessage("Verification email sent successfully");
        if (onResend) {
          onResend();
        }
      } else {
        setError(response.error?.message || "Failed to send verification email");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send verification email"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        padding: 18,
        boxSizing: "border-box",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        style={{
          width: "clamp(300px, 88%, 520px)",
          background: "#ffffff",
          borderRadius: 12,
          padding: "18px",
          boxShadow: "0 18px 48px rgba(11,16,51,0.12)",
          boxSizing: "border-box",
          zIndex:1000
        }}
      >
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
          Check your inbox
        </h3>
        <p style={{ marginTop: 8, color: "#475569" }}>
          We sent a confirmation link to{" "}
          <strong>{email ?? "your email"}</strong>. Click the link to complete
          sign up.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
            {successMessage}
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 16,
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={onResend}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              background: "#fff",
              color: "#2B21DA",
              border: "1px solid #E6E6E6",
              fontWeight: 700,
              minWidth: 120,
            }}
          >
            Resend email
          </button>

          <button
            onClick={onClose}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              background: "#2B21DA",
              color: "#fff",
              border: "none",
              fontWeight: 700,
              minWidth: 120,
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
