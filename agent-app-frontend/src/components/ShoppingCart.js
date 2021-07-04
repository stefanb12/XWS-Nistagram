import React, { Component } from "react";
import AuthService from "../services/AuthService";
import Alert from "@material-ui/lab/Alert";
import { Button, Snackbar, withStyles } from "@material-ui/core";
import ShoppingCartService from "../services/ShoppingCartService";

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.messagesEndRef = React.createRef();
    this.messagesStartRef = React.createRef();
    this.state = {
      shoppingCart: [],
      totalPrice: 0,
      loggedUser: [],
      openPersonalInfo: false,
      fullname: "",
      email: "",
      mobilePhone: "",
      address: "",
      snackBarOpen: false,
      snackBarMessage: "",
      snackBarSeverity: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    console.log("SHOPPING CART");
    var shoppingCartItems = JSON.parse(localStorage.getItem("shoppingCart"));
    this.updateShoppingCart(shoppingCartItems);

    this.setState(
      {
        loggedUser: AuthService.getCurrentUser(),
        fullname: AuthService.getCurrentUser().name,
        email: AuthService.getCurrentUser().email,
        mobilePhone: AuthService.getCurrentUser().mobilePhone,
        address:
          AuthService.getCurrentUser().location.address +
          ", " +
          AuthService.getCurrentUser().location.city +
          ", " +
          AuthService.getCurrentUser().location.country,
      },
      () => {
        console.log(this.state.loggedUser);
      }
    );
  }

  updateShoppingCart = (shoppingCartItems) => {
    var shoppingCartTemp = [];
    for (let i = 0; i < shoppingCartItems.length; i++) {
      var item = {
        id: shoppingCartItems[i].id,
        name: shoppingCartItems[i].name,
        quantity: 1,
        price: shoppingCartItems[i].price,
      };
      shoppingCartTemp.push(item);
    }
    this.setState(
      {
        shoppingCart: shoppingCartTemp,
      },
      () => {
        this.calculateTotalPrice();
      }
    );
  };

  quantityOnChange = (product, event) => {
    console.log(event.target.value);
    for (let i = 0; i < this.state.shoppingCart.length; i++) {
      if (this.state.shoppingCart[i].name == product.name) {
        product.quantity = event.target.value;
        this.calculateTotalPrice();
      }
    }
  };

  removeFromCart = (product) => {
    var shoppingCart = [];
    shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
    for (let i = 0; i < shoppingCart.length; i++) {
      if (shoppingCart[i].name == product.name) {
        const index = shoppingCart.indexOf(shoppingCart[i]);
        shoppingCart.splice(index, 1);
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
        this.updateShoppingCart(shoppingCart);
        return;
      }
    }

    //localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  };

  calculateTotalPrice = () => {
    var totalPriceTemp = 0;
    for (let i = 0; i < this.state.shoppingCart.length; i++) {
      totalPriceTemp +=
        this.state.shoppingCart[i].price * this.state.shoppingCart[i].quantity;
    }
    totalPriceTemp = Math.round(totalPriceTemp * 100) / 100;

    this.setState({
      totalPrice: totalPriceTemp,
    });
  };

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  scrollToTop = () => {
    this.messagesStartRef.current.scrollIntoView({ behavior: "smooth" });
  };

  checkout = () => {
    this.setState(
      {
        openPersonalInfo: true,
      },
      () => {
        this.scrollToBottom();
      }
    );
  };

  sendOrder = () => {
    if (
      this.state.fullname == "" ||
      this.state.email == "" ||
      this.state.mobilePhone == "" ||
      this.state.address == ""
    ) {
      this.setState(
        {
          snackBarOpen: true,
          snackBarMessage: "Enter values in all inputs!",
          snackBarSeverity: "error",
        },
        () => {
          // this.scrollToTop();
        }
      );
    } else {
      var itemsToPurcahse = [];
      for (let i = 0; i < this.state.shoppingCart.length; i++) {
        var item = {
          quantity: this.state.shoppingCart[i].quantity,
          productId: this.state.shoppingCart[i].id,
        };
        itemsToPurcahse.push(item);
      }
      ShoppingCartService.sendOrder(
        new Date(),
        this.state.totalPrice,
        itemsToPurcahse,
        AuthService.getCurrentUser().id
      )
        .then((res) => res.json())
        .then((result) => {});

      this.setState(
        {
          shoppingCart: [],
          totalPrice: 0,
        },
        () => {
          localStorage.setItem("shoppingCart", JSON.stringify([]));
        }
      );

      this.setState(
        {
          openPersonalInfo: false,
          snackBarOpen: true,
          snackBarMessage: "Order successfully sent!",
          snackBarSeverity: "success",
        },
        () => {
          // this.scrollToTop();
        }
      );
    }
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    let fullnameValidation;
    if (this.state.fullname == "") {
      fullnameValidation = (
        <label style={{ color: "red" }}>Enter your fullname</label>
      );
    }

    let emailValidation;
    if (this.state.email == "") {
      emailValidation = (
        <label style={{ color: "red" }}>Enter your email</label>
      );
    }

    let mobilePhoneValidation;
    if (this.state.mobilePhone == "") {
      mobilePhoneValidation = (
        <label style={{ color: "red" }}>Enter your mobile phone</label>
      );
    }

    let addressValidation;
    if (this.state.address == "") {
      addressValidation = (
        <label style={{ color: "red" }}>Enter your address</label>
      );
    }

    const personalInfo = (
      <div
        className="card"
        style={{ width: "72.2%", marginLeft: "13.8%", marginBottom: "4%" }}
      >
        <div className="card-header">
          <h5 className="card-title mb-0">Private info</h5>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label>Full name</label>
            <input
              name="fullname"
              type="text"
              value={this.state.fullname}
              onChange={this.handleInputChange}
              className="form-control"
              id="inputFirstName"
              placeholder="Full name"
            />
            {fullnameValidation}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleInputChange}
              className="form-control"
              id="inputFirstName"
              placeholder="Email"
            />
            {emailValidation}
          </div>
          <div className="form-group">
            <label>Mobile Phone</label>
            <input
              name="mobilePhone"
              type="text"
              value={this.state.mobilePhone}
              onChange={this.handleInputChange}
              className="form-control"
              id="inputFirstName"
              placeholder="Mobile Phone"
            />
            {mobilePhoneValidation}
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              name="address"
              type="text"
              value={this.state.address}
              onChange={this.handleInputChange}
              className="form-control"
              id="inputFirstName"
              placeholder="Address"
            />
            {addressValidation}
          </div>
          <button
            className="btn btn-primary"
            onClick={() => this.sendOrder()}
            style={{ float: "right", marginTop: "2%" }}
          >
            Send order
          </button>
        </div>
      </div>
    );

    return (
      <div>
        <div class="container px-3 my-5 clearfix">
          <div class="card">
            <div class="card-header">
              <h2>Shopping Cart</h2>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered m-0">
                  <thead>
                    <tr>
                      <th
                        class="text-center py-3 px-4"
                        style={{ minWidth: "400px" }}
                      >
                        Product Name &amp; Details
                      </th>
                      <th
                        class="text-right py-3 px-4"
                        style={{ width: "100px" }}
                      >
                        Price
                      </th>
                      <th
                        class="text-center py-3 px-4"
                        style={{ width: "120px" }}
                      >
                        Quantity
                      </th>
                      <th
                        class="text-center align-middle py-3 px-0"
                        style={{ width: "40px" }}
                      >
                        <a
                          href="#"
                          class="shop-tooltip float-none text-light"
                          title=""
                          data-original-title="Clear cart"
                        >
                          <i class="ino ion-md-trash"></i>
                        </a>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.shoppingCart.map((product) => {
                      return (
                        <tr>
                          <td class="p-4">
                            <div class="media align-items-center">
                              <img
                                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                height="50px"
                                class="d-block ui-w-40 ui-bordered mr-4"
                                alt=""
                              />
                              <div class="media-body">
                                <a href="#" class="d-block text-dark">
                                  {product.name}
                                </a>
                                <small>
                                  <span class="text-muted">
                                    {product.description}
                                  </span>
                                </small>
                              </div>
                            </div>
                          </td>
                          <td class="text-right font-weight-semibold align-middle p-4">
                            {product.price} RSD
                          </td>
                          <td class="align-middle p-4">
                            <input
                              type="number"
                              class="form-control text-center"
                              onChange={(event) =>
                                this.quantityOnChange(product, event)
                              }
                              min="1"
                            />
                          </td>
                          <td class="text-center align-middle px-0">
                            <a
                              class="shop-tooltip close float-none text-danger"
                              title=""
                              data-original-title="Remove"
                              onClick={() => this.removeFromCart(product)}
                            >
                              ×
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div class="d-flex flex-wrap justify-content-between align-items-center pb-4">
                <div class="d-flex">
                  <div class="text-right mt-4">
                    <label class="text-muted font-weight-normal m-0">
                      Total Price
                    </label>
                    <div class="text-large">
                      <strong>{this.state.totalPrice} RSD</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div class="float-right">
                <button
                  type="button"
                  class="btn btn-lg btn-default md-btn-flat mt-2 mr-3"
                >
                  Back to shopping
                </button>
                <button
                  type="button"
                  class="btn btn-lg btn-primary mt-2"
                  onClick={() => this.checkout()}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.state.openPersonalInfo ? personalInfo : ""}
        <div ref={this.messagesEndRef} />

        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={this.state.snackBarOpen}
          autoHideDuration={200}
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

export default ShoppingCart;
