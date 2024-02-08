" use client"

{/****************** IMPORT DEPENDANCES ET COMPOSANTS ******************/}
import React from 'react'
import { useState, useEffect } from 'react';
import SerieCard from './SerieCard';
import ListCard from './ListCard';
import styles from '../styles/Wsww.module.css';


function Wsww() 
{
    const [searchQuery, setSearchQuery] = useState(""); // Ajout de l'état pour la requête de recherche
    const [searchResults, setSearchResults] = useState([]); // Ajout de l'état pour les résultats de recherche
    const [addedSeries, setAddedSeries] = useState([]); // Ajout de l'état pour les séries ajoutées à la liste
    const [randomSeriesList, setRandomSeriesList] = useState([]); // Ajout de l'état pour les séries ajoutées à la liste de choix aléatoire
    const [selectedSeries, setSelectedSeries] = useState([]);

  {/**************** GESTION DE LA RECHERCHE VIA API TVMAZE ******************/ }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Transformer les données selon le format souhaité
      const formattedResults = data.map(item => ({
        id: item.show.id,
        name: item.show.name,
        image: item.show.image ? item.show.image.medium : null,
        runtime: item.show.runtime,
        rating: item.show.rating ? item.show.rating.average : null,
        premiered: item.show.premiered.split('-')[0], // Afficher seulement l'année
      }));
      setSearchResults(formattedResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  {/**************** GESTION DE L'AJOUT DE SERIES A MYLIST ******************/ }

  const updateAddSeries = (seriesData) => {
    if (addedSeries.find(series => series.name === seriesData.name)) {
      setAddedSeries(addedSeries.filter(series => series.name !== seriesData.name)); 
    } else {
      setAddedSeries([...addedSeries, seriesData]);
      console.log("Série ajoutée à addedSeries :", seriesData);
      console.log("Propriétés de la série :", {
        name: seriesData.name,
        runtime: seriesData.runtime,
        rating: seriesData.rating,
        premiered: seriesData.premiered
      });
    }
  };

  const handlePickRandomSeries = () => {
    const randomIndex = Math.floor(Math.random() * randomSeriesList.length);
    const selectedRandomSeries = randomSeriesList[randomIndex];
    console.log("Série aléatoire sélectionnée :", selectedRandomSeries);
  };

  const ToggleSelection = (seriesId, seriesData) => {
    const updatedSelectedSeries = selectedSeries.includes(seriesId)
      ? selectedSeries.filter(id => id !== seriesId)
      : [...selectedSeries, seriesId];
    setSelectedSeries(updatedSelectedSeries);
  
    setAddedSeries(addedSeries.map(series => {
      if (series.id === seriesId) {
        const selected = !series.selected;
        return { ...series, selected };
      }
      return series;
    }));
  
    const seriesToAdd = addedSeries.find(series => series.id === seriesId);
    if (seriesToAdd) {
      if (seriesToAdd.selected) {
        setRandomSeriesList([...randomSeriesList, seriesToAdd]);
        console.log("Série ajoutée à randomSeriesList:", seriesToAdd.name);
      } else {
        setRandomSeriesList(randomSeriesList.filter(item => item.id !== seriesId));
        console.log("Série retirée de randomSeriesList : ", seriesToAdd.name);
      }
    }
  
  };

      return (
        <div className={styles.main}>
          <div className={styles.backgroundContainer}>
              <div className={styles.layoutContainer1}>

                <div className={styles.searchContainer}>
                <h2 className={styles.searchTitle}>Rechercher </h2>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Entrez votre recherche"
                      className={styles.searchInput}
                    />
                    <button type="submit" className={styles.button}>Search</button> 
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
                      updateAddSeries= {updateAddSeries}
                    />
                    </li>
                  ))}
                </ul>
                </div>
                <div className={styles.myListContainer}>
                  <h2 className={styles.listTitle}>Ma Liste </h2>
                  <ul className={styles.results}>
                  {addedSeries.map((data) => (
                    <li key={data.id} className={styles.results}>
                      <ListCard
                        name={data.name}
                        image={data.image}
                        runtime={data.runtime}
                        rating={data.rating}
                        premiered={data.premiered}
                        ToggleSelection= {ToggleSelection}
                        onDelete={() => removeFromList(data)}
                      />
                    </li>
                  ))}
                  </ul>
                  </div>
            </div>
            <div className={styles.randomSeriesList}>
            <button onClick={handlePickRandomSeries} className={styles.randomButton}>Je vais regarder quoi ce soir?</button>
              {randomSeriesList.map((data, i) => (
                <SerieCard
                  key={i}
                  title={data.title}
                  image={data.image}
                  runtime={data.runtime}
                  rating={data.rating}
                  premiered={data.premiered}
                  updateAddSeries={updateAddSeries}
                  className={styles.randomSeriesCard}
                />
              ))}
            </div>
          </div>

      </div>
      );
    }
    
    export default Wsww;