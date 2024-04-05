import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  where,
  query,
} from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";

import { useRef } from "react";

import styles from "../styles/Auth.module.css";
import ToastComponent from "@/components/Toast";

const auth = getAuth();
const db = getFirestore();

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [showUsernameField, setShowUsernameField] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  const formRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        const userDocRef = doc(collection(db, "users"), user.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUsername(userData.username);
        } else {
          setShowUsernameField(true);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFirebaseError = (errorCode) => {
    switch (errorCode) {
      case "auth/user-not-found":
        return ToastComponent("Потребителят не е намерен.", "error");
      case "auth/wrong-password":
        return ToastComponent("Невалидна парола.", "error");
      case "auth/invalid-login-credentials":
        return ToastComponent(
          "Невалидни данни за вход. Моля, проверете вашия имейл и парола.",
          "error"
        );
      case "auth/invalid-email":
        return ToastComponent(
          "Невалиден email. Моля опитайте с друг.",
          "error"
        );
      case "auth/missing-password":
        return ToastComponent("Липсва парола.", "error");
      case "auth/email-already-in-use":
        return ToastComponent("Този email вече е регистриран.", "error");
      case "auth/account-exists-with-different-credential":
        return ToastComponent(
          "Потребителят вече съществува, но с друг вход.",
          "error"
        );
      case "auth/user-cancelled":
        return ToastComponent("Потребителят отказа.", "error");
      default:
        return 0;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");

      setError("");
      ToastComponent("Успешно вписване", "success");
      router.push("/");
    } catch (error) {
      setError(handleFirebaseError(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Signup successful");
      await sendEmailVerification(userCredential.user);
      router.push("/ConfirmEmail");
    } catch (error) {
      setError(handleFirebaseError(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      console.log("Google sign-in successful");
      const isNewUser = userCredential.additionalUserInfo.isNewUser;
      setUsername("");
      console.log("1");
      if (isNewUser) {
        const newPassword = prompt("Please enter a password:");
        if (newPassword === null) {
          return;
        }

        try {
          setLoading(true);
          await createUserWithEmailAndPassword(
            auth,
            userCredential.user.email,
            newPassword
          );
          console.log("Signup successful with user-set password");
          await sendEmailVerification(userCredential.user);
          router.push("/ConfirmEmail");
        } catch (error) {
          setError(handleFirebaseError(error.code));
        } finally {
          setLoading(false);
        }
      } else {
        // Handle the case for returning users if necessary
      }

      setEmail("");
      setPassword("");
      setError("");

      console.log("2");
      setLoading(false);
      ToastComponent("Успешно вписване", "success");
      router.push("/");
      console.log("3");
    } catch (error) {
      setError(handleFirebaseError(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      setLoading(true);
      const provider = new GithubAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      console.log("GitHub sign-in successful");

      const isNewUser = userCredential.additionalUserInfo.isNewUser;
      setUsername("");

      if (isNewUser) {
        const newPassword = prompt("Please enter a password:");
        if (newPassword === null) {
          return;
        }

        try {
          setLoading(true);
          await createUserWithEmailAndPassword(
            auth,
            userCredential.user.email,
            newPassword
          );
          console.log("Signup successful with user-set password");
          await sendEmailVerification(userCredential.user);
          router.push("/ConfirmEmail");
        } catch (error) {
          setError(handleFirebaseError(error.code));
        } finally {
          setLoading(false);
        }
      } else {
        // Handle the case for returning users if necessary
      }

      setEmail("");
      setPassword("");
      setError("");

      setLoading(false);
      ToastComponent("Успешно вписване", "success");
      router.push("/");
    } catch (error) {
      setError(handleFirebaseError(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const userQuery = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        setError("Username already exists. Please try another one.");
        return;
      }

      const userDocRef = doc(collection(db, "users"), user.uid);
      const userData = {
        username: username,
        email: user.email,
      };
      await setDoc(userDocRef, userData);
      setShowUsernameField(false);
      setUsername("");
      setError("");
      router.push(`/profile/${username}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    const handleRegisterClick = () => {
      container.classList.add(`${styles.active}`);
      setIsActive(true);
    };

    const handleLoginClick = () => {
      container.classList.remove(`${styles.active}`);
      setIsActive(false);
    };

    // Check if registerBtn and loginBtn exist before attaching event listeners
    if (registerBtn && loginBtn) {
      registerBtn.addEventListener("click", handleRegisterClick);
      loginBtn.addEventListener("click", handleLoginClick);

      return () => {
        registerBtn.removeEventListener("click", handleRegisterClick);
        loginBtn.removeEventListener("click", handleLoginClick);
      };
    }

    // Handle the case where either registerBtn or loginBtn is null
    console.error("registerBtn or loginBtn is null.");
  }, [isActive]);

  if (!user) {
    return (
      <body>
        <style>
          {`* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}`}
        </style>
        <div className={styles.container} id="container">
          <div className={`${styles["form-container"]} ${styles["sign-up"]}`}>
            <form onSubmit={handleSignup} ref={formRef}>
              <h1>Създайте профил</h1>
              <div className={styles["social-icons"]}>
                <a onClick={handleGoogleSignIn} className={styles.icon}>
                  <img src="google.png"></img>
                </a>
                <a onClick={handleGitHubSignIn} className={styles.icon}>
                  <img src="github.png"></img>
                </a>
              </div>
              <span>или използвайте имейл за регистрация</span>

              <input
                type="email"
                placeholder="Имейл"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Парола"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
              <button type="submit" className={styles.button}>
                Регистрирайте се
              </button>
            </form>
          </div>
          <div className={`${styles["form-container"]} ${styles["sign-in"]}`}>
            <form onSubmit={handleLogin}>
              <h1>Влезте в профила си</h1>
              <div className={styles["social-icons"]}>
                <a onClick={handleGoogleSignIn} className={styles.icon}>
                  <img src="google.png"></img>
                </a>
                <a onClick={handleGitHubSignIn} className={styles.icon}>
                  <img src="github.png"></img>
                </a>
              </div>
              <span>или използвайте имейл и парола</span>
              <input
                type="email"
                placeholder="Имейл"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Парола"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />

              <button type="submit" className={styles.button}>
                Влезте
              </button>
            </form>
          </div>
          <div className={styles["toggle-container"]}>
            <div className={styles.toggle}>
              <div
                className={`${styles["toggle-panel"]} ${styles["toggle-left"]}`}
              >
                <h1>Добре дошли обратно!</h1>
                <p>
                  Въведете личните си данни, за да използвате всички функции на
                  сайта
                </p>
                <button
                  className={`${styles.hidden} ${styles.login} ${
                    isActive ? styles.active : ""
                  }`}
                  id="login"
                >
                  Влезте
                </button>
              </div>
              <div
                className={`${styles["toggle-panel"]} ${styles["toggle-right"]}`}
              >
                <h1>Здравей, Приятелю!</h1>
                <p>
                  Регистрирайте се с личните си данни, за да използвате всички
                  функции на сайта
                </p>
                <button
                  className={`${styles.hidden} ${styles.register} ${
                    isActive ? styles.active : ""
                  }`}
                  id="register"
                >
                  Регистрирайте се
                </button>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }

  if (showUsernameField) {
    return (
      <div className="container">
        <div className={styles.container} id="container">
          <form onSubmit={handleUsernameSubmit}>
            <input
              type="text"
              placeholder="Потребителско име"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit">Запази Потребителско име</button>
          </form>

          {error && <p>{error}</p>}
        </div>
      </div>
    );
  }
}

export default LoginForm;
