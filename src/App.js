import React, { useState, useEffect } from "react";
import { commerce } from "../src/lib/commerce";
import { Products, Navbar, Cart, Checkout } from "./Components";
import { BrowserRouter as Ruoter, Route, Switch } from "react-router-dom";
const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errormas, setErrormas] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchcart = async () => {
    const productsCart = await commerce.cart.retrieve();
    setCart(productsCart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handlecaptuercheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrormas(error.data.error.message);
    }
  };

  const handleAddToCard = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  const removecart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const updateqty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  const emptycart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchcart();
  }, []);

  return (
    <Ruoter>
      <div>
        <Navbar items={cart.total_items} />
        <Switch>
          <Route exact path="/Shopping_Cart">
            <Products products={products} handleAddToCard={handleAddToCard} />
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              removecart={removecart}
              updateqty={updateqty}
              emptycart={emptycart}
            />
          </Route>
          <Route exact path="/Checkout">
            <Checkout
              cart={cart}
              order={order}
              onCapCheckout={handlecaptuercheckout}
              error={errormas}
              refreshCart={refreshCart}
            />
          </Route>
        </Switch>
      </div>
    </Ruoter>
  );
};
export default App;
