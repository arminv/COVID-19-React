import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl, LinearProgress } from '@material-ui/core';

import './App.css';

import {
  fetch_all_data,
  fetch_all_countries,
  fetch_all_history,
} from './api/index';

import Cards from './components/Cards';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import LineChart from './components/LineChart';
import HistoryChart from './components/HistoryChart';

const App = () => {
  const [data, setData] = useState({});
  const [allData, setAllData] = useState({});
  const [allHistoryData, setAllHistoryData] = useState({});
  const [countries, setCountries] = useState('');
  const [country, setCountry] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Global summary:
    async function getData() {
      const currentData = await fetch_all_data('All');
      setData(currentData);
    }
    getData();

    // Summary data for all countries:
    async function getAllData() {
      const currentAllData = await fetch_all_data();
      setAllData(currentAllData);
    }
    getAllData();

    // All historical data:
    async function getAllHistoryData() {
      const currentHistoryData = await fetch_all_history();
      setAllHistoryData(currentHistoryData);
      setIsLoading(false);
    }
    getAllHistoryData();
    // As the data is updated every 15mins, we want to fetch on every render (not just once when component mounts):
  }, []);

  // List of all countries:
  useEffect(() => {
    async function fetchCountries() {
      setCountries(await fetch_all_countries());
    }

    fetchCountries();
  }, [setCountries]);

  const allCountriesList = Object.keys(countries).map((country, index) => (
    <option key={index} value={countries[index]}>
      {countries[index]}
    </option>
  ));

  const handleCountryChange = async (country) => {
    const countryData = await fetch_all_data(country);
    setData(countryData);
    const countryHistoryData = await fetch_all_history(country);
    setAllHistoryData(countryHistoryData);
    setCountry(country);
    setIsLoading(false);
  };

  return isLoading ? (
    <LinearProgress className='loading' />
  ) : (
    <div className='container'>
      <FormControl className='dropdown'>
        <NativeSelect
          defaultValue=''
          onChange={(e) => handleCountryChange(e.target.value)}
        >
          <option value='All'>Global</option>
          {allCountriesList}
        </NativeSelect>
      </FormControl>

      <div className='card'>
        <Cards data={data[0]} />
      </div>
      <div className='charts'>
        <HistoryChart data={allHistoryData} />
        <br />
        <br />
        {country === 'All' ? <LineChart data={allData} continent /> : null}
        <br />
        <br />
        {country === 'All' ? <LineChart data={allData} /> : null}
        <br />
        <br />
        <PieChart data={data[0]} />
        <br />
        <br />
        <BarChart data={data[0]} />
      </div>
    </div>
  );
};

export default App;
