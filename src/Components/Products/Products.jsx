import React from "react";
import Product from "../Products/product/Product";
import { Grid } from "@material-ui/core";
import useStyles from "./styles";
const Products = ({ products, handleAddToCard }) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justifyContent="center" spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3} lg={3}>
            <Product product={product} handleAdd={handleAddToCard} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};
export default Products;
