import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon')
      .then(response => {
        setPokemonList(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1 className='heading'>Pokemon</h1>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <div className="pokemon-container">
        {filteredPokemon.map(pokemon => (
          <div key={pokemon.url} className="pokemon-card">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(pokemon.url)}.png`}
              alt={pokemon.name}
            />
            <h3>{pokemon.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

function getPokemonId(url) {
  const idRegex = /\/(\d+)\//;
  const matches = url.match(idRegex);
  if (matches && matches.length > 1) {
    return matches[1];
  }
  return null;
}

export default App
