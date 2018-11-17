import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchDetails } from '../../helpers/api_calls/apiCalls';
import './CardDetails.css';
import { CardContainer } from '../CardContainer';

class CardDetails extends Component {
  constructor() {
    super();
    this.state = {
      characters: null,
      species: null,
      starships: null,
      vehicles: null,
      planets: null,
      activeType: null,
      selectedCard: null
    };
  }

  async componentDidMount() {
    await this.getDetails();
  }

  getDetails = () => {
    const { details } = this.props;
    Object.keys(details).map(async detail => {
      const cardContent = details[detail].map(async url => {
        return await fetchDetails(url, detail);
      });

      const cardDetails = await Promise.all(cardContent);
      await this.setState({ [detail]: cardDetails });
    });
  };

  setActiveType = (e, activeType) => {
    e.preventDefault();
    this.setState({ activeType });
  };

  tableHeaders = () => {
    const { match } = this.props;
    return Object.keys(this.state).map(state => {
      return (
        <div onClick={e => this.setActiveType(e, state)}>
          <NavLink className="header-elements" to={`${match.path}/${state}`}>
            {state}
          </NavLink>
        </div>
      );
    });
  };

  selectCard = (e, selectedCard) => {
    this.setState({ selectedCard });
  };

  render() {
    const { activeType, selectedCard } = this.state;
    return (
      <div className="table-headers">
        {this.tableHeaders()}
        <Route
          path={`${this.props.match.path}/${activeType}`}
          render={() => {
            return (
              <CardContainer
                selectedCard={selectedCard}
                selectCard={this.selectCard}
                cardDetails={this.state[activeType]}
                activeType={activeType}
              />
            );
          }}
        />
        ;
      </div>
    );
  }
}

export default CardDetails;
