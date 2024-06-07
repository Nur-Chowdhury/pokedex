import React from "react";
import Wrapper from "../sections/Wrapper";
import avatarImage from "../assets/avatar.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function About() {
  return (
    <div className="profile">
      <img src={avatarImage} alt="" className="profile-image" />
      <h1 className="profile-text">Hi, I am Nayamat Ullah Chowdhuruy</h1>
      <h2 className="profile-text">The creator of this awesome pokedex</h2>
      <div className="profile-links">
        <a href="https://github.com/Nur-Chowdhury">
          <FaGithub />
        </a>
        
        <a href="https://www.linkedin.com/in/n0or-chowdhury/">
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
}

export default Wrapper(About);