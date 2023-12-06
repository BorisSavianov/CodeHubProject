import { useEffect, useState } from "react";
import {
  getAuth,
  applyActionCode,
  sendEmailVerification,
  deleteUser,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/router";

export default function ConfirmEmail() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const handleConfirmation = async () => {
      const actionCode = router.query.oobCode;

      try {
        await applyActionCode(auth, actionCode);
        console.log("Успешно потвърждаване на имейла");
        setError("");
      } catch (error) {
        console.error("Грешка при потвърждаване на имейла:", error);
        setError("Грешка при потвърждаване на имейла. Моля, опитайте отново.");
      } finally {
        setLoading(false);
      }
    };

    if (router.query.oobCode) {
      handleConfirmation();
    } else {
      setLoading(false);
    }
  }, [router.query.oobCode, auth]);

  useEffect(() => {
    const user = auth.currentUser;

    if (user && !user.emailVerified && !emailSent) {
      // Изпращане на връзката за потвърждение на имейла
      sendVerificationEmail(user);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setError(
          "Имейлът е успешно потвърден. Пренасочване към страницата за вход..."
        );
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else if (user && !user.emailVerified) {
        setError(
          "Имейлът е с предстоящо потвърждение. Моля, проверете вашия имейл."
        );
      } else {
        setError(
          "Потребителят не е намерен. Моля, регистрирайте се или влезте в системата."
        );
      }
    });

    return () => unsubscribe();
  }, [auth, emailSent]);

  const sendVerificationEmail = async (user) => {
    try {
      await sendEmailVerification(user);
      setEmailSent(true);
    } catch (error) {
      console.error("Грешка при изпращане на имейл за потвърждение:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(auth.currentUser);
      console.log("Потребителят е изтрит успешно");
      setError("Потребителят е изтрит успешно.");
      router.push("/");
    } catch (error) {
      console.error("Грешка при изтриване на потребителя:", error);
      setError("Грешка при изтриване на потребителя. Моля, опитайте отново.");
    }
  };

  if (loading) {
    return <p>Зарежда се...</p>;
  }

  return (
    <div className="container">
      {error && <p>{error}</p>}
      <p>Объркали сте вашият имейл? Изтриете го.</p>
      <button onClick={handleDeleteAccount}>Изтрий акаунта</button>
    </div>
  );
}
