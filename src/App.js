// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://billingappbackend.onrender.com/api/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addProduct = async () => {
    try {
      const response = await axios.post(
        "https://billingappbackend.onrender.com/api/products",
        { name, price, quantity }
      );
      setProducts([...products, response.data]);
      setName("");
      setPrice("");
      setQuantity("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (products.length > 0) {
      setTotalPrice(
        products.map((bill) => bill.price).reduce((acc, amount) => acc + amount)
      );
      setTotalQuantity(
        products
          .map((bill) => bill.quantity)
          .reduce((acc, amount) => acc + amount)
      );
    }
  }, [products]);

  return (
    <div className="IBAContainer">
      <h1 className="HeaderIBA">Inventory Billing App</h1>
      <div className="productDetail">
        <h2>Add Product</h2>
        <div className="InputSection">
          <label for="#name">Name Of the Product</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="InputSection">
          <label for="#price">Price Of the Rupees</label>
          <input
            id="price"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="InputSection">
          <label for="#price">Quantity in number</label>
          <input
            id="quantity"
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <button onClick={addProduct}>Add</button>
      </div>{" "}
      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
        <thead>
          <tr>
            <th>Total</th>
            <th>{totalPrice}</th>
            <th>{totalQuantity}</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default App;
