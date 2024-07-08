import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { CardItem } from "../../components/CardIitem/CardItem";
import { CURRENCY_LABEL } from "../../utils/Currency/Currency";
import itemsData from "../../data/items_data.json";
import {
  addCartData,
  getTotalCartCost,
  getTotalCartItems,
  isBasketLimitExceeded,
  isItemInCart,
  removeCartData,
} from "../../utils/CartHelpers/CartHelpers";
import { CartContext } from "../../utils/CartContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getCartItemQuantity, getTotalCostOfItem } from "./CheckoutPageHelper";
import { boldHeading } from "./CheckoutPageStyles";

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartData, setCartData } = useContext(CartContext);

  return (
    <div data-testid="checkout-page">
      <Button
        style={{ marginTop: "1em" }}
        variant="outlined"
        onClick={() => navigate("/")}
      >
        Back
      </Button>
      <Typography
        variant="h3"
        component="h1"
        style={{ display: "flex", justifyContent: "center" }}
      >
        Checkout
      </Typography>

      <Box>
        <Grid
          container
          spacing={2}
          justifyContent={"center"}
          paddingTop={"2em"}
          paddingBottom={"2em"}
        >
          <Grid item xs={4}>
            <CardItem>
              Items:{" "}
              <span data-testid="checkout-page-total-items">
                {getTotalCartItems(cartData)}
              </span>
            </CardItem>
          </Grid>
          <Grid item xs={4}>
            <CardItem>
              Cost: {CURRENCY_LABEL}{" "}
              <span data-testid="checkout-page-cost">
                {getTotalCartCost(cartData, itemsData).toFixed(2)}
              </span>
            </CardItem>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={boldHeading}>Item</TableCell>
                <TableCell style={boldHeading}>Price</TableCell>
                <TableCell style={boldHeading}>Qty</TableCell>
                <TableCell style={boldHeading}>Total</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemsData.map((row, rowItem) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name} <br />
                    {row.descr}
                  </TableCell>
                  <TableCell>
                    {CURRENCY_LABEL}
                    {row.price}
                  </TableCell>
                  <TableCell>
                    <span data-testid={`checkout-page-quantity-${rowItem}`}>
                      {getCartItemQuantity(cartData, row.sku)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {CURRENCY_LABEL}
                    <span data-testid={`checkout-page-total-cost-${rowItem}`}>
                      {getTotalCostOfItem(cartData, row.sku, itemsData).toFixed(
                        2
                      )}
                    </span>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      style={{ marginRight: "1em" }}
                      disabled={isBasketLimitExceeded(cartData, row)}
                      onClick={() => {
                        addCartData(cartData, row, setCartData);
                      }}
                      variant="contained"
                    >
                      Add Item
                    </Button>
                    <Button
                      variant="outlined"
                      disabled={!isItemInCart(row.sku, cartData)}
                      onClick={() => removeCartData(cartData, row, setCartData)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
            style={{
              marginTop: "3em",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              size="large"
              data-testid={`checkout-page-checkout`}
              variant="contained"
            >
              Checkout
            </Button>
          </div>
      </Box>
    </div>
  );
};
