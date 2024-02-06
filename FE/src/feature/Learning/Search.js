import React, { useState, useEffect } from "react";

export default function Search({ wordList }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (wordList) {
      const results = wordList.filter((wordObj) => wordObj.word.toLowerCase().includes(searchTerm.toLowerCase()));
      setSearchResults(results);
    }
  }, [searchTerm, wordList]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input type="text" placeholder="단어 검색..." value={searchTerm} onChange={handleChange} />
      <ul>
        {searchResults.map((wordObj, index) => (
          <li key={index}>{wordObj.word}</li>
        ))}
      </ul>
    </div>
  );
}
