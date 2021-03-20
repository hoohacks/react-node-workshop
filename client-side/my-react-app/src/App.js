import logo from './logo.svg';
import './App.css';
import SearchContainer from "./components/SearchContainer";
import React, { useState } from 'react';
import axios from 'axios';
// const axios = require('axios');

function App() {
  const [resultsState, setResults] = useState([]); //create state called results: initial value is empty array
  //results holds the current array -- results is an array that will get updated every time a new search is done
  /**
   * this.state = {
   *    'resultsState' : ''
   * 
   * }
   */
  const [searchReq, setSearchReq] = useState('');

  const makeRequest = () => {
    axios.post('http://localhost:3000/search', {  //post request, give data of searchReq; will call server at that url 
      searchRequest: searchReq,
    }).then(function (response) {
      console.log(response)
      setResults(response.data.search_responses) //this sets the resultsState array to hold the search responses that comes from the server
      console.log(response.data.search_responses);
    }).catch(function (error) {
      // handle error
      console.log(error);
    })
  };


  return (
    <div className="App">
      <label htmlFor="search_request">Search:</label>
      <input type="text" name="search_request" value={searchReq} onChange={event => setSearchReq(event.target.value)} /> {/*whenever we change the input, the search request will change */}
      <button onClick={makeRequest}>Search</button> {/*make the request to search when you click the button*/}
      <SearchContainer resultsProp={resultsState} /> {/*creating a SearchContainer -- which displays each result*/}
    </div>
  );
}

export default App;
