import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Navigation.css';
import { link } from 'fs';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      linkTypes: [
        'films',
        'people',
        'planets',
        'starships',
        'vehicles',
        'favorites'
      ],
      iconTypes: [
        'fas fa-film',
        'fab fa-jedi-order',
        'fas fa-globe',
        'fab fa-galactic-senate',
        'fab fa-old-republic',
        'fas fa-star-half-alt'
      ],
      breadCrumbs: ['Home']
    };
  }

  displayNavLinks = () => {
    const { getData, favorites } = this.props;
    const { linkTypes, iconTypes } = this.state;
    return linkTypes.map((linkType, i) => {
      return (
        <div
          className="CONTAINER"
          key={i}
          onClick={e => this.addBreadCrumb(e, linkType)}
        >
          <NavLink
            className="NAV"
            name={linkType}
            to={`/${linkType}`}
            onClick={e => this.changeNavLinks(e, linkType)}
          >
            <i class={iconTypes[i]} />
            {linkType} {linkType === 'favorites' ? favorites.length : ''}
          </NavLink>
        </div>
      );
    });
  };

  changeNavLinks = (e, link) => {
    e.preventDefault();
    const { state } = this.props;
    console.log(state[link]);
    if (state.activeButton === link) {
      const linkTypes = state[link].map(item => item.title);
      console.log(linkTypes);
      this.setState({ linkTypes });
    }
  };

  addBreadCrumb = (e, link) => {
    e.preventDefault();
    this.setState({ breadCrumbs: [...this.state.breadCrumbs, link] });
  };

  displayBreadCrumbs = () => {
    return this.state.breadCrumbs.map(crumb => {
      return <NavLink to={`/${crumb}`}>{crumb}</NavLink>;
    });
  };

  render() {
    return (
      <div className="navigation_bar">
        {this.displayNavLinks()}
        {this.displayBreadCrumbs()}
      </div>
    );
  }
}
const { func, array } = PropTypes;

NavBar.propTypes = {
  getData: func,
  favorites: array
};

export default NavBar;
