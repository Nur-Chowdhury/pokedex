import {createAsyncThunk} from "@reduxjs/toolkit";
import { pokemonStatsType, pokemonTypeInterface, userPokemonsType } from "../../utils/Types";
import { RootState } from "../store";
import { setToast } from "../slices/AppSlice";
import { pokemonListRef } from "../../utils/FirebaseConfig";
import { addDoc } from "firebase/firestore";
import { getUserPokemons } from "./getUserPokemons";
 
export const addPokemonToList = createAsyncThunk(
    "pokemon/addPokemon", 
    async (pokemon: {
        id: number;
        name: string;
        types: pokemonTypeInterface[] | string[];
        stats?: pokemonStatsType[];
    },{
        getState, dispatch
    }
  )=> {
    try {
        const {
            app: {userInfo},
            pokemon: {userPokemons},
        } = getState() as RootState;
        if(!userInfo?.email) {
            return dispatch(setToast("Please login to add pokemon to your collections."))
        };
        const index = userPokemons.findIndex((userPokemon: userPokemonsType)=>{
            return userPokemon.name === pokemon.name;
        });
        if(index === -1) {
            let types: string[] = [];
            if(!pokemon.stats){
                pokemon.types.forEach((type: any)=>{
                    types.push(Object.keys(type).toString())
                });
            }else{
                types = pokemon.types as string[];
            }
            await addDoc(pokemonListRef, {
                pokemon: {id: pokemon.id, name: pokemon.name, types},
                email: userInfo.email,
            });
            await dispatch(getUserPokemons());
            return dispatch(
                setToast(`${pokemon.name} added to your collection.`)
            );
        }
        else{
            return dispatch(
                setToast(`${pokemon.name} is already in your collection.`)
            );
        }
    } catch (error) {
        console.log(error);
    }
});