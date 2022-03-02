import React from "react";
import Cartitem from "./CartItems/Cartitem";
import { Link } from "react-router-dom";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import useStyles from "./styles";
const Cart = ({ cart, removecart, updateqty, emptycart }) => {
  const classes = useStyles();

  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">
        You Dont Have Any Items In Your Cart,
        <Link to="/Shopping_Cart" className={classes.link}>
          Start Adding some
        </Link>
      </Typography>
    );
  };

  const FilledCart = () => {
    return (
      <div>
        <Grid container spacing={3}>
          {cart.line_items.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
              <Cartitem
                item={item}
                removecart={removecart}
                updateqty={updateqty}
              />
            </Grid>
          ))}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant="h4">
            Subtotal: {cart.subtotal.formatted_with_symbol}
          </Typography>
          <div>
            <Button
              className={classes.emptyButton}
              size="large"
              type="button"
              variant="contained"
              color="secondary"
              onClick={emptycart}
            >
              Empty Cart
            </Button>
            <Button
              component={Link}
              to="./Checkout"
              className={classes.checkoutButton}
              size="large"
              type="button"
              variant="contained"
              color="primary"
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    );
  };

  if (!cart.line_items) return "Loding...";

  return (
    <Container className={classes.toolbar}>
      <Typography className={classes.title} gutterBottom variant="h3">
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
