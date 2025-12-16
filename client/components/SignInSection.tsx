import React, { useState } from "react";
import SignupModal from "./SignupModel";
import LoginForm from "./LoginForm";

export type SignInData = {
  name: string;
  email: string;
  password: string;
};

type Props = {
  onSubmit?: (data: SignInData) => void;
  className?: string;
  containerStyle?: React.CSSProperties;
};

export default function SignInSection({ onSubmit, className, containerStyle }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ name, email, password });
  };

  return (
     <div
      className={className}
      style={{
        //width: "100%",
        //display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        gap: "1rem",
        ...containerStyle,
      }}
      aria-label="sign-in-section"
    >
    <LoginForm onSubmit={onSubmit} onSignUpClick={() => setIsSignUpOpen(true)} />

    </div>
    // <div
    //   className={className}
    //   style={{
    //     width: "100%",
    //     display: "flex",
    //     flexDirection: "column",
    //     justifyContent: "center",
    //     height: "100%",
    //     gap: "1rem",
    //     ...containerStyle,
    //   }}
    //   aria-label="sign-in-section"
    // >
    //   <form
    //     onSubmit={handleSubmit}
    //     style={{
    //       background: "#F0F7FF",
    //       borderRadius: 12,
    //       padding: 16,
    //       boxShadow: "0 8px 24px rgba(11,16,51,0.06)",
    //       display: "flex",
    //       flexDirection: "column",
    //       gap: 12,
    //     }}
    //   >
    //     <input
    //       name="name"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //       placeholder="Name"
    //       style={{
    //         width: "100%",
    //         padding: "10px 12px",
    //         borderRadius: 8,
    //         border: "1px solid #E6E6E6",
    //         fontSize: 14,
    //         boxSizing: "border-box",
    //         color: "black",
    //       }}
    //     />
    //     <input
    //       name="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       type="email"
    //       placeholder="Email / Phone"
    //       style={{
    //         width: "100%",
    //         padding: "10px 12px",
    //         borderRadius: 8,
    //         border: "1px solid #E6E6E6",
    //         fontSize: 14,
    //         boxSizing: "border-box",
    //         color: "black",
    //       }}
    //     />
    //     <input
    //       name="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       type="password"
    //       placeholder="Password"
    //       style={{
    //         width: "100%",
    //         padding: "10px 12px",
    //         borderRadius: 8,
    //         border: "1px solid #E6E6E6",
    //         fontSize: 14,
    //         boxSizing: "border-box",
    //         color: "black",
    //       }}
    //     />
    //     <button
    //       type="submit"
    //       style={{
    //         width: "100%",
    //         padding: "12px",
    //         borderRadius: 10,
    //         background: "#2B21DA",
    //         color: "#FFFFFF",
    //         fontWeight: 600,
    //         border: "none",
    //         cursor: "pointer",
    //       }}
    //     >
    //       Login
    //     </button>

    //     <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "stretch", marginTop: 6 }}>
    //       <button
    //         type="button"
    //         style={{
    //           width: "100%",
    //           display: "inline-flex",
    //           gap: 12,
    //           alignItems: "center",
    //           justifyContent: "center",
    //           padding: "10px 12px",
    //           borderRadius: 10,
    //           background: "#FFFFFF",
    //           border: "1px solid #E6E6E6",
    //           cursor: "pointer",
    //           fontWeight: 500,
    //           color: "#2B21DA",
    //         }}
    //         aria-label="Sign in with Google"
    //       >
    //         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    //           <path d="M21 12.22c0-.68-.06-1.34-.18-1.98H12v3.76h5.36c-.23 1.24-.9 2.29-1.92 3.01v2.5h3.1C19.78 18.6 21 15.6 21 12.22z" fill="#4285F4" />
    //           <path d="M12 22c2.7 0 4.96-.9 6.61-2.45l-3.1-2.5c-.86.58-1.97.92-3.51.92-2.7 0-4.99-1.82-5.81-4.28H2.97v2.69C4.6 19.85 8 22 12 22z" fill="#34A853" />
    //           <path d="M6.19 13.69A6.005 6.005 0 016 12c0-.64.11-1.26.31-1.84V7.47H2.97A9.996 9.996 0 002 12c0 1.6.34 3.12.97 4.47l3.22-2.78z" fill="#FBBC05" />
    //           <path d="M12 6.44c1.47 0 2.79.5 3.82 1.48l2.86-2.86C16.95 3.2 14.7 2 12 2 8 2 4.6 4.15 2.97 7.47l3.22 2.69C7.01 8.27 9.3 6.44 12 6.44z" fill="#EA4335" />
    //         </svg>
    //         <span style={{ color: "inherit" }}>Sign in with Google</span>
    //       </button>

    //       <button
    //         type="button"
    //         style={{
    //           width: "100%",
    //           display: "inline-flex",
    //           gap: 12,
    //           alignItems: "center",
    //           justifyContent: "center",
    //           padding: "10px 12px",
    //           borderRadius: 10,
    //           background: "#1877F2",
    //           border: "none",
    //           cursor: "pointer",
    //           fontWeight: 500,
    //           color: "#FFFFFF",
    //         }}
    //         aria-label="Sign in with Facebook"
    //       >
    //         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    //           <path d="M15 8h1.8V5.4H15c-1.3 0-2.2.9-2.2 2.2V9H11v2.4h1.8V19H15v-7.6H16.8L17 11.4H15V10.6c0-.3.1-.6.3-.8.2-.2.5-.2.7-.2z" fill="#FFFFFF" />
    //         </svg>
    //         <span>Sign in with Facebook</span>
    //       </button>

    //       <button
    //         type="button"
    //         style={{
    //           width: "100%",
    //           display: "inline-flex",
    //           gap: 12,
    //           alignItems: "center",
    //           justifyContent: "center",
    //           padding: "10px 12px",
    //           borderRadius: 10,
    //           background: "#FFFFFF",
    //           border: "1px solid #E6E6E6",
    //           cursor: "pointer",
    //           fontWeight: 500,
    //           color: "#2B21DA",
    //         }}
    //         aria-label="Sign in with Apple"
    //       >
    //         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    //           <path d="M16.365 1.43c-.84.96-1.88 1.6-3.07 1.6-.13-1.32.4-2.41 1.22-3.24.65-.67 1.6-.96 2.73-.8-.19.44-.43.86-.88 1.44zM20.9 7.3c-1.02-1.18-2.24-1.92-3.7-2.23-1.1-.25-2.39-.04-3.7.64-.46.24-.98.24-1.46.02-1.07-.49-2.19-.79-3.32-.88-1.42-.11-2.88.33-4.04 1.37-1.95 1.72-2.5 4.93-1.2 7.77.9 1.78 2.36 3.41 4.24 3.77 1.05.24 2.14-.08 3.02-.55.54-.28 1.03-.67 1.58-1.02.75-.45 1.6-.5 2.45-.2 1.4.5 2.5 1.2 3.58 2.3.58.56 1.36.9 2.08 1.02.78.13 1.58-.08 2.17-.55 1.25-.89 1.74-2.62 1.28-4.14-.5-1.7-2.07-3.05-3.85-3.8-.77-.3-1.6-.5-2.42-.67.33-.35.66-.66 1-.96 1.1-1 1.85-2.4 1.81-3.94-.02-.75-.2-1.44-.58-2.01z" fill="#000000" />
    //         </svg>
    //         <span style={{ color: "inherit" }}>Sign in with Apple</span>
    //       </button>
    //     </div>

    //     <div style={{ textAlign: "center", marginTop: 6 }}>
    //       <small style={{ color: "#666", fontSize: 12 }}>
    //         Don't have an account?{" "}
    //         <a href="#" 
    //         onClick={(e) => {
    //               e.preventDefault();
    //               setIsSignUpOpen(true); // 👈 open signup modal
    //             }}
    //         style={{ color: "#2B21DA", fontWeight: 600, textDecoration: "none" }}>
    //           Sign up
    //         </a>
    //       </small>
    //     </div>
    //   </form>
    //   {isSignUpOpen && (
    //     <SignupModal
    //       open={isSignUpOpen}
    //       onOpenChange={(open) => setIsSignUpOpen(open)}
    //     />
    //   )}
    // </div>
    
  );
}