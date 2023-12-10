import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../lib/firebase";
import { getDoc, doc, collection, getFirestore } from "firebase/firestore";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";
import { ToastContainer, toast } from "react-toastify";
import Metatags from "../components/Metatags";

// Function to check if the user's email is verified
const isEmailVerified = async (user) => {
  if (user) {
    await user.reload();
    return user.emailVerified;
  }
  return false;
};

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        const userDocRef = doc(collection(db, "users"), user.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUsername(userData.username);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Check email verification status when the user changes
    if (user) {
      isEmailVerified(user).then((verified) => {
        if (!verified && router.pathname !== "/ConfirmEmail") {
          // If the user's email is not verified and they are not on the login, "/" or "/ConfirmEmail" page, redirect to login
          router.push("/ConfirmEmail");
          toast.error("Потвърдете имейла си преди да влезете.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
    }
  }, [user, router]);

  if (loading) {
    // Show loading indicator while checking authentication state
    return <p>Loading...</p>;
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <link rel="icon" href="/CodeHub-logo.png" />
      <Component {...pageProps} user={user} username={username} />
      <Analytics />
      <Metatags />
    </>
  );
}
