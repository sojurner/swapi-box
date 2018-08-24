import React from "react";
import PropTypes from "prop-types";
import "./CardContainer.css";
import { ContentCard } from "../ContentCard";

export const CardContainer = ({
  data,
  toggleFavorites,
  savedFavorites,
  handlePage,
  isFavorites
}) => {

  if (isFavorites && !data.length) { 
    return (
      <section className="card_container">
        <p className="empty-fav">These are not the favorites you're looking for...</p>
      </section>);
  }
  if (!data) return (<section className="card_container">{}</section>);
  
  const cards = data.map((card, index) => {
    card.favorite = savedFavorites.includes(card.name);
    return (
      <ContentCard key={index} card={card} toggleFavorites={toggleFavorites} />
    );
  });

  return (
    <section className={isFavorites ? "favorites card_container" : "card_container"}>
      {cards && cards}
      <button className="previous-page-button" onClick={() => handlePage(false)} />
      <button className="next-page-button" onClick={() => handlePage(true)} />
    </section>
  );
};

const { arrayOf, func, object, string, bool } = PropTypes;

CardContainer.propTypes = {
  data: arrayOf(object),
  savedFavorites: arrayOf(string),
  toggleFavorites: func,
  handlePage: func,
  isFavorites: bool
};
