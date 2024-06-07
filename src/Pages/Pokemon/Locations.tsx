import React from 'react'
import { useAppSelector } from '../../app/hooks'

export default function Locations() {
  const PokemonData = useAppSelector(
    ({ pokemon: { currentPokemon }}) => currentPokemon
  );
  return (
    <div className="pokemon-locations">
      <ul className="pokemon-locations-list">
        {PokemonData?.encounters.map((encounter: string) => (
          <li key={encounter} className="pokemon-location">
            {encounter}
          </li>
        ))}
      </ul>
    </div>
  )
}
