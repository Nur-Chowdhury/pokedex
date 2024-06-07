import React, { useEffect } from 'react'
import Wrapper from '../sections/Wrapper'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getInitialPokemonData } from '../app/reducers/getInitialPokemonData';
import { getPokemonData } from '../app/reducers/getPokemonData';
import PokemonCardGrid from '../Components/PokemonCardGrid';
import { debounce } from '../utils/Debounce';
import Loader from '../Components/Loader';
import { setLoading } from '../app/slices/AppSlice';

function Search() {
  const dispatch = useAppDispatch();
  const { allPokemon, randomPokemons } = useAppSelector(({ pokemon }) => pokemon);
  useEffect(()=>{
    dispatch(getInitialPokemonData());
  },[dispatch]);

  const isLoading = useAppSelector(({ app: { isLoading } }) => isLoading);

  const handleChange = debounce((value: string) => getPokemon(value), 300);

  useEffect(()=> {
    if(allPokemon){
      const clonedPokemons = [...allPokemon];
      const randomPokemonId = clonedPokemons
        .sort(() => Math.random()- Math.random())
        .slice(0,20);
      dispatch(getPokemonData(randomPokemonId));
    }
  }, [allPokemon, dispatch]);

  const getPokemon = async (value: string) => {
    if(value.length) {
      console.log(value);
      const pokemons = allPokemon?.filter((pokemon) => 
        pokemon.name.includes(value.toLowerCase())
      );
      console.log(pokemons);
      dispatch(getPokemonData(pokemons!));
    }
    else{
      const clonedPokemons = [...allPokemon as []];
      const randomPokemonId = clonedPokemons
        .sort(() => Math.random()- Math.random())
        .slice(0,20);
      dispatch(getPokemonData(randomPokemonId));
    }
  }
  
  useEffect(() => {
    if (randomPokemons) {
      dispatch(setLoading(false));
    }
  }, [randomPokemons, dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="search">
          <input
            type="text"
            onChange={(e) => handleChange(e.target.value)}
            className="pokemon-searchbar"
            placeholder="Search Pokemon"
          />
          <PokemonCardGrid pokemons={randomPokemons!} />
        </div>
      )}
    </>
  )
}

export default Wrapper(Search);
