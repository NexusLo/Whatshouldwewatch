import Image from "next/image";
import React from 'react';
import Wsww from '../components/Wsww';
import styles from '../styles/Layout.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Layout />
    </main>
  );
}
