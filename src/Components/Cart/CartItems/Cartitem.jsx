import React from "react";
import {
  Typography,
  Card,
  Button,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import useStyles from "./styles";
export const Cartitem = ({ item, removecart, updateqty }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardMedia image={item.image.url} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">{item.name}</Typography>
        <Typography variant="h5">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => updateqty(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => updateqty(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          className={classes.emptyButton}
          type="button"
          variant="contained"
          color="secondary"
          onClick={() => removecart(item.id)}
        >
          remove
        </Button>
      </CardActions>
    </Card>
  );
};
export default Cartitem;
