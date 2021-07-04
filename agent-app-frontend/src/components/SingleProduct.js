import { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import { withRouter } from "react-router-dom";
import ProductService from "../services/ProductService";
import { Button, Snackbar, withStyles } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

class SingleProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: 0,
      product: [],
      snackBarOpen: false,
      snackBarMessage: "",
      snackBarSeverity: "",
    };
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    ProductService.getProduct(params.id)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          product: result,
        });
      });
  }
  AddToCart = () => {
    var shoppingCart = [];
    shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
    for (let i = 0; i < shoppingCart.length; i++) {
      if (shoppingCart[i].name == this.state.product.name) {
        this.setState({
          snackBarOpen: true,
          snackBarMessage: "Product is already in shopping cart",
          snackBarSeverity: "error",
        });
        return;
      }
    }
    shoppingCart.push(this.state.product);
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    this.setState({
      snackBarOpen: true,
      snackBarMessage: "Product added to shopping cart",
      snackBarSeverity: "success",
    });
  };

  render() {
    return (
      <div>
        <div
          style={{
            height: "70%",
            width: "80%",
            marginLeft: "16%",
            marginTop: "4%",
            float: "left",
          }}
        >
          <div
            style={{
              height: "40%",
              width: "30%",
              marginLeft: "6%",
              float: "left",
            }}
          >
            <Carousel>
              <Carousel.Item>
                <img
                  width="100%"
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  width="100%"
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  alt="First slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
          <h2
            style={{
              width: "40%",
              marginLeft: "2%",
              float: "left",
              borderBottom: "2px solid rgba(0, 0, 0, 0.1)",
              paddingBottom: "10px",
            }}
          >
            {this.state.product.name}
          </h2>
          <h6
            style={{
              width: "40%",
              marginLeft: "2%",
              float: "left",
              borderBottom: "2px solid rgba(0, 0, 0, 0.1)",
              paddingBottom: "10px",
            }}
          >
            {this.state.product.description}
          </h6>
          <b
            style={{
              width: "40%",
              marginLeft: "2%",
              float: "left",
              paddingBottom: "10px",
            }}
          >
            Available: {this.state.product.availableBalance}
          </b>
          <h4
            style={{
              width: "40%",
              marginLeft: "2%",
              float: "left",
            }}
          >
            Price: {this.state.product.price} RSD
          </h4>
          <button
            className="btn btn-primary"
            style={{ float: "right", marginTop: "1.6%", marginRight: "22%" }}
            onClick={this.AddToCart}
          >
            Add to cart
          </button>
        </div>

        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={this.state.snackBarOpen}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          <Alert
            onClose={this.handleClose}
            severity={this.state.snackBarSeverity}
          >
            {this.state.snackBarMessage}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
export default withRouter(SingleProducts);
