import React from "react";
import useStyles from "./styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ items }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <AppBar position="fixed" className={classes.appBar} color="inherit">
      <Toolbar>
        <Typography
          component={Link}
          to="/Shopping_Cart"
          variant="body2"
          className={classes.title}
          color="inherit"
        >
          <img
            src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/shopping_cart.png"
            alt="commerce.js"
            height="25px"
            className={classes.image}
          />
          ShoppingCart
        </Typography>
        <div className={classes.grow} />
        {location.pathname === "/Shopping_Cart" && (
          <div className={classes.button}>
            <IconButton
              component={Link}
              to="/cart"
              aria-label="show cart item"
              color="inherit"
            >
              <Badge badgeContent={items} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
