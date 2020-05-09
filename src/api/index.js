import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://covid-193.p.rapidapi.com';
const HEADERS = {
  'content-type': 'application/octet-stream',
  'x-rapidapi-host': 'covid-193.p.rapidapi.com',
  'x-rapidapi-key': API_KEY,
};

// Get List of All Countries:
export const fetch_all_countries = async () => {
  return await axios({
    method: 'GET',
    url: `${BASE_URL}/countries`,
    headers: HEADERS,
  })
    .then((response) => {
      return response.data.response;
    })
    .catch((error) => {
      console.log(error);
    });
};

// Get current statistics for all countries or a given country:
export const fetch_all_data = async (country) => {
  let CUSTOM_URL = `${BASE_URL}/statistics`;

  if (country) {
    CUSTOM_URL = `${BASE_URL}/statistics?country=${country}`;
  }

  return await axios({
    method: 'GET',
    url: CUSTOM_URL,
    headers: HEADERS,
  })
    .then((response) => {
      return response.data.response;
    })
    .catch((error) => {
      console.log(error);
    });
};

// Get historical data for all countries or a given country:
export const fetch_all_history = async (country) => {
  let CUSTOM_URL = `${BASE_URL}/history?country=All`;

  if (country) {
    CUSTOM_URL = `${BASE_URL}/history?country=${country}`;
  }

  return await axios({
    method: 'GET',
    url: CUSTOM_URL,
    headers: HEADERS,
  })
    .then((response) => {
      // console.log(response.data.response);
      return response.data.response;
    })
    .catch((error) => {
      console.log(error);
    });
};
