import React, { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import NewTaskForm from "../components/NewTaskForm";
import ProfileCard from "../components/ProfileCard";
import EditProfile from "../components/EditProfile";

function Dashboard() {
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem("user"));
    if (userStorage) setUser(userStorage);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const irParaAdmin = () => {
    window.location.href = "/admin";
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Painel de Tarefas - Blue Ocean</h1>
        <div style={styles.actions}>
          {user?.role === "master" && (
            <button
              style={{ ...styles.editButton, background: "#6c63ff" }}
              onClick={irParaAdmin}
            >
              Painel Admin
            </button>
          )}
          <button style={styles.editButton} onClick={() => setMostrarEditar(!mostrarEditar)}>
            ⚙️ Editar Perfil
          </button>
          <button style={styles.logout} onClick={handleLogout}>Sair</button>
        </div>
      </div>

      {mostrarEditar && (
        <div style={styles.editarWrapper}>
          <EditProfile />
        </div>
      )}

      <div style={styles.wrapper}>
        <ProfileCard />
        <NewTaskForm />
      </div>

      <TaskList />
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    maxWidth: "900px",
    margin: "auto",
    position: "relative",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    marginBottom: "10px",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "30px",
  },
  logout: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  editButton: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  editarWrapper: {
    marginBottom: "30px",
  },
};

export default Dashboard;
