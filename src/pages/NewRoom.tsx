import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import illustrationImg from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";


import { Button } from '../components/Button';

import '../styles/auth.scss';

export function NewRoom() {
  const { user } = useAuth()
  
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
          <h2>Criar uma nova sala</h2>
          <form>
            <input type="text" placeholder="Nome da sala" />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}