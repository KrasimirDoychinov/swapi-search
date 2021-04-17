import { useEffect, useState } from "react";

const BASE_URL = "https://swapi.dev/api";
let allPpl = [];
function App() {
  let [items, setItems] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    await getAllItems(`${BASE_URL}/people/`);
    await getAllItems(`${BASE_URL}/planets/`);
    await getAllItems(`${BASE_URL}/films/`);
    await getAllItems(`${BASE_URL}/species/`);
    await getAllItems(`${BASE_URL}/starships/`);
    await getAllItems(`${BASE_URL}/vehicles/`);
    setItems(allPpl);
    setIsLoading(false);
  }, []);

  async function getAllItems(url) {
    setIsLoading(true);
    let res = await (await fetch(url)).json();

    res.results.forEach((x) => {
      if (x.name) {
        allPpl.push(x);
      }
    });

    if (res.next) {
      await getAllItems(res.next);
    }
  }

  function onChangeSearchHandler(e) {
    let value = e.target.value;
    let filteredPpl = allPpl.filter(
      (x) => x.name && x.name.toLowerCase().includes(value.toLowerCase())
    );
    setItems(filteredPpl);
    console.log(allPpl);
  }

  return (
    <div className="bg-white">
      <label>Search</label>
      <input
        onChange={onChangeSearchHandler}
        placeholder="Darth Vader..."
      ></input>
      {isLoading && <h1>Loading...</h1>}
      <ul>{!isLoading && items.map((x) => <li key={x.name}>{x.name}</li>)}</ul>
    </div>
  );
}

export default App;
