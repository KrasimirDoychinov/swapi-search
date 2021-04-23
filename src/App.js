import React, { useEffect, useState } from "react";
import Loading from "./components/Loading";
import Filter from "./components/Filter";
import ItemList from "./components/ItemList";

const BASE_URL = "https://swapi.dev/api";
let allItems = [];

function App() {
  let [items, setItems] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    let people = getAllItems(`${BASE_URL}/people/`);
    let species = getAllItems(`${BASE_URL}/species/`);
    let planets = getAllItems(`${BASE_URL}/planets/`);
    let starships = getAllItems(`${BASE_URL}/starships/`);
    let vehicles = getAllItems(`${BASE_URL}/vehicles/`);
    await Promise.all([people, species, planets, starships, vehicles]);
    setItems(allItems);
    setIsLoading(false);
  }, []);

  async function getAllItems(url) {
    let res = await (await fetch(url)).json();

    res.results.forEach(async (x) => {
      if (x.name) {
        if (x.homeworld) {
          let obj = await getSingleItem(x.homeworld);
          x.homeWorld = obj.name;
        } else if (x.manufacturer) {
          x.homeWorld = x.manufacturer;
        } 
      }
      allItems.push(x);
    });

    if (res.next) {
      await getAllItems(res.next);
    }
  }

  async function getSingleItem(url) {
    return await (await fetch(url)).json();
  }

  function onChangeSearchHandler(filterObj) {
    let filteredItems;

    if (filterObj.filter == "name") {
      filteredItems = allItems.filter(
        (x) =>
          x.name && x.name.toLowerCase().includes(filterObj.value.toLowerCase())
      );
    } else if (filterObj.filter) {
      filteredItems = allItems.filter(
        (x) =>
          x.homeWorld &&
          x.homeWorld.toLowerCase().includes(filterObj.value.toLowerCase())
      );
    }

    window.scrollTo(0, 0);
    setItems(filteredItems);
  }

  return (
    <React.Fragment>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container">
          <Filter filter={onChangeSearchHandler} itemCount={items.length} />
          <ItemList isLoading={isLoading} items={items} />
        </div>
      )}
    </React.Fragment>
  );
}

export default App;
