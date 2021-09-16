import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { setQuantity, deleteProduct, clearLocalCart } from "../store/cart";
import {
  Container,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Avatar,
  IconButton,
} from "@material-ui/core";
// icons
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(10),
    backgroundColor: "#fff",
    padding: theme.spacing(6),
    border: 2,
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  cartFooter: {
    padding: theme.spacing(4),
  },
  stock: {
    color: "#afafaf",
  },
  comprar: {
    textDecoration: "none",
  },
}));

const Cart = () => {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  const reducer = (accumulator, current) =>
    accumulator + current.price * current.quantity;
  let totalMoney = cart ? cart.reduce(reducer, 0) : 0;
  console.log("moneyyy", totalMoney);

  const handleChange = (productId, e) => {
    const quantity = e.target.value;
    const id = user.id;
    dispatch(setQuantity({ productId, quantity, id }));
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleDeleteAll = () => {
    dispatch(clearLocalCart());
  };

  return (
    <>
      <Container maxWidth="lg" className={classes.container}>
        <Typography component="h2" variant="h4" color="primary" gutterBottom>
          <ShoppingCartIcon />
          Carrito
        </Typography>
        <Table size="small">
          <TableBody>
            {cart &&
              cart.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Avatar
                      alt="Remy Sharp"
                      src={product.img}
                      className={classes.large}
                    />
                  </TableCell>
                  <TableCell>
                    {<Typography component="text">{product.name}</Typography>}
                  </TableCell>
                  <TableCell>
                    {
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <InputLabel id="amount-label">Cantidad</InputLabel>
                        <Select
                          labelId="amount-label"
                          value={product.quantity}
                          onChange={(e) => handleChange(product.id, e)}
                          label="Cantidad"
                        >
                          <MenuItem value={6}>6</MenuItem>
                          <MenuItem value={12}>12</MenuItem>
                          <MenuItem value={18}>18</MenuItem>
                          <MenuItem value={24}>24</MenuItem>
                        </Select>
                        <Typography variant="span" className={classes.stock}>
                          {product.stock} Disponibles
                        </Typography>
                      </FormControl>
                    }
                  </TableCell>
                  <TableCell align="right">{`$${
                    product.price * product.quantity
                  }`}</TableCell>
                  <TableCell align="right">
                    <IconButton edge="end" color="inherit">
                      <DeleteIcon onClick={() => handleDelete(product.id)} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            <TableRow>
              {cart[0] ? (
                <>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={handleDeleteAll}
                    >
                      Limpiar carrito
                    </Button>
                  </TableCell>
                  <TableCell
                    className={classes.cartFooter}
                    colSpan={3}
                    align="right"
                  >
                    <Typography component="h2" variant="h5" color="secondary">
                      Total 12314123
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Link to="/confirmacion" className={classes.comprar}>
                      <Button variant="contained" color="primary" size="large">
                        Comprar
                      </Button>
                    </Link>
                  </TableCell>
                </>
              ) : (
                <TableCell
                  className={classes.cartFooter}
                  colSpan={4}
                  align="center"
                >
                  <Typography component="h2" variant="h5" color="secondary">
                    Carrito vacío
                  </Typography>
                </TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default Cart;