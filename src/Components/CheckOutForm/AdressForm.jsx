import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./CustomInputs";
import { commerce } from "../../lib/commerce";
const AdressForm = ({ checkouttoken, next }) => {
  const methods = useForm();
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingsubdiviions, setShippingsubdiviions] = useState([]);
  const [shippingsubdiviion, setShippingsubdiviion] = useState("");
  const [shippingoptions, setShippingoptions] = useState([]);
  const [shippingoption, setShippingoption] = useState("");
  const countrise = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  const subcountery = Object.entries(shippingsubdiviions).map(
    ([code, name]) => ({ id: code, label: name })
  );
  const shippingmap = shippingoptions.map((sO) => ({
    id: sO.id,
    label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
  }));

  const fetshshippingCountries = async (checktokenID) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checktokenID
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetshsubdiv = async (countrycode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countrycode
    );

    setShippingsubdiviions(subdivisions);
    setShippingsubdiviion(Object.keys(subdivisions));
  };
  const getoptionsregion = async (checktokenID, country, region = null) => {
    const option = await commerce.checkout.getShippingOptions(checktokenID, {
      country,
      region,
    });
    setShippingoptions(option);
    setShippingoption(option[0].id);
  };

  useEffect(() => {
    fetshshippingCountries(checkouttoken.id);
  }, [checkouttoken]);
  useEffect(() => {
    if (shippingCountry) fetshsubdiv(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingsubdiviion)
      getoptionsregion(checkouttoken.id, shippingCountry, shippingsubdiviion);
  }, [shippingsubdiviion, shippingCountry]);
  return (
    <>
      <Typography variant="h4" gutterBottom>
        AdressForm
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingsubdiviion,
              shippingoption,
            })
          )}
        >
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="address1" label="Address" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput
              required
              name="Zip / Postal/code"
              label="Zip / Postal/code"
            />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countrise.map((countery) => (
                  <MenuItem key={countery.id} value={countery.id}>
                    {countery.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping divitions</InputLabel>
              <Select
                value={shippingsubdiviion}
                fullWidth
                onChange={(e) => setShippingsubdiviion(e.target.value)}
              >
                {subcountery.map((subdivitions) => (
                  <MenuItem key={subdivitions.id} value={subdivitions.id}>
                    {subdivitions.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping options</InputLabel>
              <Select
                value={shippingoption}
                fullWidth
                onChange={(e) => setShippingoption(e.target.value)}
              >
                {shippingmap.map((shippingmap) => (
                  <MenuItem key={shippingmap.id} value={shippingmap.id}>
                    {shippingmap.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" component={Link} to="/cart">
              Back To Cart
            </Button>
            <Button variant="contained" type="submit" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AdressForm;
