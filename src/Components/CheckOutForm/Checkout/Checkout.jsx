import React, { useState, useEffect } from "react";
import { AdressForm, PaymentForm } from "../../../Components";
import {
  Paper,
  Stepper,
  Step,
  Typography,
  Button,
  StepLabel,
  CssBaseline,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import useStyles from "./styles";
import { commerce } from "../../../lib/commerce";
const steps = ["Shipping address", "Payment details"];
const Checkout = ({ cart, onCapCheckout, refreshCart }) => {
  const history = useHistory();
  const classes = useStyles();
  const [activestep, setActivestep] = useState(0);
  const [shippingdata, setShippingdata] = useState({});
  const [checkouttoken, setCheckouttoken] = useState(null);
  const nextStep = () => setActivestep((prev) => prev + 1);
  const backStep = () => setActivestep((prev) => prev - 1);

  const Form = () =>
    activestep === 0 ? (
      <AdressForm checkouttoken={checkouttoken} next={next} />
    ) : (
      <PaymentForm
        shippingdata={shippingdata}
        checkouttoken={checkouttoken}
        backStep={backStep}
        onCapCheckout={onCapCheckout}
        nextStep={nextStep}
        refreshCart={refreshCart}
      />
    );

  const Conformation = () => (
    <>
      <div>
        <Typography variant="h5">
          Thank you For your pruchase,{shippingdata.firstName}-
          {shippingdata.lastName}
        </Typography>
      </div>
      <br />
      <Button variant="outlined" type="button" component={Link} to="/">
        Back To Home
      </Button>
    </>
  );

  useEffect(() => {
    const tokenid = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });

        setCheckouttoken(token);
      } catch (error) {
        history.push("/Shopping_Cart/");
      }
    };
    tokenid();
  }, [cart, history]);

  const next = (data) => {
    setShippingdata(data);
    nextStep();
  };

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            CheckOut
          </Typography>
          <Stepper className={classes.stepper} activeStep={activestep}>
            {steps.map((item) => (
              <Step key={item}>
                <StepLabel>{item}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activestep === steps.length ? (
            <Conformation />
          ) : (
            checkouttoken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
