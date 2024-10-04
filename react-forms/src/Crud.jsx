import axios from "axios";
import { useEffect, useState } from "react";
import "./crud.css";

const Crud = () => {
  const [product, setProduct] = useState([]);

  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState("");
  const [isFound, seIsFound] = useState(false);
  const getData = async () => {
    try {
      const data = await axios.get("https://freetestapi.com/api/v1/cars");
      const res = data?.data;
      console.log(res);
      setProduct(res);
      setFilterProduct(res);
      const categories = [...new Set(res.map((item) => item.make))];
      setCategory(categories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleValue = (cat) => {
    if (cat === "All") {
      setFilterProduct(product);
    } else {
      const filterdData = product.filter((item) => item.make === cat);
      setFilterProduct(filterdData);
    }
  };

  const handleSearch = () => {
    const filterSearch = filterProduct.filter((item) =>
      item.model.toLowerCase().includes(search.toLowerCase())
    );
    console.log(filterSearch);
    if (filterSearch.length === 0) {
      seIsFound(true);
    } else {
      setFilterProduct(filterSearch);
      seIsFound(false);
    }
  };

  const handleEnterSearch = (e) => {
    if (e.key == "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <>
        <div className="parent">
          <div className="navbar">
            <input
              className="searchbar"
              placeholder="Write Car Name"
              onKeyDown={handleEnterSearch}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="select"
              onChange={(e) => handleValue(e.target.value)}
            >
              <option value="All">All</option>
              {category.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
            <button className="btnsearch" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        {isFound ? (
          <p>No data found</p>
        ) : (
          <div className="cardParent">
            {filterProduct.map((item) => {
              const {
                id,
                image,
                make,
                model,
                color,
                engine,
                price,
                year,
                transmission,
              } = item;
              return (
                <div key={id}>
                  <div className="card">
                    <div className="imgDiv">
                      <img className="image" src='https://img.freepik.com/free-vector/red-sedan-car-isolated-white-vector_53876-64366.jpg' />
                    </div>
                    <div className="imageContent">
                      <h2>{make}</h2>
                      <h4>
                        Model:<span>{model}</span>
                      </h4>
                      <h4>color:{color}</h4>
                      <h4>Engine:{engine}</h4>
                      <h4>Transmission:{transmission}</h4>
                      <h4>Price:{price}</h4>
                      <h4>Year:{year}</h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    </div>
  );
};

export default Crud;
