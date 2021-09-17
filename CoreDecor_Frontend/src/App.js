import { Container } from "react-bootstrap";
import { HashRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import CategoryBar from './components/CategoryBar';
import Footer from "./components/Footer";
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
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import ResetPasswordScreen from './screens/ResetPasswordScreen';   

import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import chatBotSteps from "./chatBotSteps";
import chatBotTheme from './chatBotTheme'

function App() {
  
  return (
    
    <Router>
      <Header />
      <CategoryBar />

      <main>
        <Container>
          <Route path="/" component={HomeScreen} exact />{" "}
          {/* exact param explanation: https://stackoverflow.com/questions/49162311/react-difference-between-route-exact-path-and-route-path */}
          <Route path="/login" component={LoginScreen} />{" "}
          <Route path="/register" component={RegisterScreen} />{" "}
          <Route path="/profile" component={ProfileScreen} />{" "}
          <Route path="/shipping" component={ShippingScreen} />{" "}
          {/* <Route path="/payment" component={PaymentScreen} />{" "} */}
          <Route path="/placeorder" component={PlaceOrderScreen} />{" "}
          <Route path="/resetpassword" component={ResetPasswordScreen} />
          <Route path="/order/:id" component={OrderScreen} />{" "}
          <Route path="/products/:id" component={ProductScreen} />{" "}
          {/* Here id is dynamic */}
          <Route path="/cart/:id?" component={CartScreen} />{" "}
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component= {UserEditScreen} />
          <Route path="/admin/productlist" component={ProductListScreen} />
          <Route path="/admin/product/:id/edit" component= {ProductEditScreen} />
          <Route path="/admin/orderlist" component={OrderListScreen} />
          
          {/* Here id is dynamic. id? means id is optional */}
        </Container>
      </main>

      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <ThemeProvider theme={chatBotTheme}>
        <ChatBot steps={chatBotSteps} />
      </ThemeProvider>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
