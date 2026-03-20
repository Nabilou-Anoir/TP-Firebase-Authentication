// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRmw_ajnMrW40Ty7i-WTyJWwhCvRBtrBQ",
  authDomain: "tp-firebase-273e6.firebaseapp.com",
  projectId: "tp-firebase-273e6",
  storageBucket: "tp-firebase-273e6.firebasestorage.app",
  messagingSenderId: "666456282030",
  appId: "1:666456282030:web:c4e19d72266d1cd5c92e3f",
  measurementId: "G-D11DK5YYL0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function setMessage(elementId, text, type = "") {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.textContent = text;
  element.classList.remove("error", "success");

  if (type) {
    element.classList.add(type);
  }
}

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  if (page === "login") {
    const loginForm = document.getElementById("login-form");
    const googleLoginButton = document.getElementById("google-login-button");

    loginForm?.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value.trim();

      if (!email || !password) {
        setMessage("login-message", "Veuillez renseigner l'e-mail et le mot de passe.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        setMessage("login-message", "L'adresse e-mail saisie n'est pas valide.", "error");
        return;
      }

      setMessage(
        "login-message",
        "Formulaire prêt. À compléter avec Firebase Authentication (connexion).",
        "success"
      );
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setMessage("login-message", "Connexion réussie.", "success");
          window.location.href = "dashboard.html";
        })
        .catch((error) => {
          let message = "Échec de la connexion.";

          if (error.code === "auth/invalid-credential") {
            message = "E-mail ou mot de passe incorrect.";
          } else if (error.code === "auth/user-not-found") {
            message = "Compte inexistant.";
          } else if (error.code === "auth/wrong-password") {
            message = "Mot de passe incorrect.";
          } else if (error.code === "auth/invalid-email") {
            message = "Adresse e-mail invalide.";
          }

          setMessage("login-message", message, "error");
          console.error(error);
        });
    });

    googleLoginButton?.addEventListener("click", async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        setMessage(
          "login-message",
          `Connexion Google réussie : ${result.user.email}`,
          "success"
        );
        window.location.href = "dashboard.html";
      } catch (error) {
        let message = "Échec de la connexion avec Google.";

        if (error.code === "auth/popup-closed-by-user") {
          message = "La fenêtre Google a été fermée avant la connexion.";
        } else if (error.code === "auth/cancelled-popup-request") {
          message = "Connexion Google annulée.";
        } else if (error.code === "auth/popup-blocked") {
          message = "La fenêtre pop-up a été bloquée par le navigateur.";
        }

        setMessage("login-message", message, "error");
        console.error(error);
      }
    });
  }

  if (page === "register") {
    const registerForm = document.getElementById("register-form");

    registerForm?.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("register-name").value.trim();
      const email = document.getElementById("register-email").value.trim();
      const password = document.getElementById("register-password").value;
      const passwordConfirm = document.getElementById("register-password-confirm").value;

      if (!name || !email || !password || !passwordConfirm) {
        setMessage("register-message", "Tous les champs sont obligatoires.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        setMessage("register-message", "L'adresse e-mail saisie n'est pas valide.", "error");
        return;
      }

      if (password.length < 6) {
        setMessage(
          "register-message",
          "Le mot de passe doit comporter au moins 6 caractères.",
          "error"
        );
        return;
      }

      if (password !== passwordConfirm) {
        setMessage("register-message", "Les mots de passe ne correspondent pas.", "error");
        return;
      }

      setMessage(
        "register-message",
        "Formulaire prêt. À compléter avec Firebase Authentication (création de compte).",
        "success"
      );

      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          try {
            await updateProfile(userCredential.user, {
              displayName: name
            });
          } catch (e) {
            console.error("Profil non mis à jour :", e);
          }

          setMessage("register-message", "Compte créé avec succès.", "success");
          window.location.href = "dashboard.html";
        })
        .catch((error) => {
          let message = "Impossible de créer le compte.";

          if (error.code === "auth/email-already-in-use") {
            message = "Un compte existe déjà avec cette adresse e-mail.";
          } else if (error.code === "auth/invalid-email") {
            message = "Adresse e-mail invalide.";
          } else if (error.code === "auth/weak-password") {
            message = "Mot de passe trop faible.";
          }

          setMessage("register-message", message, "error");
          console.error(error);
        });
    });
  }

  if (page === "forgot-password") {
    const forgotForm = document.getElementById("forgot-password-form");

    forgotForm?.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = document.getElementById("forgot-email").value.trim();

      if (!email) {
        setMessage("forgot-message", "Veuillez saisir votre adresse e-mail.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        setMessage("forgot-message", "L'adresse e-mail saisie n'est pas valide.", "error");
        return;
      }

      setMessage(
        "forgot-message",
        "Formulaire prêt. À compléter avec Firebase Authentication (réinitialisation).",
        "success"
      );

      sendPasswordResetEmail(auth, email)
        .then(() => {
          setMessage(
            "forgot-message",
            "E-mail de réinitialisation envoyé si l'adresse est reconnue.",
            "success"
          );
        })
        .catch((error) => {
          let message = "Impossible d'envoyer l'e-mail de réinitialisation.";

          if (error.code === "auth/invalid-email") {
            message = "Adresse e-mail invalide.";
          }

          setMessage("forgot-message", message, "error");
          console.error(error);
        });
    });
  }

  if (page === "dashboard") {
    const userDisplay = document.getElementById("user-display");
    const logoutButton = document.getElementById("logout-button");
    const logoutLink = document.getElementById("logout-link");

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const name = user.displayName || "Utilisateur";
        const email = user.email || "";
        userDisplay.textContent = `${name} (${email})`;
        setMessage("dashboard-message", "Utilisateur connecté.", "success");
      } else {
        window.location.href = "index.html";
      }
    });

    const logoutHandler = async (event) => {
      event.preventDefault();

      try {
        await signOut(auth);
        setMessage("dashboard-message", "Déconnexion réussie.", "success");
        window.location.href = "index.html";
      } catch (error) {
        setMessage("dashboard-message", "Erreur lors de la déconnexion.", "error");
        console.error(error);
      }
    };

    logoutButton?.addEventListener("click", logoutHandler);
    logoutLink?.addEventListener("click", logoutHandler);
  }
});