"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const request = await axios.post(
        "http://localhost:8080/users/login",
        { email, password },
        {
          withCredentials: true,
        }
      );

      alert("Login realizado com sucesso!");
      console.log("Cookie: ", request.headers);
      router.push("/finances");
    } catch (err) {
      console.error(err);
      setError("Credenciais inválidas ou erro no servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Entrar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default LoginForm;
