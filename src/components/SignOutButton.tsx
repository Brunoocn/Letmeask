import { useHistory } from "react-router";
import firebase from 'firebase/compat/app'

import "../styles/sign-out-button.scss";


export function SignOutButton() {
  const history = useHistory();

  function handleLogout() {
    firebase.auth().signOut().then(() => {
      console.log('deu certo')
      history.push('/')
    }).catch((error) => {
      alert('Ocorreu um erro')
    });
  }
  return(
    <button className="sing-out" onClick={handleLogout}>Sair da sessão</button>
  );
}
