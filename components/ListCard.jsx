" use client"
import styles from '../styles/ListCard.module.css';
import React, { useState } from 'react';

const ListCard = (props) => {
  const [addedToRandom, setAddedToRandom] = useState(false);
  const [isAdded, setIsAdded] = useState(props.isAdded);

  const handleAddRandom = () => {
    setAddedToRandom(!addedToRandom);
    props.ToggleSelection(props.id, !addedToRandom);
  };


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
        <input
          type="checkbox"
          checked={addedToRandom}
          onChange={handleAddRandom}
          className={styles.checkbox}
          style={{ width: '30px', height: '30px' }} // Style pour ajuster la taille de la case à cocher
        />
      </div>
    </div>
  );
}

export default ListCard;