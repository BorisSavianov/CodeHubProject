import { useEffect } from "react";
import ToastComponent from "../components/Toast"; // Replace with the correct path

export default function NotFound() {
  useEffect(() => {
    // Example of using the toast function
    ToastComponent("Страницата не е намерена", "info");
  }, []);

  return (
    <main className="container">
      <h1>Страницата не е намерена</h1>
    </main>
  );
}
