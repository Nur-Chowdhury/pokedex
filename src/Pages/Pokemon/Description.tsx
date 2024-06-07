import React from 'react'
import { useAppSelector } from '../../app/hooks';
import PokemonContainer from '../../Components/PokemonContainer';
import Info from '../../Components/Info';

export default function Description() {
  const pokemonData = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );

  return (
    <div>
      { pokemonData && (
        <>
          <Info data={pokemonData} />
          <PokemonContainer image={pokemonData?.image!} />
        </>
      )}
    </div>
  )
}
