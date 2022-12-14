import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

const App = () => {
    return (
        <Router>
            <Header />
            <main className='py-3'>
                <Container>
                    <Routes>
                        <Route exact path='/' element={<HomeScreen />} />
                        <Route exact path='/products/:id' element={<ProductScreen />} />
                        <Route exact path='/orders/:id' element={<OrderScreen />} />
                        <Route path='/cart'>
                            <Route path=':id' element={<CartScreen />} />
                            <Route path='' element={<CartScreen />} />
                        </Route>
                        <Route exact path='/login' element={<LoginScreen />} />
                        <Route exact path='/register' element={<RegisterScreen />} />
                        <Route exact path='/userProfile' element={<ProfileScreen />} />
                        <Route exact path='/shipping' element={<ShippingScreen />} />
                        <Route exact path='/payment' element={<PaymentScreen />} />
                        <Route exact path='/placeOrder' element={<PlaceOrderScreen />} />
                    </Routes>
                </Container>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
