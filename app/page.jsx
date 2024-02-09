import Image from "next/image";
import React from 'react';
import Wsww from '../components/Wsww';
import styles from '../styles/Wsww.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Wsww />
    </main>
  );
}
