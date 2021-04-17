function Filter(props) {
  function onChangeSearchHandler(e) {
    let filter = document.querySelector("#filter").value;
    let value = e.target.value;
    
    let filterObj = {
        filter,
        value
    }

    props.filter(filterObj);
  }
  return (
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
          <option className="blue-text" value="name" selected>
            Name
          </option>
          <option className="blue-text" value="homeworld">
            Homeworld
          </option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
