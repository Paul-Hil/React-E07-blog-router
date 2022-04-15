import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import './styles.scss';

const Header = ({categories, isZenMode, updateZenMode}) => {
return (
  <header className="menu">

    <nav>
    {categories.map((category) => {
      return(
        <NavLink className="menu-link"
         to={category.route}
         key={category.label}
         activeClassName="menu-link--selected"
         exact
         >
         {category.label}
        </NavLink>
      );
      })}

      <button className="menu-btn" type="button" onClick={() => {updateZenMode(!isZenMode)}}>
       {isZenMode ? 'Désactiver' : 'Activer' } le mode zen
      </button>

    </nav>
  </header>
  );
}

Header.propTypes = {
  // tableau qui contient des objets (propriétés route et label)
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Header;
