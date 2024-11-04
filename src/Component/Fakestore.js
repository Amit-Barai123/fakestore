import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch Products 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  
  useEffect(() => {
    setTotalPages(Math.ceil(products.length / productsPerPage));
  }, [products, productsPerPage]);

  
  const handleProductsPerPageChange = (e) => {
    setProductsPerPage(Number(e.target.value));
    setCurrentPage(1); 
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Paginated Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="container mt-5">
        <div className="row mb-4 text-center">
            <div className="col">
              <h2>Fakestore</h2>
            </div>
          </div>
      <div className="row">
        
       
        <div className="col-lg-3 col-md-4 col-sm-12 mb-4 d-flex flex-column align-items-start">
          <h4 className="mb-3">Show Products Per Page</h4>
          {[5, 10, 15,20].map((num) => (
            <div key={num} className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="productsPerPage"
                value={num}
                id={`productsPerPage${num}`}
                checked={productsPerPage === num}
                onChange={handleProductsPerPageChange}
              />
              <label className="form-check-label" htmlFor={`productsPerPage${num}`}>
                {num}
              </label>
            </div>
          ))}
        </div>

       
        <div className="col-lg-9 col-md-8 col-sm-12">
          

          {/* Product Cards */}
          <div className="row">
            {currentProducts.map((product) => (
              <div key={product.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-primary">{product.title}</h5>
                    <p className="card-text text-muted text-truncate">{product.description}</p>
                    <p className="card-text fw-bold text-success">${product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="row mt-3">
              <div className="col">
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center">
                    {[...Array(totalPages)].map((_, index) => (
                      <li
                        key={index + 1}
                        className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        <a className="page-link" href="#">
                          {index + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
