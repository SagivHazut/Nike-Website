import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation} from "react-router-dom";
import { Box } from "@mui/material";
import { ShoppingCartBox } from "./pages/Basket";
import "./App.css";
import AuthGuardRoute from "./components/AuthGuardRoute";
import NavBarComponent from "./components/NavBarComponent/NavBarComponent";
import CardInfoPage from "./pages/CardInfoPage";
import CardsPanelPage from "./pages/CardsPanelPage";
import WomenStore from "./pages/Women";
import MenStore from "./pages/Men";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import CardRegister from "./pages/CardsRegister";
import WomenCardRegister from "./pages/WomenCardRegister";
import AuthRegister from "./components/AuthRegister";
import AboutPage from "./pages/Aboutpage";
import Footer from "./pages/Footer";
import CardUpdate from "./pages/CardUpdate";
import { NikeStore } from "./pages/NikeStore";
import Basket from "./pages/Basket";
import RestPassword from "./pages/RestPass";
import ChangePass from "./pages/ChangePass";
import checkout from "./pages/CheckOutPage";

const SignupPage = React.lazy(() => import("./pages/SignupPage"));

function App() {
  const [shoppingCart, setShoppingCart] = useState([]);
  
  const history = useHistory();

  const [items, setItems] = useState([]);


  useEffect(() => {
    axios
      .get("/cards/allCards")
      .then(({ data }) => {
        setItems(data);
      })
      .catch((err) => {});
  }, []);

  const addItemToShoppingCart = (item) => {
    const currentShoppingCart = [...shoppingCart];

    currentShoppingCart.push(item);
    setShoppingCart(currentShoppingCart);
  };

  const RemoveItemToShoppingCart = (item) => {
    const currentShoppingCart = [...shoppingCart];

    currentShoppingCart.pop(item);
    setShoppingCart(currentShoppingCart);
  };
  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  const clearShoppingCart = () => {
    history.push("/checkout");
  };
  

  return (
    
    <div>


      <NavBarComponent></NavBarComponent>

      <Box sx={{ display: "flex", flexDirection: "column", py: 1, m: 1 }}>
        <Box sx={{ ml: "auto" }}>
        { shoppingCart.length === 0 ? (
""
             
                ):(<ShoppingCartBox
                  clearShoppingCart={clearShoppingCart}
                  ShoppingCart={shoppingCart}
      
                />   )}

        </Box>
      </Box>
      <ToastContainer />
      <Suspense fallback={<div>loading</div>}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={HomePage} />
          <Route path="/basket" component={Basket} />
          <Route path="/changepass" component={ChangePass} />
          <Route path="/resetpassword" component={RestPassword} />
          <AuthRegister path="/login" component={LoginPage} />
          <AuthRegister path="/signup" component={SignupPage} />
          <AuthGuardRoute path="/cardregister" component={CardRegister} />
          <AuthGuardRoute path="/checkout" component={checkout} />
          <AuthGuardRoute
            path="/womencardregister"
            component={WomenCardRegister}
          />
          <Route exact path="/women">  <WomenStore
        handleBuyButtonClick={addItemToShoppingCart}
        handleRemoveButtonClick={RemoveItemToShoppingCart}
      /></Route>
          <Route exact path="/men">  <MenStore
        handleBuyButtonClick={addItemToShoppingCart}
        handleRemoveButtonClick={RemoveItemToShoppingCart}
      /></Route>
          <Route  exact path="/CardsPanelPage">  
           <CardsPanelPage
        handleBuyButtonClick={addItemToShoppingCart}
        handleRemoveButtonClick={RemoveItemToShoppingCart}
      />
       </Route> 
          <Route path="/card/:id" component={CardInfoPage} />
          <Route path="/aboutpage" component={AboutPage} />
          <Route path="/store" component={NikeStore} />
          <AuthGuardRoute path="/CardUpdate" component={CardUpdate} />

          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Suspense>

      <Footer></Footer>
    </div>
  );
}

export default App;
