import { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { getSelectedProduct } from "../store/selectedProduct";
import {
  Grid,
  IconButton,
  Container,
  Paper,
  Typography,
  Button,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(10),
    },
    margin: {
      margin: theme.spacing(3),
    },

    justifyContent: "center",
  },

  grey: {
    //padding: theme.spacing(2),
    //textAlign: "center",
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(5),
    margin: theme.spacing(1),
    //textAlign: "center",
  },
  margin: {
    marginTop: theme.spacing(5),
  },
  otherMargin: {
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    // background: "black",
  },
  /* paperLeft: {
    flex: 4,
    height: "100%",
    width: "50%",
    margin: 30,
    textAlign: "center",
    padding: 10,
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    background: "red",
  },
  paperRight: {
    height: "100%",
    width: "50%",
    flex: 4,
    margin: 30,
    paddingTop: "8rem",
    padding: 30,
    //alignItems: "center",
    // display: "flex",
    //justifyContent: "center",
    //flexDirection: "column",
    //textAlign: "center",
    //color: theme.palette.text.secondary,
    background: "#CCFAE1",
  },
  paperContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    // width: "100vw",
    // height: "100vh",
    // alignItems: "center",
    background: "aqua",
  }, */
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

  mainContainer: {
    width: "90vw",
    heigth: "100vh",
    display: "flex",
    marginTop: theme.spacing(1),
    //justifyContent: "space-evenly",
    // background: "aqua",
  },
  imagenContainer: {
    width: "50%",
    heigth: "100%",
    // marginTop: theme.spacing(2),
    marginLeft: theme.spacing(5),
    // background: "red",
  },
  textoContainer: {
    width: "50%",
    heigth: "100%",
    // marginTop: theme.spacing(2),
    marginRight: theme.spacing(10),
    // background: "#CCFAE1",
  },
}));

const SingleProductView = ({ id }) => {
  const product = useSelector((state) => state.selectedProduct);
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(6);
  //const [newPrice, setNewPrice] = useState(product.price * product.quantity);

  useEffect(() => {
    dispatch(getSelectedProduct(id));
  }, []);

  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const handleChange = (event) => {
    setQuantity(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handlePrice = () => {
    if (quantity === 6) {
      return (
        <Typography color="primary" variant="h4">
          <Box fontWeight={500}>{`$${product.price * 6}`}</Box>
        </Typography>
      );
    }
    if (quantity === 12) {
      return (
        <Typography color="primary" variant="h4">
          <Box fontWeight={500}>{`$${product.price * 12}`}</Box>
        </Typography>
      );
    }
    if (quantity === 18) {
      return (
        <Typography color="primary" variant="h4">
          <Box fontWeight={500}>{`$${product.price * 18}`}</Box>
        </Typography>
      );
    }
    if (quantity === 24) {
      return (
        <Typography color="primary" variant="h4">
          <Box fontWeight={500}>{`$${product.price * 24}`}</Box>
        </Typography>
      );
    }
  };

  return (
    <div>
      <Paper className={classes.otherMargin} elevation={3}>
        <Container>
          <Grid>
            <a href="javascript:history.back()">&lt; Volver atras</a>
          </Grid>
          <Grid className={classes.mainContainer}>
            <Grid className={classes.imagenContainer}>
              <img
                src={product.img}
                alt={product.name}
                style={{
                  width: "80%",
                  heigth: "100%",
                  marginLeft: theme.spacing(20),
                }}
              />
            </Grid>
            <Grid className={classes.textoContainer}>
              <Typography variant="h2">
                <Box fontWeight="fontWeightMedium">{product.name}</Box>
              </Typography>
              <Typography variant="p" className={classes.grey}>
                {product.volume}
              </Typography>

              <Grid className={classes.margin}>
                {handlePrice()}
                <Typography color="primary" variant="button">
                  {`${quantity} unidades`}
                </Typography>
                <Typography className={classes.grey} variant="button">
                  {`$${product.price} por 1 unidad`}
                </Typography>
              </Grid>

              <Grid container className={classes.grey}>
                <Grid item xs={6} spacing={5}>
                  <Typography variant="h5">Elegí la cantidad:</Typography>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">
                      Unidades
                    </InputLabel>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      open={open}
                      onClose={handleClose}
                      onOpen={handleOpen}
                      value={quantity}
                      onChange={handleChange}
                    >
                      <MenuItem value={6}>6 unidades</MenuItem>
                      <MenuItem value={12}>12 unidades</MenuItem>
                      <MenuItem value={18}>18 unidades</MenuItem>
                      <MenuItem value={24}>24 unidades</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <IconButton color="primary" aria-label="add to shopping cart">
                    <AddShoppingCartIcon fontSize="large" />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </div>
  );
};
export default SingleProductView;

{
  /* <div className={classes.root}>
  <Paper>
    <Container>
      <a href="javascript:history.back()">&lt; Volver atras</a>
      <Grid container className={classes.paperContainer}>
        <Grid item xs={12} md={8} className={classes.paperLeft}>
          <figure>
            <img src={product.img} alt={product.name} />
          </figure>
        </Grid>
        <Grid item xs={12} md={8} className={classes.paperRight}>
          <Typography variant="h2" fontWeight="fontWeightBold" m={1}>
            {product.name}
          </Typography>
          <Typography variant="p" className={classes.grey}>
            {product.volume}
          </Typography>

          <Grid className={classes.margin}>
            {handlePrice()}
            <Typography color="primary" variant="p">
              {`${quantity} unidades`}
            </Typography>
            <Typography className={classes.grey} variant="p">
              {`$${product.price} por 1 unidad`}
            </Typography>
          </Grid>

          <Grid container spacing={2} className={classes.grey}>
            <Grid item xs={6}>
              <Typography variant="h5">Elegí la cantidad:</Typography>
            </Grid>
            <Grid container item xs={6} textAlign="center">
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">
                  Unidades
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={quantity}
                  onChange={handleChange}
                >
                  <MenuItem value={6}>6 unidades</MenuItem>
                  <MenuItem value={12}>12 unidades</MenuItem>
                  <MenuItem value={18}>18 unidades</MenuItem>
                  <MenuItem value={24}>24 unidades</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent="center">
            <IconButton color="primary" aria-label="add to shopping cart">
              <AddShoppingCartIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  </Paper>
</div>;
 */
}
