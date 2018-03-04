import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSingleBeer } from '../actions/index';


const mapStateToProps = state => {
  return {
    beer: state.singleBeer.beer,
    isError: state.singleBeer.isError,
    isLoading: state.singleBeer.isLoading,
   };
};

class BeerItemFull extends Component {

  componentDidMount() {
    const { getSingleBeer } = this.props;
    let id = this.props.match.params.id
    getSingleBeer(id);
  }

  render() {
    const { beer, isError, isLoading } = this.props;

    if(isError) {
      return <p className='error-info'>Error!</p>
    }

    if(isLoading) {
      return (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )
    }

    const pairing = beer.food_pairing  &&
      (
        <ul>
          <h3 className='beer-pairing-head'>Pairing food:</h3>
          {beer.food_pairing.map( (f, i) => <li className='beer-pairing-item' key={i}>{f}</li>)}
        </ul>
      )

    return (
      <div className='beer-item-full'>
        <img className='beer-img-full' src={beer.image_url} alt={`${beer.name}'s bottle`}/>
        <div className="beer-details">
          <h1 className='beer-name'>{beer.name}</h1>
          <p className='beer-tagline'>{beer.tagline}</p>
          <p className='beer-description'>{beer.description}</p>
          <p className='beer-tips'>{beer.brewers_tips}</p>
          <ul>
            {pairing}
          </ul>
          <small className='beer-contributed'>Contributed by: {beer.contributed_by}</small>
        </div>
      </div>
    )
  }
}

const BeerItem = connect(mapStateToProps, { getSingleBeer })(BeerItemFull);

BeerItemFull.propTypes = {
  beer: PropTypes.object.isRequired,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool
};

export default BeerItem
