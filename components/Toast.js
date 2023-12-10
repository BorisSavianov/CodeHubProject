import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastComponent(text, action) {
  toast[action](text, {
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
