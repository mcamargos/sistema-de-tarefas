import React, { useEffect, useState } from "react";
import api from "../services/api";

function TaskList({ recarregar }) {
  const [tarefas, setTarefas] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const buscarTarefas = async () => {
    const userStorage = JSON.parse(localStorage.getItem("user"));
    if (userStorage) {
      try {
        const res = await api.get(`/tasks/list/${userStorage.id}`);
        setTarefas(res.data.tarefas);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    buscarTarefas();
  }, [recarregar]);

  const concluirTarefa = async (id) => {
    try {
      await api.patch(`/tasks/complete/${id}`);
      setMensagem("Tarefa concluída!");
      buscarTarefas();
    } catch (err) {
      setMensagem("Erro ao concluir tarefa.");
    }
  };

  if (tarefas.length === 0) return <p style={{ textAlign: "center" }}>Nenhuma tarefa cadastrada.</p>;

  return (
    <div>
      <h3>📋 Minhas Tarefas</h3>
      {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}
      <ul style={styles.lista}>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} style={styles.item}>
            <div>
              <strong>{tarefa.title}</strong><br />
              <span>{tarefa.description}</span><br />
              <small>Prazo: {tarefa.dueDate}</small><br />
              <small>Status: {tarefa.status}</small>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={styles.prioridade}>Prioridade: {tarefa.priority}</p>
              {(tarefa.status === "pendente" || tarefa.status === "atrasada") && (
                <button style={styles.botao} onClick={() => concluirTarefa(tarefa.id)}>
                  Concluir
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  lista: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  item: {
    padding: "15px",
    background: "#f1f1f1",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ffffff",
  },
  prioridade: {
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  botao: {
    marginTop: "3px",
    padding: "10px 40px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
};

export default TaskList;