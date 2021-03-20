import logo from './logo.svg';
import './App.css';
import SearchContainer from "./components/SearchContainer";
import React, {useState} from 'react';

const axios = require('axios');

function App() {
  const [results, setResults] = useState([]); //create state with empty array
  //use state returns and results being the current array
  //results gets updated // results is an array
  /*this.state = {
    'results' : " "
  }
  */
 const [searchReq, setSearchReq] = useState('');

 const makeRequest = () => {
    axios.post('http://localhost:3000/search', { //post request, give data of searchReq; will call server at that url 
      searchRequest: searchReq,
  }).then(function (response) {
    setResults(response.data.search_responses)
    console.log(response.data.search_responses);
  }).catch(function(error){
    console.log(error);
  })
};

return (
    <div className="App">
            <label htmlfor="search_request">Search:</label>
            <input type="text" id="search_request" name="search_request" value=""></input>
            <button onClick ={makeRequest} >Search</button>
       <SearchContainer results = {results} /> 
    </div>
  );
  //results is property of search container
}

export default App;
