import React from "react";
import { Mail, Lock, User } from "lucide-react";

type Props = {
  onSignup?: (data: { name: string; email: string; password: string }) => void;
  isLoading?: boolean;
};

export default function SignupCard({ onSignup, isLoading = false }: Props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup?.({ name, email, password });
  };

  return (
    <div
      style={{
        position: "relative",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <form
        onSubmit={submit}
        style={{
          width: "clamp(320px, 92%, 560px)",
          background: "#ffffff",
          borderRadius: 14,
          padding: "18px",
          boxShadow: "0 14px 40px rgba(11,16,51,0.08)",
          boxSizing: "border-box",
        }}
        aria-label="Signup form"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>Full name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #E6E6E6",
              fontSize: 14,
              boxSizing: "border-box",
            }}
          />

          <label style={{ fontSize: 13, fontWeight: 600 }}>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #E6E6E6",
              fontSize: 14,
              boxSizing: "border-box",
            }}
          />

          <label style={{ fontSize: 13, fontWeight: 600 }}>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #E6E6E6",
              fontSize: 14,
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 10,
              background: "#2B21DA",
              color: "#FFFFFF",
              fontWeight: 700,
              border: "none",
              cursor: isLoading ? "default" : "pointer",
            }}
            aria-busy={isLoading}
          >
            {isLoading ? "Creating…" : "Create account"}
          </button>
        </div>
      </form>
                    {/* Additional text */}
              <p className="text-gray-600 text-sm mt-8">
                Already have an account?{" "}
                <a href="#" className="text-primary font-semibold hover:underline">
                  Sign in
                </a>
              </p>
    </div>
  );
}
