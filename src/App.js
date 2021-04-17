import React, { useEffect, useState } from "react";

const BASE_URL = "https://swapi.dev/api";
let allItems = [];
function App() {
  let [items, setItems] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    await getAllItems(`${BASE_URL}/people/`);
    await getAllItems(`${BASE_URL}/species/`);
    await getAllItems(`${BASE_URL}/planets/`);
    await getAllItems(`${BASE_URL}/starships/`);
    await getAllItems(`${BASE_URL}/vehicles/`);
    setItems(allItems);
    setIsLoading(false);
  }, []);

  async function getAllItems(url) {
    setIsLoading(true);
    let res = await (await fetch(url)).json();

    res.results.forEach(async (x) => {
      if (x.name) {
        if (x.homeworld) {
          let obj = await getSingleItem(x.homeworld);
          x.homeWorld = obj.name;
        }
        allItems.push(x);
      }
    });

    if (res.next) {
      await getAllItems(res.next);
    }
  }

  async function getSingleItem(url) {
    return await (await fetch(url)).json();
  }

  function onChangeSearchHandler(e) {
    let filter = document.querySelector('#filter').value;
    let value = e.target.value;
    let filteredItems;
    if (filter == 'name') {
      filteredItems = allItems.filter(
        (x) => x.name && x.name.toLowerCase().includes(value.toLowerCase())
      );
    } else if (filter) {
      filteredItems = allItems.filter(
        (x) => x.homeWorld && x.homeWorld.toLowerCase().includes(value.toLowerCase())
      );
    }
    
    window.scrollTo(0, 0);
    setItems(filteredItems);
  }

  return (
    <React.Fragment>
      {isLoading ? (
        <h1 className="blue-text position-absolute top-50 start-50 translate-middle mt-1 bi bi-caret-down-fill">
          Loading...
        </h1>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <input
                className="sticky-top form-control bg-dark blue-text border border-primary"
                onChange={onChangeSearchHandler}
              ></input>
            </div>
            <div className="col-md-3">
              <select
                id="filter"
                className="form-select blue-text bg-dark border border-primary"
                aria-label="Default select example"
              >
                <option className="blue-text" value="name" selected>Name</option>
                <option className="blue-text" value="homeworld">Homeworld</option>
              </select>
            </div>
          </div>

          <ul className="list-group border border-dark">
            {!isLoading &&
              items.map((x) => (
                <li key={x.name} className="bg-dark blue-text list-group-item">
                  <div>
                    <h4>{x.name}</h4>
                    <h4 className="white-text">
                      {`${x.homeWorld == "unknown" || !x.homeWorld ? "Unknown" : x.homeWorld}`}
                    </h4>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
}

export default App;
