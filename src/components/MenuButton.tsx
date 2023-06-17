import React, { useState } from 'react';
import '../styles/MenuButton.css';
interface IconButtonWithMenuProps {
  options: string[];
  selectOption: () => void;
}

const IconButtonWithMenu: React.FC<IconButtonWithMenuProps> = ({ options, selectOption }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    selectOption();
  };

  return (
    <div className="icon-button-menu-container">
      <button className="icon-button" onClick={handleMenuToggle}>
        <span className="menu-icon"></span>
        <span className="menu-icon"></span>
        <span className="menu-icon"></span>
      </button>
      {isMenuOpen && (
        <div className="menu">
          <ul>
            {options.map((option, index) => (
              <li onClick={handleMenuClose} key={index}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IconButtonWithMenu;
