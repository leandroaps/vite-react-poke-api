import React, { useEffect, useState } from "react";
import axios from "axios";

type Pokemon = {
  name: string;
  url: string;
  id: number
};

type PokemonType = {
  pokemon: {
    name: string;
    id: number
    url: string;

  };
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/type/1");
        const pokemonTypeData = response.data;
        const pokemonUrls = pokemonTypeData.pokemon.map(
          (pokemon: PokemonType) => pokemon.pokemon.url
        );

        const pokemonDataPromises = pokemonUrls.map((url: string) =>
          axios.get(url)
        );
        const pokemonDataResponses = await Promise.all(pokemonDataPromises);
        const pokemonData = pokemonDataResponses.map(
          (response) => response.data
        );

        setPokemons(pokemonData);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div>
      <h1>Pokemon List</h1>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
