import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
    const [products, setProducts] = useState([]); // Store product data
    const [nextPage, setNextPage] = useState(null); // Store the next page URL
    const [prevPage, setPrevPage] = useState(null); // Store the previous page URL
    const [error, setError] = useState(null); // Handle errors

    // Function to fetch paginated product data
    const fetchProducts = (url = "http://127.0.0.1:8000/api/products/") => {
        axios
            .get(url)
            .then((response) => {
                // Update product list and pagination URLs
                setProducts(response.data.results || []);
                setNextPage(response.data.next);
                setPrevPage(response.data.previous);
                setError(null); // Clear any previous error
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setError("Failed to load products. Please try again.");
            });
    };

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Products</h1>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error if any */}
            <ul>
                {products.map((product) => (
                    <li key={product.id}> {/* Ensure each list item has a unique key */}
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                    </li>
                ))}
            </ul>
            <div>
                {prevPage && (
                    <button onClick={() => fetchProducts(prevPage)}>Previous</button>
                )}
                {nextPage && (
                    <button onClick={() => fetchProducts(nextPage)}>Next</button>
                )}
            </div>
        </div>
    );
};

export default ProductList;
