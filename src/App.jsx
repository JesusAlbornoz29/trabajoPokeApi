import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [domString, setDomString] = useState('');
  const [loading, setLoading] = useState(false); // Cambiado a false inicialmente
  const [pokemonName, setPokemonName] = useState('');

  useEffect(() => {
    if (pokemonName) {
      setLoading(true);
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .then((pokemon) => {
          setDomString(pokemon.sprites.front_default);
          setLoading(false);
        })
        .catch((error) => console.error("Error al obtener la imagen: ", error));
    }
  }, [pokemonName]);

  const handleInputChange = (event) => {
    setPokemonName(event.target.value);
  };

  const handleSearch = () => {
    // Lógica para realizar la búsqueda cuando se presiona el botón
    if (pokemonName) {
      setLoading(true);
    }
  };

  return (
    <div className='App'>
      <h1>Veamos Pokémon</h1>
      <div>
        <input
          type='text'
          placeholder='Nombre del Pokémon'
          value={pokemonName}
          onChange={handleInputChange}
        />
        {loading ? (
          <p>Cargando</p>
        ) : (
          <div>
            {pokemonName && <p>Estás viendo a {pokemonName}</p>}
            <img src={domString} alt='Un Pokémon!' />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
