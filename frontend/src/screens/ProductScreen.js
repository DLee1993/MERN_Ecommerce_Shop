// - useState is to use state in functional components
// - useEffect is used to run as soon as the component loads
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import Rating from "../components/Rating";

const ProductScreen = ({ match }) => {
    // - products is what we call the state
    // - setProducts is what changes the state
    const [product, setProduct] = useState({});

    // - this gets the id we pass in when searching for a specific id
    const { id } = useParams();

    useEffect(() => {
        // - anything placed in here will run as soon as the component loads
        // - in order to use async in use effect you have to create a function
        const fetchProduct = async () => {
            // - make a call to get the products
            const { data } = await axios.get(`/products/${id}`);
            // - set the products state to the data from the axios call
            setProduct(data);
        };
        fetchProduct();
        // - you also need to pass in any dependencies for useEffect
        // - id is needed as a dependancy as it changes depending on the product
        // - useEffect will need to run when the id changes to get the correct product
    }, [id]);

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={5}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price: ${product.price}</Col>
                                <Col style={{ textAlign: "right" }}>
                                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                className='btn-block'
                                type='button'
                                disabled={product.countInStock === 0}
                            >
                                Add to Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    );
};

export default ProductScreen;
