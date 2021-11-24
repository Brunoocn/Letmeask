import firebase from "firebase/compat/app";

import "../styles/sign-out-button.scss";

export function SignOutButton() {
  const user = firebase.auth().currentUser;

  function handleLogout() {
    if (user) {
      user
        .delete()
        .then(() => {
          window.location.href = "/";
        })
        .catch((error) => {
          console.log(user, "erro");
        });
    }
  }
  if (!user) {
    return <></>;
  }
  return (
    <button className="sing-out" onClick={handleLogout}>
      Sair da sessão
    </button>
  );
}
