import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import CardDetails from '../CardDetails/CardDetails';
import PropTypes from 'prop-types';
import './CardController.css';

export const CardController = ({
  data,
  path,
  getDetails,
  toggleFavorites,
  savedFavorites,
  handlePage,
  isFavorites
}) => {
  let navLinks;
  if (isFavorites && !data.length) {
    return (
      <section className="card_container">
        <p className="empty-fav">
          These are not the favorites you are looking for...
        </p>
      </section>
    );
  }
  if (!data)
    return (
      <section className="card_container">
        <img
          src="https://media2.giphy.com/media/10MKHgkZMDlQ4M/giphy.gif"
          width="100px"
          height="100px"
        />
      </section>
    );
  navLinks = data.map((card, index) => {
    if (card.data === 'films') {
      return (
        <div className="nav-route-details">
          <NavLink
            className={`movie-link movie-${index}`}
            exact
            to={`/${path}/${card.episode}`}
          >
            {card.title}
          </NavLink>
          <Route
            key={`movie-route-${index}`}
            path={`/${path}/${card.episode}`}
            render={({ match }) => {
              return (
                <CardDetails {...card} match={match} getDetails={getDetails} />
              );
            }}
          />
        </div>
      );
    }
  });

  // routes = data.map((card, index) => {
  //   if (card.data === 'films') {
  //     return (
  //       <Route
  //         key={`movie-route-${index}`}
  //         exact
  //         path={`/${path}/${card.episode}`}
  //         render={({match}) => {
  //           return(
  //             <CardDetails />
  //             )}
  //       />
  //     );
  //   }
  // });

  return <div className="card-title-container">{navLinks}</div>;

  //   const cards = data.map((card, index) => {
  //     card.favorite = savedFavorites.includes(card.name);
  //     return (
  //       <ContentCard key={index} card={card} toggleFavorites={toggleFavorites} />
  //     );
  //   });

  //   return (
  //     <section className={isFavorites ? "favorites card_container" : "card_container"}>
  //       {cards && cards}
  //       <button className="previous-page-button" onClick={() => handlePage(false)} />
  //       <button className="next-page-button" onClick={() => handlePage(true)} />
  //     </section>
  //   );
  // };

  // const { arrayOf, func, object, string, bool } = PropTypes;

  // CardContainer.propTypes = {
  //   data: arrayOf(object),
  //   savedFavorites: arrayOf(string),
  //   toggleFavorites: func,
  //   handlePage: func,
  //   isFavorites: bool
};
