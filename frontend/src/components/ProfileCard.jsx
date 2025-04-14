import React, { useEffect, useState } from "react";
import api from "../services/api";

function ProfileCard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem("user"));
    if (userStorage) {
      api
        .get(`/users/profile/${userStorage.id}`)
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  if (!user) return <p>Carregando perfil...</p>;

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>🧑‍💼 Dados Pessoais</h3>
      <p><strong>Nome:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Cargo:</strong> {traduzirCargo(user.role)}</p>
      <p><strong>Pontos:</strong> {user.points}</p>
      <p><strong>Nível:</strong> {user.level}</p>
    </div>
  );
}

function traduzirCargo(cargo) {
  const mapa = {
    user: "Cientista de Dados",
    dev: "Dev. FullStack",
    designer: "UI/UX",
    master: "Adm. Master",
  };
  return mapa[cargo] || cargo;
}

const styles = {
  card: {
    padding: "20px",
    background: "#f8f8f8",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    flex: 1,
    border: "1px solid #ffffff",
  },
  title: {
    marginBottom: "10px",
    color: "#000000",
  },
};

export default ProfileCard;

