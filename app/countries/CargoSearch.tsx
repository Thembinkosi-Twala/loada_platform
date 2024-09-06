// app/countries/CargoSearch.tsx
import { useState } from "react";

const CargoSearch = () => {
  const [containerNumber, setContainerNumber] = useState("");
  const [size, setSize] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(
      `/countries?containerNumber=${containerNumber}&size=${size}`
    );
    const data = await response.json();
    setResults(data);
  };

  return (
    <div>
      <h1>Search Cargos</h1>
      <input
        type="text"
        placeholder="Container Number"
        value={containerNumber}
        onChange={(e) => setContainerNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Size"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default CargoSearch;
