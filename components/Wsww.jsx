"use client"

{/****************** IMPORT DEPENDANCES ET COMPOSANTS ******************/}

import React, { useState, useEffect } from 'react';
import SerieCard from './SerieCard';
import ListCard from './ListCard';
import SummaryCard from './SummaryCard';
import styles from '../styles/Wsww.module.css';

function Wsww() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [addedSeries, setAddedSeries] = useState([]);
  const [randomSeriesList, setRandomSeriesList] = useState([]);

{/***************** RECHERCHE VIA TVMAZE ET FORMATTAGE DE RESULATS *****************/}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const formattedResults = data.map(item => ({
        id: item.show.id,
        name: item.show.name,
        image: item.show.image ? item.show.image.medium : null,
        runtime: item.show.runtime,
        rating: item.show.rating ? item.show.rating.average : null,
        premiered: item.show.premiered.split('-')[0],
        summary: item.show.summary ? item.show.summary.replace(/<[^>]*>/g, '').substring(0,200): null,
      }));
      setSearchResults(formattedResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  {/*****************  AJOUT SERIE A MYLIST POUR CHOIX ALEATOIRE *****************/}
  
  const updateAddSeries = (seriesData) => {
    if (addedSeries.find(series => series.name === seriesData.name)) {
      setAddedSeries(addedSeries.filter(series => series.name !== seriesData.name)); 
    } else {
      setAddedSeries([...addedSeries, seriesData]);
      setRandomSeriesList([...randomSeriesList, seriesData]); // Ajouter à la randomSeriesList
      console.log("Données de la série ajoutée à randomSeriesList :", seriesData);
    }
  };

  {/*****************  GESTION SELECTION ALEATOIRE PARMI MYLIST *****************/}

  const handlePickRandomSeries = () => {
    const randomIndex = Math.floor(Math.random() * randomSeriesList.length);
    const selectedRandomSeries = randomSeriesList[randomIndex];
    console.log("Série aléatoire sélectionnée :", selectedRandomSeries);
  };

  const ToggleSelection = (seriesData) => {
    const seriesId = seriesData.id;
    const isAddedToRandom = randomSeriesList.some(item => item.id === seriesId);
    
    if (!isAddedToRandom) {
      setRandomSeriesList([...randomSeriesList, seriesData]);
      console.log("Série ajoutée à randomSeriesList:", seriesData.name);
    } else {
      setRandomSeriesList(randomSeriesList.filter(item => item.id !== seriesId));
      console.log("Série retirée de randomSeriesList : ", seriesData.name);
    }
  };

  return (
      <div className={styles.backgroundContainer}>
        <div className={styles.layoutContainer1}>
          <div className={styles.searchContainer}>
            <h2 className={styles.searchTitle}>Rechercher </h2>
            <div className={styles.line}></div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Entrez votre recherche"
                className={styles.searchInput}
              />
            </form>
            <ul className={styles.results}> 
              {searchResults.map((result) => (
                <li key={result.id}>
                  <SerieCard
                    name={result.name}
                    image={result.image}
                    runtime={result.runtime}
                    rating={result.rating}
                    premiered={result.premiered}
                    summary={result.summary}
                    updateAddSeries={updateAddSeries}
                    addedSeries={addedSeries}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.myListContainer}>
            <h2 className={styles.listTitle}>Ma Liste </h2>
            <div className={styles.line}></div>
            <ul className={styles.results}>
              {addedSeries.map((data) => (
                <li key={data.id} className={styles.results}>
                  <ListCard
                    name={data.name}
                    image={data.image}
                    runtime={data.runtime}
                    rating={data.rating}
                    premiered={data.premiered}
                    summary={data.summary}
                    ToggleSelection={() => ToggleSelection(data)}
                    onDelete={() => removeFromList(data)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.randomSeriesContainer}>
          <div className={styles.randomButtonContainer}>
            <button onClick={handlePickRandomSeries} className={styles.randomButton}>Je vais regarder quoi ce soir?</button>
          </div>
          <div className={styles.randomCardContainer}>
          {randomSeriesList.map((data, i) => (
            <SummaryCard
              key={i}
              name={data.name}
              image={data.image}
              runtime={data.runtime}
              rating={data.rating}
              premiered={data.premiered}
              summary={data.summary} 
              className={styles.randomSeriesCard}
            />
          ))}
          </div>
        </div>
      </div>
  );
}

export default Wsww;