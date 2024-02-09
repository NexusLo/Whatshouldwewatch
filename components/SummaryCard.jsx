" use client"

import styles from '../styles/SummaryCard.module.css';

const SummaryCard = (props) =>{

  return (
    <div className={styles.cardContainer}>
      <img className={styles.image} src={props.image} alt={props.name} />
      <div className={styles.textContainer}>
          <p className={styles.name}>{props.name}</p>
          <p className={styles.runtime}>{props.runtime} min</p>
          <p className={styles.rating}>{props.rating}</p>
          <p className={styles.premiered}>{props.premiered}</p>
          <p className={styles.summary}>{props.summary}</p> 
      </div>    
    </div>
  );
}
export default SummaryCard;