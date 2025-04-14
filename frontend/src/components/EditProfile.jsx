import React, { useState, useEffect } from "react";
import api from "../services/api";

// componente de edição de perfil
function EditProfile() {
  const [user, setUser] = useState({}); // armazena os dados do usuário
  const [mensagem, setMensagem] = useState(""); // mensagem de sucesso ou erro

  // carrega os dados do usuário salvos no localstorage
  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem("user"));
    if (userStorage) {
      setUser(userStorage);
    }
  }, []);

  // atualiza os valores conforme os inputs são preenchidos
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // envia os dados atualizados para a api
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");

    try {
      const res = await api.put(`/users/update/${user.id}`, user);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // atualiza localstorage
      setMensagem("Perfil atualizado com sucesso!");
    } catch (error) {
      setMensagem("Erro ao atualizar perfil.");
    }
  };

  return (
    <div style={styles.container}>
      <h3>Editar Perfil</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* input nome */}
        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Nome"
          value={user.name || ""}
          onChange={handleChange}
        />
        {/* input email */}
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="E-mail"
          value={user.email || ""}
          onChange={handleChange}
        />
        {/* seleção de cargo */}
        <select
          style={styles.input}
          name="role"
          value={user.role || ""}
          onChange={handleChange}
        >
          <option value="user">Cientista de Dados</option>
          <option value="dev">Dev. FullStack</option>
          <option value="designer">UI/UX</option>
          <option value="master">Adm. Master</option>
        </select>
        {/* nova senha */}
        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Nova senha"
          onChange={handleChange}
        />
        {/* botão de salvar */}
        <button style={styles.button} type="submit">Salvar alterações</button>
        {/* mensagem de sucesso ou erro */}
        {mensagem && <p>{mensagem}</p>}
      </form>
    </div>
  );
}

// estilos css inline
const styles = {
  container: {
    padding: "20px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
    marginTop: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    background: "#007bff",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default EditProfile;