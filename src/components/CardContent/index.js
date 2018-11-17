import React from 'react';
import './CardContent.css';

export const CardContent = ({ data, selectedCard, selectCard, activeType }) => {
  return (
    <div className="selected-card" onClick={e => selectCard(e, data)}>
      <h5>{data.name}</h5>
    </div>
  );
};
