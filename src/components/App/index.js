import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../Navigation/NavBar';

import ContentRoute from '../Navigation/ContentRoute';
import * as fetch from '../../helpers/api_calls/apiCalls';
import { BackgroundScroll } from '../BackgroundScroll';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeButton: '',
      pageCounter: 1,
      navDisplay: false,
      films: null,
      backgroundFilm: null,
      planets: null,
      people: null,
      vehicles: null,
      favorites: [],
      errorStatus: ''
    };
  }

  async componentDidMount() {
    const backgroundScroll = { target: { name: 'films' } };
    await this.getData(backgroundScroll);
    this.setRandomFilm();
    this.setFavoritesFromStorage();
  }

  setRandomFilm = () => {
    const { films } = this.state;
    if (!films) return;
    const randomFilmIndex = () => (Math.random() * films.length + 0.5) << 0;
    const backgroundFilm = films[randomFilmIndex()];
    this.setState({ backgroundFilm });
  };

  getData = async (event, page) => {
    const newPage = page;
    let { name } = event.target;
    this.setButtonPressed(name);
    let alreadyHasData =
      this.state[name] !== null || this.state[name] ? true : false;
    if (page !== 1) {
      alreadyHasData = false;
    }

    if (alreadyHasData) return;
    try {
      const result = await fetch.FetchApi(name, newPage);
      this.setState({ [name]: result });
    } catch (error) {
      this.setState({ errorStatus: error.message });
    }
  };

  getDetails = async (url, type) => {
    return await fetch.fetchDetails(url);
  };

  setButtonPressed = activeButton => {
    if (activeButton !== this.state.activeButton) {
      this.setState({ activeButton, pageCounter: 1 });
    }
  };

  toggleFavorites = cardData => {
    const toggleCard = cardData;
    toggleCard.favorite = !toggleCard.favorite;
    this.handleFavorites(toggleCard);
  };

  handleFavorites = cardData => {
    let favorites;
    if (cardData.favorite) {
      favorites = [...this.state.favorites, cardData];
    } else {
      favorites = this.state.favorites.filter(
        card => card.name !== cardData.name
      );
    }
    this.setState({ favorites });
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  handlePage = async boolean => {
    const { pageCounter, activeButton } = this.state;
    const pageContent = { target: { name: activeButton } };
    let pageCount = pageCounter;

    switch (boolean) {
      case true:
        !pageCount ? (pageCount = 2) : pageCount++;
        break;
      case false:
        pageCount > 2 ? pageCount-- : (pageCount = '');
        break;
      default:
        return;
    }

    this.setState({ pageCounter: pageCount });
    await this.getData(pageContent, pageCount);
  };

  setFavoritesFromStorage = () => {
    if (localStorage.getItem('favorites')) {
      const favorites = JSON.parse(localStorage.getItem('favorites'));
      this.setState({ favorites });
    }
    return;
  };

  handleClick = () => {
    this.setState({ navDisplay: !this.state.navDisplay });
  };

  render() {
    const {
      people,
      planets,
      vehicles,
      favorites,
      films,
      backgroundFilm,
      activeButton,
      navDisplay
    } = this.state;

    return (
      <Router>
        <div className={`${activeButton} App`}>
          <header className="App__TITLE">
            <h1>SWAPI BOX</h1>
          </header>
          {backgroundFilm && <BackgroundScroll {...backgroundFilm} />}
          {
            <i
              className={
                !navDisplay
                  ? `fab fa-galactic-republic`
                  : `fas fa-chevron-circle-left`
              }
              onClick={this.handleClick}
            />
          }
          {navDisplay && (
            <NavBar
              getData={this.getData}
              favorites={favorites}
              state={this.state}
            />
          )}
          <ContentRoute
            getDetails={this.getDetails}
            toggleFavorites={this.toggleFavorites}
            dataType={{ films, people, planets, vehicles, favorites }}
            handlePage={this.handlePage}
            activeButton={activeButton}
          />
        </div>
      </Router>
    );
  }
}

export default App;
