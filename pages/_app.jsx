import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, collection, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import Metatags from "../components/Metatags";
import { getMessaging, getToken, onMessage, messaging } from "../lib/firebase";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";

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
    const messaging = getMessaging();

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

      // Check email verification status when the user changes
      if (user) {
        isEmailVerified(user).then((verified) => {
          if (!verified && router.pathname !== "/ConfirmEmail") {
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

      // Request permission for notifications
      function requestPermission() {
        console.log("Requesting permission...");
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            console.log("Notification permission granted.");
          } else if (permission === "denied") {
            console.log("Notification permission denied.");
          }
        });
      }

      // Get FCM token after user is authenticated
      if (user) {
        getToken(messaging, {
          vapidKey:
            "BEoVuLTvGp0yKpFciKMPZb71Js6UZSkxn64wv0MGDVHHRPutNFhO-f47AO2wlMTuq4g4LSqLj4iUbD4Gnr0Y-6g",
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log("FCM Token:", currentToken);
              // Send the token to your server and update the UI if necessary
              // ...
            } else {
              console.log("No FCM token available.");
            }
          })
          .catch((err) => {
            console.error("Error retrieving FCM token:", err);
          });
      }

      // Request permission on component mount
      requestPermission();
    });

    // Handle incoming FCM messages
    onMessage(messaging, (payload) => {
      console.log("Message received:", payload);
      // Handle the message, e.g., show a notification
      toast.info(payload.notification.title, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, [router]);

  if (loading) {
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
