import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const PaymentForm = ({
  checkouttoken,
  backStep,
  shippingdata,
  onCapCheckout,
  nextStep,
  refreshCart,
}) => {
  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      alert("[error]", error);
    } else {
      const orderData = {
        line_items: checkouttoken.live.line_items,
        customer: {
          firstname: shippingdata.firstName,
          lastname: shippingdata.lastName,
          email: shippingdata.email,
        },
        shipping: {
          name: "International",
          street: shippingdata.address1,
          town_city: shippingdata.city,
          county_state: shippingdata.shippingsubdivion,
          postal_zip_code: shippingdata.zip,
          country: shippingdata.shippingCountry,
        },
        fulfillment: { shipping_method: shippingdata.shippingoption },
        payment: {
          getway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      onCapCheckout(checkouttoken.id, orderData);
      nextStep();
      refreshCart();
    }
  };
  return (
    <>
      <Review checkouttoken={checkouttoken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment Method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={backStep} variant="outlined">
                  back
                </Button>
                <Button
                  type="submit"
                  disabled={!stripe}
                  variant="contained"
                  color="primary"
                >
                  pay{checkouttoken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
