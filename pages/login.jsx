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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");

      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      ToastComponent("Успешно вписване", "success");
      router.push("/");
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
      setError(error.message);
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
          setError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        // Handle the case for returning users if necessary
      }

      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      ToastComponent("Успешно вписване", "success");
      router.push("/");
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
        // Handle new user setup if needed
      } else {
        // Handle returning users if needed
      }

      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      ToastComponent("Успешно вписване", "success");
      router.push("/");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Sign out successful");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingOverlay}>
        <p>Зареждане...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container">
        {isLogin ? (
          <>
            <form
              onSubmit={handleSignup}
              className={styles.SignInForm}
              ref={formRef}
            >
              <h2 className={styles.SignUpHead}>Регистрация</h2>
              <div className={styles.form}>
                <div className={styles.inputWrapper}>
                  <input
                    type="email"
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.SignInTextBox}
                    onFocus={() => handleInputFocus("email")}
                    onBlur={() => handleInputBlur("email")}
                  />
                  <label
                    className={emailFocused || email ? styles.labelActive : ""}
                  >
                    Имейл
                  </label>
                </div>
                <div className={styles.inputContainer}>
                  <input
                    type="password"
                    placeholder=" "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.SignInTextBox}
                    onFocus={() => handleInputFocus("password")}
                    onBlur={() => handleInputBlur("password")}
                  />
                  <label
                    className={
                      passwordFocused || password ? styles.labelActive : ""
                    }
                  >
                    Парола
                  </label>
                </div>

                {showUsernameField && (
                  <>
                    <input
                      type="text"
                      placeholder="Потребителско име"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onClick={() => scrollToTop()}
                    />
                    {error && <p>{error}</p>}
                  </>
                )}
                <button type="submit" className={styles.SignInBtn}>
                  Регистрация
                </button>
                <p>
                  Имате акаунт?{" "}
                  <a onClick={toggleLoginSignup}>
                    {isLogin ? "Впишете се!" : "Направете си акаунт!"}
                  </a>
                </p>
                {error && <p>{error}</p>}
              </div>
            </form>
          </>
        ) : (
          <>
            <form onSubmit={handleLogin} className={styles.LogInForm}>
              <h2 className={styles.SignUpHead}>Вход</h2>
              <div className={styles.form}>
                <div className={styles.inputContainer}>
                  <input
                    type="email"
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.LoginTextBox}
                    onFocus={() => handleInputFocus("email")}
                    onBlur={() => handleInputBlur("email")}
                  />
                  <label
                    className={emailFocused || email ? styles.labelActive : ""}
                  >
                    Имейл
                  </label>
                </div>
                <div className={styles.inputContainer}>
                  <input
                    type="password"
                    placeholder=" "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.LoginTextBox}
                    onFocus={() => handleInputFocus("password")}
                    onBlur={() => handleInputBlur("password")}
                  />
                  <label
                    className={
                      passwordFocused || password ? styles.labelActive : ""
                    }
                  >
                    Парола
                  </label>
                </div>
                <button type="submit" className={styles.LogInBtn}>
                  Вход
                </button>
              </div>

              <div className={styles.socials}>
                <button onClick={handleGoogleSignIn} className={styles.Google}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="40"
                    height="40"
                  >
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path
                        fill="#4285F4"
                        d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                      ></path>
                      <path
                        fill="#34A853"
                        d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                      ></path>
                      <path
                        fill="#FBBC05"
                        d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                      ></path>
                      <path
                        fill="#EA4335"
                        d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                      ></path>
                    </g>
                  </svg>
                </button>

                <a onClick={handleGitHubSignIn} className={styles.Github}>
                  <svg
                    aria-hidden="true"
                    data-prefix="fab"
                    data-icon="github"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                    className={styles.Github}
                  >
                    <path
                      fill="currentColor"
                      d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                    ></path>
                  </svg>
                </a>
              </div>
              <p>
                Нямате акаунт?{" "}
                <a onClick={toggleLoginSignup}>
                  {isLogin ? "Впишете се!" : "Създайте си!"}
                </a>
              </p>
              {error && <p>{error}</p>}
            </form>
          </>
        )}
      </div>
    );
  }

  if (showUsernameField) {
    return (
      <div className="container">
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
    );
  }
}

export default LoginForm;
