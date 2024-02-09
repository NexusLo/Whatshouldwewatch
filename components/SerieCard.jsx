" use client"
import styles from '../styles/SerieCard.module.css';
import React, { useState, useEffect } from 'react';

const SerieCard = (props) =>{

  const [addedToRandom, setAddedToRandom] = useState(false);
  const [isAdded, setIsAdded] = useState(props.isAdded);

  // Ajout de series
  const handleAddSeries = () => {
    const seriesData = {
      name: props.name,
      runtime: props.runtime,
      rating: props.rating,
      premiered: props.premiered,
      image: props.image,
      summary: props.summary,
    };
    props.updateAddSeries(seriesData);
    console.log('ajout')
  };


  const isAlreadyAdded = props.addedSeries.some(series => series.id === props.id);

 
  // Détermine la classe CSS à appliquer si la série est déjà ajoutée
  const buttonClass = isAlreadyAdded ? `${styles.addButton} ${styles.addButtonDisabled}` : styles.addButton;


  return (
    <div className={styles.cardContainer}>
      <img className={styles.image} src={props.image} alt={props.name} />
      <div className={styles.textContainer}>
          <p className={styles.name}>{props.name}</p>
          <p className={styles.runtime}>{props.runtime} min</p>
          <p className={styles.rating}>{props.rating}</p>
          <p className={styles.premiered}>{props.premiered}</p>
          {addedToRandom && (
          <p className={styles.summary}>{props.summary}</p> 
        )}
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={() => handleAddSeries()}  className={buttonClass}>Ajouter à ma liste</button>
      </div>
      
    </div>
  );
}
export default SerieCard;