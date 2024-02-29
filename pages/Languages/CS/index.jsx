import Link from "next/link";
import styles from "../../../styles/C#.module.css";
import Navbar from "@/components/Navbar";

export default function Wellcome() {
  return (
    <main>
      <Navbar />
      <div className={styles.heading}>
        <h1>Научи C#</h1>
      </div>

      <div className={styles.Langcontent}>
        <p>
          <Link href={`/Languages/CS/Variables`} className={styles.Item}>
            Променливи
          </Link>
        </p>
        <p>
          <Link href={`/Languages/CS/Data_Types`} className={styles.Item}>
            Типове данни
          </Link>
        </p>
        {/* <p>
          <Link href={`/Languages/CS/Operators`} className={styles.Item}>
            Логически Оператори
          </Link>
        </p> */}
        <p>
          <Link href={`/Languages/CS/Arrays`} className={styles.Item}>
            Arrays
          </Link>
        </p>
        <p>
          <Link href={`/Languages/CS/If`} className={styles.Item}>
            If else
          </Link>
        </p>
        <p>
          <Link href={`/Languages/CS/While`} className={styles.Item}>
            While
          </Link>
        </p>
        <p>
          <Link href={`/Languages/CS/For`} className={styles.Item}>
            For цикъл
          </Link>
        </p>
        <p>
          <Link href={`/Languages/CS/Math`} className={styles.Item}>
            Математика
          </Link>
        </p>
      </div>
    </main>
  );
}
