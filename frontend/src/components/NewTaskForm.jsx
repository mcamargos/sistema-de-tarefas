import React, { useState } from "react";
import api from "../services/api";

function NewTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("baixa");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userStorage = JSON.parse(localStorage.getItem("user"));
    if (!userStorage) return;

    try {
      await api.post("/tasks/create", {
        userId: userStorage.id,
        title,
        description,
        dueDate,
        priority,
      });

      setMensagem("Tarefa criada com sucesso!");
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("baixa");
    } catch (err) {
      setMensagem("Erro ao criar tarefa.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>📝 Nova Tarefa</h3>
      <input
        style={styles.input}
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        style={styles.input}
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <select
        style={styles.input}
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="baixa">Baixa</option>
        <option value="media">Média</option>
        <option value="alta">Alta</option>
      </select>
      <button style={styles.button} type="submit">Criar</button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
}

const styles = {
  form: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "20px",
    background: "#f8f8f8",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    border: "1px solid #ffffff", // borda azul
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

export default NewTaskForm;
