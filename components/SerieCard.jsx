" use client"
import styles from '../styles/SerieCard.module.css';

const SerieCard = (props) =>{

  // Ajout de series
  const handleAddSeries = () => {
    const seriesData = {
      name: props.name,
      runtime: props.runtime,
      rating: props.rating,
      premiered: props.premiered,
      image: props.image
    };
    props.updateAddSeries(seriesData);
    console.log('ajout')
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
        <button onClick={() => handleAddSeries()}  className={styles.addButton}>Ajouter à ma liste</button>
      </div>
      
    </div>
  );
}

export default SerieCard;