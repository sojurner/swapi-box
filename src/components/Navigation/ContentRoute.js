import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { HomePage } from '../HomePage';
import { CardController } from '../CardController';

class ContentRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentRoute: this.props.activeButton,
      breadCrumbs: null
    };
  }

  render() {
    const {
      toggleFavorites,
      handlePage,
      dataType,
      activeButton,
      getMovieDetails
    } = this.props;
    console.log(dataType);
    console.log(activeButton);

    const savedFavorites = dataType.favorites.map(favorite => favorite.name);

    const contentRoute = (
      <Route
        path={`/${activeButton}`}
        render={({ match, history }) => {
          const { path } = match;
          const chosenPath = path.slice(1);
          return (
            <CardController
              getDetails={this.getDetails}
              path={chosenPath}
              data={dataType[chosenPath]}
              handlePage={handlePage}
              toggleFavorites={toggleFavorites}
              savedFavorites={savedFavorites}
              isFavorites={activeButton === 'favorites'}
            />
          );
        }}
      />
    );
    return (
      <div>
        <Route exact path="/" component={HomePage} />
        {contentRoute}
      </div>
    );
  }
}
const { arrayOf, array, func, string, bool, shape } = PropTypes;

ContentRoute.propTypes = {
  dataType: shape({
    planets: arrayOf(
      shape({
        climate: string,
        favorite: bool,
        name: string,
        populaton: string,
        residents: arrayOf(string),
        terrain: string
      })
    ),
    people: arrayOf(
      shape({
        favorite: bool,
        homeworld: string,
        name: string,
        population: string,
        species: string
      })
    ),
    vehicle: arrayOf(
      shape({
        class: string,
        favorite: bool,
        model: string,
        name: string,
        'number of passengers': string
      })
    ),
    favorites: array
  }),
  handlePage: func,
  toggleFavorites: func,
  activeButton: string
};

export default ContentRoute;
