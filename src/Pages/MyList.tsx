import React, { useEffect } from "react";
import Wrapper from "../sections/Wrapper";
import Login from "../Components/Login";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUserPokemons } from "../app/reducers/getUserPokemons";
import PokemonCardGrid from "../Components/PokemonCardGrid";

function MyList() {
  const { userInfo } = useAppSelector(({ app }) => app);
  const { userPokemons } = useAppSelector(({ pokemon }) => pokemon);
  const dispatch = useAppDispatch();
  console.log(userInfo)

  useEffect(() => {
    dispatch(getUserPokemons());
  }, [userInfo, dispatch]);

  
  return (
    <div className="list">
      {userInfo ?  
        <PokemonCardGrid pokemons={userPokemons} /> 
        : 
        <Login />
      }
    </div>
  );
}

export default Wrapper(MyList);