function ItemList(props) {
  
  return (
    <ul className="list-group border border-dark">
      {!props.isLoading &&
        props.items.map((x) => (
          <li key={x.name} className="bg-dark blue-text list-group-item">
            <div>
              <h4>{x.name}</h4>
              <h4 className="white-text">
                {x.homeWorld && x.homeWorld}
                {x.manufacturer && x.manufacturer}
                {x._terrain && x._terrain}
              </h4>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default ItemList;
