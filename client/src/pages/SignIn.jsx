import { useState } from "react";
import axios from "../api/api";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/signin", { email, password });
      alert("Signed in successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Error signing in");
    }
  };

  return (
    <div className="pt-24 min-h-screen flex justify-center items-center px-2">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded mb-2" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded mb-2" required />
        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded w-full mt-2">Sign In</button>
      </form>
    </div>
  );
}
