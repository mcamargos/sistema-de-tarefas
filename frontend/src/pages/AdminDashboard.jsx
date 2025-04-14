import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function traduzirCargo(cargo) {
  const mapa = {
    user: "Cientista de Dados",
    dev: "Dev. FullStack",
    designer: "UI/UX",
    master: "Adm. Master",
  };
  return mapa[cargo] || cargo;
}

function AdminDashboard() {
  const [tarefas, setTarefas] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const fetchTarefas = async () => {
    try {
      const res = await api.get("/tasks/admin/all");
      setTarefas(res.data.tarefas);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRanking = async () => {
    try {
      const res = await api.get("/tasks/admin/ranking");
      setRanking(res.data.usuarios);
    } catch (err) {
      console.error(err);
    }
  };

  const aprovarTarefa = async (id) => {
    try {
      const res = await api.patch(`/tasks/admin/aprovar/${id}`);
      setMensagem(res.data.message);
      fetchTarefas();
      fetchRanking();
    } catch (err) {
      setMensagem("Erro ao aprovar tarefa.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    fetchTarefas();
    fetchRanking();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{ color: "#000000" }}>Painel Administrativo - Blue Ocean</h2>
        <button onClick={handleLogout} style={styles.logoutButton}>Sair</button>
      </div>

      {mensagem && <p style={styles.msg}>{mensagem}</p>}

      <h3>📋 Tarefas dos Usuários</h3>
      <ul style={styles.lista}>
        {tarefas.map((t) => (
          <li key={t.id} style={styles.item}>
            <div>
              <strong>{t.title}</strong> - {t.User.name} ({traduzirCargo(t.User.role)})<br />
              Prioridade: {t.priority} | Status: {t.status}
            </div>
            {t.status === "concluida" && (
              <button style={styles.btn} onClick={() => aprovarTarefa(t.id)}>
                Aprovar
              </button>
            )}
          </li>
        ))}
      </ul>

      <h3 style={{ marginTop: "40px" }}>🏆 Ranking de Usuários</h3>
      <ul style={styles.lista}>
        {ranking.map((u) => (
          <li key={u.id} style={styles.rankingItem}>
            <strong>{u.name}</strong> | Cargo: {traduzirCargo(u.role)} | Nível: {u.level} | Pontos: {u.points}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    maxWidth: "900px",
    margin: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  logoutButton: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  lista: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    background: "#f1f1f1",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "6px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ffffff",
  },
  rankingItem: {
    background: "#e6f0ff",
    padding: "10px",
    marginBottom: "5px",
    borderRadius: "4px",
    border: "1px solid #ffffff",
  },
  btn: {
    background: "#28a745",
    color: "#fff",
    padding: "8px 100px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  msg: {
    color: "#28a745",
    marginBottom: "15px",
  },
};

export default AdminDashboard;
