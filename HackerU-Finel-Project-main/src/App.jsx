import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";
import { ShoppingCartBox } from "./page/Basket";
import "./App.css";
import AuthGuardRoute from "./components/AuthGuardRoute";
import NavBarComponent from "./components/NavBarComponent/NavBarComponent";
import CardInfoPage from "./page/CardInfoPage";
import CardsPanelPage from "./page/CardsPanelPage";
import WomenStore from "./page/Women";
import MenStore from "./page/Men";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import NotFoundPage from "./page/NotFoundPage";
import CardRegister from "./page/CardsRegister";
import WomenCardRegister from "./page/WomenCardRegister";
import AuthRegister from "./components/AuthRegister";
import AboutPage from "./page/Aboutpage";
import Footer from "./page/Footer";
import CardUpdate from "./page/CardUpdate";
import { NikeStore } from "./page/NikeStore";
import Basket from "./page/Basket";
import RestPassword from "./page/RestPass";
import ChangePass from "./page/ChangePass";
import Checkout from "./page/CheckOutPage";

const SignupPage = React.lazy(() => import("./page/SignupPage"));

function App() {
  const [shoppingCart, setShoppingCart] = useState([]);

  const history = useHistory();

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

  const clearShoppingCart = () => {
    history.push("/checkout");
  };

  useEffect(() => {
    window.localStorage.setItem("product", JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  return (
    <div>
      <NavBarComponent></NavBarComponent>

      <Box sx={{ display: "flex", flexDirection: "column", py: 1, m: 3 }}>
        <Box sx={{ ml: "auto" }}>
          {shoppingCart.length === 0 ? (
            ""
          ) : (
            <ShoppingCartBox
              clearShoppingCart={clearShoppingCart}
              ShoppingCart={shoppingCart}
            />
          )}
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
          {/* <AuthGuardRoute path="/checkout" component={Checkout} /> */}
          <Route
            path="/checkout"
            component={Checkout}
            ShoppingCart={shoppingCart}
          />
          <AuthGuardRoute
            path="/womencardregister"
            component={WomenCardRegister}
          />
          <Route exact path="/women">
            {" "}
            <WomenStore
              handleBuyButtonClick={addItemToShoppingCart}
              handleRemoveButtonClick={RemoveItemToShoppingCart}
            />
          </Route>
          <Route exact path="/men">
            {" "}
            <MenStore
              handleBuyButtonClick={addItemToShoppingCart}
              handleRemoveButtonClick={RemoveItemToShoppingCart}
            />
          </Route>
          <Route exact path="/CardsPanelPage">
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
