import React from 'react';
import {MdOutlinePowerSettingsNew} from "react-icons/md"
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/FirebaseConfig';
import { setPokemonTab, setToast, setUserStatus } from '../app/slices/AppSlice';
import { useLocation } from 'react-router-dom';
import { pokemonTabs } from '../utils/Constants';

function Footer() {

  const dispatch = useAppDispatch();
  const location = useLocation();

  const {currentPokemonTab} = useAppSelector(({app})=>app)

  
  const handleLogOut = () => {
    signOut(firebaseAuth);
    dispatch(setUserStatus(undefined));
    dispatch(setToast("Logged Out Successfully!"));
  }
  
  const routes = [
      {
        name: pokemonTabs.description,
        value: "Description",
      },
      {
        name: pokemonTabs.evolution,
        value: "Evolution",
      },
      {
        name: pokemonTabs.locations,
        value: "Catching",
      },
      {
        name: pokemonTabs.moves,
        value: "Capable Moves",
      },
  ];
  
  return (
    <footer>
      <div className="block"></div>
      <div className="data">
        {location.pathname.includes("/pokemon") && (
          <ul>
            {routes.map((route) => (
              <li
                key={route.name}
                className={`${
                  currentPokemonTab === route.name ? "active" : ""
                }`}
                onClick={() => dispatch(setPokemonTab(route.name))}
              >
                {route.value}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="block" onClick={handleLogOut}>
        <MdOutlinePowerSettingsNew />
      </div>
    </footer>
  )
}

export default Footer;
