import { CURRENCY_LABEL } from "../../utils/Currency/Currency";
import itemsData from "../../data/items_data.json";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { CardItem } from "../../components/CardIitem/CardItem";
import { useNavigate } from "react-router-dom";
import { addCartData, getTotalCartCost, getTotalCartItems, isBasketLimitExceeded, isItemInCart, removeCartData } from "../../utils/CartHelpers/CartHelpers";
import { CartContext } from "../../utils/CartContext";
import { useContext } from "react";

export const ItemsListPage = () => {
  const navigate = useNavigate();
  const { cartData, setCartData} = useContext(CartContext)
  return (
    <>
      <Box>
        <Typography
          variant="h3"
          component="h1"
          style={{ display: "flex", justifyContent: "center", padding: "1em" }}
        >
          Items List
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CardItem>Items: {getTotalCartItems(cartData)}</CardItem>
          </Grid>
          <Grid item xs={4}>
            <CardItem>
              Cost: {CURRENCY_LABEL}{" "}
              <span data-testid="item-list-total-cart-cost">{getTotalCartCost(cartData, itemsData).toFixed(2)}</span>
            </CardItem>
          </Grid>
        </Grid>
      </Box>

      <TableContainer style={{ marginTop: "2em" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Items">
          <TableHead></TableHead>
          <TableBody>
            {itemsData.map((row, rowIndex) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name} <br />
                  {row.descr}
                </TableCell>
                <TableCell>
                  {CURRENCY_LABEL} {row.price}
                </TableCell>
                <TableCell align="right">
                  <Button
                    style={{ marginRight: "1em" }}
                    data-testid={`item-list-add-item-${rowIndex}`}
                    disabled={isBasketLimitExceeded(cartData, row)}
                    onClick={() => {
                      addCartData(cartData, row,setCartData);
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
          data-testid={`item-list-checkout`}
          onClick={() => navigate("/checkout")}
          disabled={cartData.length === 0}
          variant="contained"
        >
          Checkout
        </Button>
      </div>
    </>
  );
};
