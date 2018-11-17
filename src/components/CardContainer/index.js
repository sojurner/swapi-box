import React from 'react';
import PropTypes from 'prop-types';
import { CardContent } from '../CardContent';
import './CardContainer.css';
import * as clean from '../../helpers/data_cleaner/dataCleaner';

export const CardContainer = ({
  cardDetails,
  activeType,
  toggleFavorites,
  selectCard,
  selectedCard
}) => {
  const content = cardDetails.map((item, index) => {
    const data = clean.characterScrape(item);
    return (
      <CardContent
        key={`content-${index}`}
        activeType={activeType}
        selectedCard={selectedCard}
        selectCard={selectCard}
        data={data}
      />
    );
  });

  //   if (key === 'favorite') return;
  //   return key === 'name' ? (
  //     <h1 key={key + i}>{card[key]}</h1>
  //   ) : (
  //     <p key={key + i}>
  //       {key}: {card[key]}
  //     </p>
  //   );
  // });
  return (
    <article className="content_card">
      {content}
      {/* <button className="button" onClick={() => toggleFavorites(card)} /> */}
    </article>
  );
};

const { object, func } = PropTypes;

CardContainer.propTypes = {
  card: object,
  toggleFavorites: func
};
