import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import Loader from '../components/Loader';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [active, setActive] = useState(0);
  const categories = [
    "All",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_PRODUCTS_URL}`);
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data); 
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (category, index) => {
    setActive(index);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.category === category));
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (products.length === 0) {
    return <p>Please connect to the internet.</p>;
  }

  return (
    <section className='min-h-screen w-full'>
     
      <div className="container p-5 mx-auto">
      <div className='flex gap-5 items-center justify-start overflow-x-scroll mb-10'>
        {categories.map((category, index) => (
          <button 
            key={index} 
            className={`border px-4 py-1 rounded-lg  min-w-fit ${index=== active ? 'bg-green-500 text-white':''}` }
            onClick={() => handleClick(category,index)}
          >
            {category}
          </button>
        ))}
      </div>
        <div className="flex flex-wrap -m-4">
          {filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;