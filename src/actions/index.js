import fetch from 'isomorphic-fetch';
import {  GET_BEERS_REQUESTED,
          GET_BEERS_DONE,
          GET_BEERS_FAILED,
          GET_BEER_REQUESTED,
          GET_BEER_DONE,
          GET_BEER_FAILED } from '../constants/action-types';




const getBeersRequested = () => {
  return {
    type: GET_BEERS_REQUESTED
  };
}

const getBeersDone = data => {
  return {
    type: GET_BEERS_DONE,
    payload: data
  };
}

const getBeersFailed = () => {
  return {
    type: GET_BEERS_FAILED
  };
}

export const getBeers = () => dispatch => {

  dispatch(getBeersRequested());

  let url = 'https://api.punkapi.com/v2/beers?page=2&per_page=80';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      dispatch(getBeersDone(data));
    })
    .catch(error => {
      dispatch(getBeersFailed(error));
    })
}




const getBeerRequested = () => {
  return {
    type: 'GET_BEER_REQUESTED'
  };
}

const getBeerDone = beer => {
  return {
    type: 'GET_BEER_DONE',
    payload: beer
  };
}

const getBeerFailed = () => {
  return {
    type: 'GET_BEER_FAILED'
  };
}

export const getSingleBeer = id => dispatch => {

  dispatch(getBeerRequested());

  let url = 'https://api.punkapi.com/v2/beers/'+id;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      dispatch(getBeerDone(data[0]));
    })
    .catch(error => {
      dispatch(getBeerFailed(error));
    })
}




















//
// export const addUser = user => dispatch => dispatch(addUserAsync(user))
//
// export const addUserAsync = user => {
//     return {
//       type: ADD_USER,
//       payload: user
//     };
// }
//
// export const updateUser = user => dispatch => dispatch(updateUserAsync(user))
//
// export const updateUserAsync = user => {
//     return {
//       type: UPDATE_USER,
//       payload: user
//     };
// }
//
// export const deleteUser = id => dispatch => dispatch(deleteUserAsync(id))
//
// export const deleteUserAsync = id => {
//     return {
//       type: DELETE_USER,
//       payload: id
//     };
// }