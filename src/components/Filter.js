function Filter(props) {
  function onChangeSearchHandler(e) {
    let filter = document.querySelector("#filter").value;
    let value = e.target.value;

    let filterObj = {
      filter,
      value,
    };

    props.filter(filterObj);
  }
  return (
    <div className="row">
      <div className="col-md-6">
        <input
          className="sticky-top form-control bg-dark blue-text border border-primary"
          onChange={onChangeSearchHandler}
        ></input>
      </div>
      <div className="col-md-4">
        <select
          id="filter"
          className="form-select blue-text bg-dark border border-primary"
          aria-label="Default select example"
          defaultValue=""
        >
          <option className="blue-text" value="name">
            Name
          </option>
          <option className="blue-text" value="homeworld">
            Homeworld
          </option>
        </select>
      </div>
      <div className="col-md-3 blue-text">
        <h6>Items found: {props.itemCount}</h6>
      </div>
    </div>
  );
}

export default Filter;
