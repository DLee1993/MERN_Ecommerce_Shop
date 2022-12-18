import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";

const ProfileScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // - get the user and error from the userDetails state
    const userDetails = useSelector((state) => state.userDetails);
    const { error, user } = userDetails;

    // - get the user info from the userLogin state
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // - get the success value from the updateUserProfile state
    const userUpdateProfile = useSelector((state) => state.updateUserProfile);
    const { success } = userUpdateProfile;

    const myOrders = useSelector((state) => state.myOrders);
    const { loading: loadingOrders, error: orderError, orders } = myOrders;

    useEffect(() => {
        // - if theres no userInfo then navigate back to the login page
        if (!userInfo) {
            navigate("/login");
        } else {
            // - if there is no name then dispatch to retrieve the user details
            if (!user.name) {
                dispatch(getUserDetails("profile"));
                dispatch(listMyOrders());
            } else {
                // - if there is a name then set the name to the user.name and and email to the user.email
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [navigate, userInfo, dispatch, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        // Dispatch Register
        password !== confirmPassword
            ? setMessage("Passwords do not match")
            : dispatch(updateUserProfile({ id: user._id, name, email, password }));
    };

    return (
        <Row>
            <Col md={3}>
                <h1>Profile</h1>
                {/* The below will check to see if the values are true, if they are they will show the message */}
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile Updated</Message>}
                {/**/}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>confirmPassword</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter confirmPassword'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders && <Loader />}
                {orderError ? (
                    <Message variant='danger'>{orderError}</Message>
                ) : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders &&
                                orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice}</td>
                                        <td style={{textAlign: 'center'}}>
                                            {order.isPaid ? (
                                                <i
                                                    className='fas fa-check'
                                                    style={{ color: "green" }}
                                                ></i>
                                            ) : (
                                                <i
                                                    className='fas fa-times'
                                                    style={{ color: "red" }}
                                                ></i>
                                            )}
                                        </td>
                                        <td style={{textAlign: 'center'}}>
                                            {order.isDelivered ? (
                                                order.deliveredAt.substring(0, 10)
                                            ) : (
                                                <i
                                                    className='fas fa-times'
                                                    style={{ color: "red" }}
                                                ></i>
                                            )}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/orders/${order._id}`}>
                                                <Button className='btn-sm' variant='light'>Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    );
};

export default ProfileScreen;
