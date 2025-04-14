import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const res = await axios.post("http://localhost:3000/api/users/register", {
        name,
        email,
        password,
        role,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "master") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setErro("Erro ao registrar. Tente outro email.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
        <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.input}>
          <option value="user">Cientista de Dados</option>
          <option value="dev">Dev. FullStack</option>
          <option value="designer">UI/UX</option>
          <option value="master">Adm. Master</option>
        </select>
        <button type="submit" style={styles.button}>Cadastrar</button>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "100px auto",
    padding: "20px",
    background: "#e6f0ff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Register;
