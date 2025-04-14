import React, { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import NewTaskForm from "../components/NewTaskForm";
import ProfileCard from "../components/ProfileCard";
import EditProfile from "../components/EditProfile";

function Dashboard() {
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [user, setUser] = useState(null);
  const [recarregar, setRecarregar] = useState(false);

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

  const buscarTarefas = () => {
    setRecarregar((prev) => !prev); // força recarregamento no TaskList
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Painel de Tarefas - Blue Ocean</h1>
        <div>
          {user?.role === "master" && (
            <button
              style={{ ...styles.editButton, background: "#6c63ff", marginRight: "10px" }}
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

      <div style={styles.wrapper}>
        <ProfileCard />
        <NewTaskForm onTaskCreated={buscarTarefas} />
      </div>

      <TaskList recarregar={recarregar} />

      {mostrarEditar && (
        <div style={styles.editarWrapper}>
          <EditProfile />
        </div>
      )}
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
    marginLeft: "10px",
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
    position: "absolute",
    top: "100px",
    right: "40px",
    width: "300px",
    zIndex: 10,
  },
};

export default Dashboard;