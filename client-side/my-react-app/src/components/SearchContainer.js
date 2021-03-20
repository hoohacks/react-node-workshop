import React from 'react';
import SearchResult from "./SearchResult";

function SearchContainer({ resultsProp }) {  
    return <div>
        {resultsProp.map((result, idx) => //result is an individual element within the resultsState array which is stored in resultsProp
            <SearchResult key={idx} title={result} /> //key and title are props 
        )}
    </div>;

}

export default SearchContainer;
