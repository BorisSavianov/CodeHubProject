// Импортиране на React и други необходими библиотеки
import { useEffect, useState } from "react";
import { collection, addDoc, db } from "../../lib/firebase";
import useAuth from "../../hooks/useAuth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ToastComponent from "@/components/Toast";

// Импортиране на CSS модула
import styles from "../../styles/Posts.module.css";

// Компонент NewPostPage
export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // Състояние за съхранение на избрания файл с изображение
  const [imageUrlPreview, setImageUrlPreview] = useState(null); // Състояние за съхранение на URL адреса за преглед на изображението
  const user = useAuth();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Генериране на URL адрес за преглед на избраното изображение
    const previewUrl = URL.createObjectURL(file);
    setImageUrlPreview(previewUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorMessage = "";

    if (title.trim() === "") {
      errorMessage = "Моля напишете заглавие.";
    } else if (content.length < 5) {
      errorMessage = "Съдържанието трябва да е поне 5 символа.";
    }

    if (errorMessage !== "") {
      ToastComponent(errorMessage, "error");
      return;
    }

    try {
      // Качване на изображението, ако е налично
      let imageUrl = null;

      if (image) {
        const storage = getStorage();
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);

        // Получаване на URL адреса за изтегляне на каченото изображение
        imageUrl = await getDownloadURL(storageRef);
      }

      // Запазване на поста във Firebase
      await addDoc(collection(db, "posts"), {
        title,
        content,
        createdAt: new Date(),
        userId: user.uid, // Включване на идентификатора на потребителя в данните на поста
        username: user.username, // Включване на потребителското име в данните на поста
        imageUrl, // Съхранение на пълния URL адрес на хранилището в полето за изображение
      });

      // Изчистване на формата и прегледа на изображението
      setTitle("");
      setContent("");
      setImage(null); // Нулиране на избраното изображение
      setImageUrlPreview(null);

      ToastComponent("Постът е създаден успешно!", "success");
    } catch (error) {
      console.error("Грешка при създаване:", error);
      ToastComponent("Грешка при създаване. Опитайте по-късно.", "error");
    }
  };

  return (
    <main className="container">
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Направи нов пост</h1>
        <div className={styles.formGroup}>
          <p htmlFor="title">Заглавие</p>
          <input
            className={styles.input}
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <p htmlFor="content">Съдържание</p>
          <textarea
            className={styles.textarea}
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <p htmlFor="image">Снимка</p>
          <input
            className={styles.fileInput}
            id="image"
            type="file"
            accept=".jpg, .jpeg, .png, .gif, .bmp" // Уточнете приетите формати на изображения
            onChange={handleImageChange}
          />
          {imageUrlPreview && (
            <img
              className={styles.imagePreview}
              src={imageUrlPreview}
              alt="Image Preview"
            />
          )}
        </div>
        <button type="submit" className={styles.submitButton}>
          Създай пост
        </button>
      </form>
    </main>
  );
}
