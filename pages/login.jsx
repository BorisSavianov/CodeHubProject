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
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false); // Added loading state
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const formRef = useRef(null);

  const scrollToTop = () => {
    formRef.current.scrollTop = 0;
  };

  const handleInputFocus = (field) => {
    if (field === "email") {
      setEmailFocused(true);
      setPasswordFocused(false);
    } else if (field === "password") {
      setEmailFocused(false);
      setPasswordFocused(true);
    }
  };

  // Add this function to handle input blur
  const handleInputBlur = (field) => {
    if (field === "email") {
      setEmailFocused(false);
    } else if (field === "password") {
      setPasswordFocused(false);
    }
  };

  const router = useRouter();

  const toggleLoginSignup = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

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
        return ToastComponent("Грешка. Моля, опитайте по-късно.", "error");
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
      <body className="container">
        <style>
          {`* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #c9d6ff;
  background: linear-gradient(to right, #e2e2e2, #c9d6ff);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw
}
        `}
        </style>
        <div className={styles.container} id="container">
          <div className={`${styles["form-container"]} ${styles["sign-up"]}`}>
            <form onSubmit={handleSignup} ref={formRef}>
              <h1>Create Account</h1>
              <div className={styles["social-icons"]}>
                <a onClick={handleGoogleSignIn} className={styles.icon}>
                  <i
                    className={`${styles["fa-brands"]} ${styles["fa-github"]}`}
                  ></i>
                </a>
                <a onClick={handleGitHubSignIn} className={styles.icon}>
                  <i
                    className={`${styles["fa-brands"]} ${styles["fa-linkedin-in"]}`}
                  ></i>
                </a>
              </div>
              <span>or use your email for registration</span>

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
              <button type="submit" className={styles.button}>
                Sign Up
              </button>
            </form>
          </div>
          <div className={`${styles["form-container"]} ${styles["sign-in"]}`}>
            <form onSubmit={handleLogin}>
              <h1>Sign In</h1>
              <div className={styles["social-icons"]}>
                <a onClick={handleGoogleSignIn} className={styles.icon}>
                  <i
                    className={`${styles["fa-brands"]} ${styles["fa-github"]}`}
                  ></i>
                </a>
                <a onClick={handleGitHubSignIn} className={styles.icon}>
                  <i
                    className={`${styles["fa-brands"]} ${styles["fa-linkedin-in"]}`}
                  ></i>
                </a>
              </div>
              <span>or use your email password</span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />

              <button type="submit" className={styles.button}>
                Sign In
              </button>
            </form>
          </div>
          <div className={styles["toggle-container"]}>
            <div className={styles.toggle}>
              <div
                className={`${styles["toggle-panel"]} ${styles["toggle-left"]}`}
              >
                <h1>Welcome Back!</h1>
                <p>
                  Enter your personal details to use all of the site features
                </p>
                <button
                  className={`${styles.hidden} ${styles.login} ${
                    isActive ? styles.active : ""
                  }`}
                  id="login"
                >
                  Sign In
                </button>
              </div>
              <div
                className={`${styles["toggle-panel"]} ${styles["toggle-right"]}`}
              >
                <h1>Hello, Friend!</h1>
                <p>
                  Register with your personal details to use all of the site
                  features
                </p>
                <button
                  className={`${styles.hidden} ${styles.register} ${
                    isActive ? styles.active : ""
                  }`}
                  id="register"
                >
                  Sign Up
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
