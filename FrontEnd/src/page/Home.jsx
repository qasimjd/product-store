import React from "react";
import Card from "../components/Card";
import { useProductStore } from "../store/product";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { fatchProducts, products } = useProductStore();

  useEffect(() => {
    fatchProducts();
  }, [fatchProducts]);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center ">Our Products!</h1>
      {products.length === 0 && (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4 text-center">
            No Products Found!
            <Link to="/create">
              <button className="btn m-2 btn-primary">Create Product</button>
            </Link>
          </h1>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 justify-center items-center p-6">
        {products.map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
