import { useState } from 'react';
import './index.css';
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
      <div className="icons-container">
        <a href="https://www.linkedin.com/in/seereddisaimadhu/">
          <img
            src="https://res.cloudinary.com/dx97khgxd/image/upload/v1726993783/icons8-linkedin-48_cipj7u.png"
            alt="linkedin"
            className="icon-logo"
          />
        </a>
        <a href="https://github.com/madhuseereddi">
          <img
            src="https://res.cloudinary.com/dx97khgxd/image/upload/v1726993782/icons8-github-48_poymkw.png"
            alt="github"
            className="icon-logo"
          />
        </a>
      </div>
      <button className='sys-res-btn mob-btn'>Resume/CV</button>
      <div className="hamburger-menu" onClick={toggleMenu}>
        <MdOutlineArrowDropDownCircle className="drop-down" />
      </div>

      <ul className={`items-list`}>
        <li>Home</li>
        <li>About</li>
        <li>Projects</li>
        <li>Skills</li>
        <li>Contact</li>
        <li>Feedback</li>
      </ul>
      <button className='sys-res-btn sys-btn'>Resume/CV</button>
    </nav>
  );
};

export default Header;
