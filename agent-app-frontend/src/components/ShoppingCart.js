import { Component } from "react";

class ShoppingCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shoppingCart: [],
    };
  }

  componentDidMount() {
    console.log("SHOPPING CART");
    this.setState({
      shoppingCart: JSON.parse(localStorage.getItem("shoppingCart")),
    });
    console.log(this.state.shoppingCart);
  }

  render() {
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
                              type="text"
                              class="form-control text-center"
                              value="2"
                            />
                          </td>
                          <td class="text-center align-middle px-0">
                            <a
                              href="#"
                              class="shop-tooltip close float-none text-danger"
                              title=""
                              data-original-title="Remove"
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
                      Total price
                    </label>
                    <div class="text-large">
                      <strong>$1164.65</strong>
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
                <button type="button" class="btn btn-lg btn-primary mt-2">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
