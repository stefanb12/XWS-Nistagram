import { Component } from "react";
import "../assets/styles/products.css";
import ProductService from "../services/ProductService";
import Alert from "@material-ui/lab/Alert";
import { Button, Snackbar, withStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import AuthService from "../services/AuthService";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      shoppingCart: [],
      snackBarOpen: false,
      snackBarMessage: "",
      snackBarSeverity: "",
    };
  }

  componentDidMount() {
    ProductService.getAllProducts()
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          products: result,
        });
      });
  }

  AddToCart = (product) => {
    var shoppingCart = [];
    shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
    for (let i = 0; i < shoppingCart.length; i++) {
      if (shoppingCart[i].name == product.name) {
        this.setState({
          snackBarOpen: true,
          snackBarMessage: "Product is already in shopping cart",
          snackBarSeverity: "error",
        });
        return;
      }
    }
    shoppingCart.push(product);
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    this.setState({
      snackBarOpen: true,
      snackBarMessage: "Product added to shopping cart",
      snackBarSeverity: "success",
    });
  };

  viewProduct = (product) => {};

  render() {
    return (
      <div>
        {this.state.products.map((product) => {
          return (
            <div>
              <div style={{ marginLeft: "5%", maxWidth: "90%" }}>
                <div
                  class="col-xs-12 col-md-6 bootstrap snippets bootdeys"
                  style={{ float: "left" }}
                >
                  <div class="product-content product-wrap clearfix">
                    <div class="row">
                      <div class="col-md-4 col-sm-12 col-xs-12">
                        <div class="product-image">
                          <img
                            src={product.contents[0].imageSrc}
                            width="100%"
                          />
                        </div>
                      </div>
                      <div class="col-md-7 col-sm-12 col-xs-12">
                        <div class="product-deatil">
                          <h5 class="name">
                            <a>
                              {product.name} <span>Category</span>
                            </a>
                          </h5>
                          <p class="price-container">
                            <span>{product.price} RSD</span>
                          </p>
                          <span class="tag1"></span>
                        </div>
                        <div class="description">
                          <p>{product.description} </p>
                        </div>
                        <div class="product-info smart-form">
                          <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-6">
                              {(() => {
                                if (AuthService.getCurrentUser() == undefined) {
                                  return (
                                    <a
                                      href={"/app/singleProduct/" + product.id}
                                      class="btn btn-success"
                                      onClick={this.viewProduct(product)}
                                    >
                                      View product
                                    </a>
                                  );
                                } else {
                                  return (
                                    <a
                                      href={"/user/singleProduct/" + product.id}
                                      class="btn btn-success"
                                      onClick={this.viewProduct(product)}
                                    >
                                      View product
                                    </a>
                                  );
                                }
                              })()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

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

export default Products;
