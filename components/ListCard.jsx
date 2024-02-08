" use client"
import styles from '../styles/SerieCard.module.css';

const ListCard = (props) =>{

  // Ajout de series
  const handleAddRandom = () => {
    const seriesData = {
      name: props.name,
      runtime: props.runtime,
      rating: props.rating,
      premiered: props.premiered,
      image: props.image
    };
    props.ToggleSelection(seriesData);
  };

  return (
    <div className={styles.cardContainer}>
      <img className={styles.image} src={props.image} alt={props.name} />
      <div className={styles.textContainer}>
          <p className={styles.name}>{props.name}</p>
          <p className={styles.runtime}>{props.runtime} min</p>
          <p className={styles.rating}>{props.rating}</p>
          <p className={styles.premiered}>{props.premiered}</p>
      </div>
      <div className={styles.buttonContainer}>
         <input
            type="checkbox"
            onClick={() => handleAddRandom()}
            className={styles.checkbox}
        />
      </div>
      
    </div>
  );
}

export default ListCard;