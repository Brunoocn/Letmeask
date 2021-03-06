import { useHistory } from "react-router";
import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

import illustrationImg from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";
import googleIconImg from "../assets/google-icon.svg";
import githubIconImg from "../assets/github-icon.svg";

import { Button } from "../components/Button";

import "../styles/auth.scss";

export function Home() {
  const history = useHistory();
  const { singInWithGithub, singInWithGoogle, user } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateNewRoom() {
    if (!user) {
      await singInWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function handleCreateNewRoomWithGithub() {
    if(!user) {
      await singInWithGithub();
    }
    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists.");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Room already closed.");
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Illustration" />
        <strong>Crie salas de Q&amp;A ao vivo.</strong>
        <p>Tire suas dúvidas em tempo-real.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateNewRoomWithGithub} className="create-room-github">
            <img src={githubIconImg} alt="Logo do Github" />
            Crie sua sala usando o Github
          </button>
          <button onClick={handleCreateNewRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala usando o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entre na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
