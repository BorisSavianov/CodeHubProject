import React from "react";
import styles from "../styles/Languages.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Card({
  path,
  heading,
  text,
  href,
  alt,
  width,
  height,
}) {
  return (
    <Link href={href} className={styles.card}>
      <div className={styles.cardContent}>
        <Image
          className={styles.cardImage}
          src={path}
          width={width}
          height={height}
          alt={alt}
        />
        <div className={styles.cardInfoWrapper}>
          <div className={styles.cardInfo}>
            <div className={styles.cardInfoTitle}>
              <h3>{heading}</h3>
              <h4>{text}</h4>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
