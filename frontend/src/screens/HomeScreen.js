// - useState is to use state in functional components
// - useEffect is used to run as soon as the component loads
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

const HomeScreen = () => {
    // - products is what we call the state
    // - setProducts is what changes the state
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // - anything placed in here will run as soon as the component loads
        // - in order to use async in use effect you have to create a function
        const fetchProducts = async () => {
            // - make a call to get the products
            const { data } = await axios.get("/products");
            // - set the products state to the data from the axios call
            setProducts(data);
        };
        fetchProducts();
        // - you also need to pass in any dependencies for useEffect
    }, []);
    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default HomeScreen;
