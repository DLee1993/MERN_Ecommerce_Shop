// - useState is to use state in functional components
// - useEffect is used to run as soon as the component loads
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
    const dispatch = useDispatch();

    // - get the product list from state
    const productList = useSelector((state) => state.productList);

    // - destructure what you want to use from the productList state
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <>
            <h1>Latest Products</h1>
            {loading ? (
                <h1>Loading...</h1>
            ) : error ? (
                <h3>{error}</h3>
            ) : (
                <Row>
                    {products.map((product) => (
                        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
};

export default HomeScreen;
