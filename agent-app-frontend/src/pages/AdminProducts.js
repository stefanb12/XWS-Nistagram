import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { Grid, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import UploadImages from "../components/UploadImages";

export default class AdminProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      chosenProduct: null,
      isOpenNewProductModal: false,
      isOpenChangeProductModal: false,
      isOpenImageModal: false,
      isProductDeletingModal: false,
      imageSrcs: [],
      currentChosenImageFiles: [],
      open: false,
      message: "",
      snackbarType: "success",
      isUpdate: false,
      // form
      formValues: {
        productName: "",
        productDescription: "",
        productPrice: "",
        productAvailableBalance: "",
      },
      formErrors: {
        productName: "",
        productDescription: "",
        productPrice: "",
        productAvailableBalance: "",
      },
      formValidity: {
        productName: false,
        productDescription: false,
        productPrice: false,
        productAvailableBalance: false,
      },
      isSubmitting: false,
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  resetFormStates = () => {
    this.setState({
      formValues: {
        productName: "",
        productDescription: "",
        productPrice: "",
        productAvailableBalance: "",
      },
      formErrors: {
        productName: "",
        productDescription: "",
        productPrice: "",
        productAvailableBalance: "",
      },
      formValidity: {
        productName: false,
        productDescription: false,
        productPrice: false,
        productAvailableBalance: false,
      },
      isSubmitting: false,
      imageSrcs: [],
      currentChosenImageFiles: [],
    });
  };

  getProducts = () => {
    // ProductService.getProducts()
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     this.setState({ products: data });
    //   });
    this.setState({
      products: [
        {
          id: 1,
          name: "Proizvod",
          description: "Opis",
          price: "111",
          availableBalance: "1",
          imageSrcs: [
            "https://bootdey.com/img/Content/avatar/avatar1.png",
            "https://bootdey.com/img/Content/avatar/avatar1.png",
          ],
        },
        {
          id: 2,
          name: "Proizvod 2",
          description: "Opis 2",
          price: "222",
          availableBalance: "3",
          imageSrcs: ["https://bootdey.com/img/Content/avatar/avatar1.png"],
        },
      ],
    });
  };

  getUploadedImages = (images) => {
    this.setState({
      currentChosenImageFiles: images,
    });
  };

  deleteProduct = (productId) => {
    // ProductService.deleteProduct(productId)
    //   .then((res) => {
    //     this.getProducts();
    //     this.handleClickSnackBar("Product is deleted", "info");
    //     return res.json();
    //   })
    //   .then((data) => {});
  };

  addProduct = () => {
    // ProductService.saveProduct(
    //     // podaci
    // )
    //   .then((res) => {
    //     this.getProducts();
    //     return res.json();
    //   })
    //   .then((data) => {
    //     this.closeNewProductModal();
    //     this.handleClickSnackBar("New product is successfully added", "success");
    //   });
  };

  changeProduct = () => {
    // ProductService.changeProduct(
    //   // podaci
    // )
    //   .then((res) => {
    //     this.getProducts();
    //     return res.json();
    //   })
    //   .then((data) => {
    //     this.closeChangeProductModal();
    //     this.handleClickSnackBar("Product is successfully changed", "success");
    //   });
  };

  openNewProductModal = () => {
    this.setState({ isOpenNewProductModal: true });
  };

  closeNewProductModal = () => {
    this.setState({
      isOpenNewProductModal: false,
    });
    this.resetFormStates();
  };

  openChangeProductModal = (product) => {
    this.setState({
      isOpenChangeProductModal: true,
      isUpdate: true,
      formValues: {
        productName: product.name,
        productDescription: product.description,
        productPrice: product.price,
        productAvailableBalance: product.availableBalance,
      },
      imageSrcs: product.imageSrcs,
    });
  };

  closeChangeProductModal = () => {
    this.setState({
      isOpenChangeProductModal: false,
      isUpdate: false,
    });
    this.resetFormStates();
  };

  handleClickSnackBar = (message, type) => {
    this.setState({
      open: true,
      message: message,
      snackbarType: type,
    });
  };

  handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      open: false,
    });
  };

  openImageModal = (imageSrcs) => {
    this.setState({
      isOpenImageModal: true,
      imageSrcs: imageSrcs,
    });
  };

  closeImageModal = () => this.setState({ isOpenImageModal: false });

  openProductDeletingModal = (product) => {
    this.setState({
      isProductDeletingModal: true,
      chosenProduct: product,
    });
  };

  closeProductDeletingModal = () =>
    this.setState({
      isProductDeletingModal: false,
      chosenProduct: null,
    });

  handleChange = ({ target }) => {
    const { formValues } = this.state;
    formValues[target.name] = target.value;
    this.setState({ formValues });
    this.handleValidation(target);
  };

  handleValidation = (target) => {
    const { name, value } = target;
    const fieldValidationErrors = this.state.formErrors;
    const validity = this.state.formValidity;

    const isProductPrice = name === "productPrice";
    const isProductAvailableBalance = name === "productAvailableBalance";

    const numberTest = /^-?[0-9][0-9,\.]*$/i;

    validity[name] = value.length > 0;
    fieldValidationErrors[name] = validity[name]
      ? ""
      : `${name} is required and cannot be empty`;

    if (validity[name]) {
      if (isProductPrice) {
        validity[name] = numberTest.test(value);
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be a valid number`;
      }
      if (isProductAvailableBalance) {
        validity[name] = numberTest.test(value);
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be a valid number`;
      }
    }
    this.setState({
      formErrors: fieldValidationErrors,
      formValidity: validity,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isSubmitting: true });
    var { formValues, formValidity } = this.state;

    if (this.state.isUpdate) {
      await this.setState(
        {
          formValidity: {
            productName: true,
            productDescription: true,
            productPrice: true,
            productAvailableBalance: true,
          },
        },
        () => {
          formValues = this.state.formValues;
          formValidity = this.state.formValidity;
        }
      );
    }

    if (Object.values(formValidity).every(Boolean)) {
      // pozovi metodu iz servisa
      // moras znati da li je update ili ne
      if (
        this.state.currentChosenImageFiles.length > 0 ||
        this.state.isUpdate
      ) {
        this.handleClickSnackBar("Submitting the product...", "success");
        this.setState({
          isSubmitting: false,
          currentChosenImageFiles: [],
          imageSrcs: [],
        });
      } else {
        this.setState({ isSubmitting: false });
        this.handleClickSnackBar("You have to choose image", "error");
      }
    } else {
      for (let key in formValues) {
        let target = {
          name: key,
          value: formValues[key],
        };
        this.handleValidation(target);
      }
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const { formValues, formErrors, isSubmitting } = this.state;

    const snackbar = (
      <Snackbar
        open={this.state.open}
        autoHideDuration={2500}
        onClose={this.handleCloseSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={this.handleCloseSnackBar}
          severity={this.state.snackbarType}
        >
          {this.state.message}
        </Alert>
      </Snackbar>
    );

    const tableRows = this.state.products.map((product, key) => {
      return (
        <tr id={key}>
          <td style={{ textAlign: "center" }}>{product.name}</td>
          <td style={{ textAlign: "center" }}>{product.description}</td>
          <td style={{ textAlign: "center" }}>{product.price}</td>
          <td style={{ textAlign: "center" }}>{product.availableBalance}</td>
          <td style={{ textAlign: "center" }}>
            <button
              type="button"
              onClick={() => {
                this.openImageModal(product.imageSrcs);
              }}
              class="btn btn-outline-primary btn-sm"
              style={{
                width: "120px",
                fontSize: "17px",
              }}
            >
              Show images
            </button>
          </td>
          <td style={{ textAlign: "center" }}>
            {(() => {
              if (!product.deleted) {
                return (
                  <div>
                    <div class="action" style={{ marginLeft: "25px" }}>
                      <a
                        href="javascript:void(0)"
                        onClick={() => {
                          this.openChangeProductModal(product);
                        }}
                        class="text-success mr-4"
                        data-toggle="tooltip"
                        data-placement="top"
                        title=""
                        data-original-title="Edit"
                        style={{ fontSize: "20px" }}
                      >
                        <i class="fas fa-pen"></i>
                      </a>
                      <a
                        href="javascript:void(0)"
                        onClick={() => {
                          this.openProductDeletingModal(product);
                        }}
                        class="text-danger mr-4"
                        data-toggle="tooltip"
                        data-placement="top"
                        title=""
                        data-original-title="Close"
                        style={{ fontSize: "20px" }}
                      >
                        <i class="fas fa-trash"></i>
                      </a>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div>
                    {" "}
                    <b class="text-danger mr-4" style={{ marginLeft: "25px" }}>
                      Deleted
                    </b>
                  </div>
                );
              }
            })()}
          </td>
        </tr>
      );
    });

    const newProductModalDialog = (
      <Modal
        show={this.state.isOpenNewProductModal}
        onHide={this.closeNewProductModal}
        style={{ height: "580px", overflow: "hidden", marginTop: "120px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "130px", color: "#74767a" }}>
            Adding product
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={this.handleSubmit}>
          <Modal.Body
            style={{
              overflowX: "hidden",
              overflowY: "auto",
              height: "400px",
            }}
          >
            <div
              style={{
                padding: "10px",
              }}
            >
              <Grid container spacing={5}>
                <Grid item xs>
                  <div className="form-group">
                    <label>Product name:</label>
                    <input
                      type="text"
                      name="productName"
                      className={`form-control ${
                        formErrors.productName ? "is-invalid" : ""
                      }`}
                      placeholder="Enter product name"
                      onChange={this.handleChange}
                      value={formValues.productName}
                      width="200px"
                    />
                    <div className="invalid-feedback">
                      {formErrors.productName}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Product description:</label>
                    <input
                      type="text"
                      name="productDescription"
                      className={`form-control ${
                        formErrors.productDescription ? "is-invalid" : ""
                      }`}
                      placeholder="Enter product description"
                      onChange={this.handleChange}
                      value={formValues.productDescription}
                    />
                    <div className="invalid-feedback">
                      {formErrors.productDescription}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Product price:</label>
                    <input
                      type="text"
                      name="productPrice"
                      className={`form-control ${
                        formErrors.productPrice ? "is-invalid" : ""
                      }`}
                      placeholder="Enter product price"
                      onChange={this.handleChange}
                      value={formValues.productPrice}
                    />
                    <div className="invalid-feedback">
                      {formErrors.productPrice}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Product available balance:</label>
                    <input
                      type="text"
                      name="productAvailableBalance"
                      className={`form-control ${
                        formErrors.productAvailableBalance ? "is-invalid" : ""
                      }`}
                      placeholder="Enter product available balance"
                      onChange={this.handleChange}
                      value={formValues.productAvailableBalance}
                    />
                    <div className="invalid-feedback">
                      {formErrors.productAvailableBalance}
                    </div>
                  </div>
                  <div className="form-group">
                    <UploadImages
                      uploadedImages={this.getUploadedImages.bind(this)}
                      valueFromParent={this.state.imageSrcs}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              type="submit"
              disabled={isSubmitting} /*onClick={this.changeProduct}*/
            >
              {isSubmitting ? "Please wait..." : "Change"}
            </Button>
            <Button variant="secondary" onClick={this.closeNewProductModal}>
              Close
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );

    const changeProductModalDialog = (
      <Modal
        show={this.state.isOpenChangeProductModal}
        onHide={this.closeChangeProductModal}
        style={{ height: "580px", overflow: "hidden", marginTop: "120px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "130px", color: "#74767a" }}>
            Changing product
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={this.handleSubmit}>
          <Modal.Body
            style={{
              overflowX: "hidden",
              overflowY: "auto",
              height: "400px",
            }}
          >
            <div
              style={{
                padding: "10px",
              }}
            >
              <Grid container spacing={5}>
                <Grid item xs>
                  <div className="form-group">
                    <label>Product name:</label>
                    <input
                      type="text"
                      name="productName"
                      className={`form-control ${
                        formErrors.productName ? "is-invalid" : ""
                      }`}
                      placeholder="Enter product name"
                      onChange={this.handleChange}
                      value={formValues.productName}
                      width="200px"
                    />
                    <div className="invalid-feedback">
                      {formErrors.productName}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Product description:</label>
                    <input
                      type="text"
                      name="productDescription"
                      className={`form-control ${
                        formErrors.productDescription ? "is-invalid" : ""
                      }`}
                      placeholder="Enter product description"
                      onChange={this.handleChange}
                      value={formValues.productDescription}
                    />
                    <div className="invalid-feedback">
                      {formErrors.productDescription}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Product price:</label>
                    <input
                      type="text"
                      name="productPrice"
                      className={`form-control ${
                        formErrors.productPrice ? "is-invalid" : ""
                      }`}
                      placeholder="Enter product price"
                      onChange={this.handleChange}
                      value={formValues.productPrice}
                    />
                    <div className="invalid-feedback">
                      {formErrors.productPrice}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Product available balance:</label>
                    <input
                      type="text"
                      name="productAvailableBalance"
                      className={`form-control ${
                        formErrors.productAvailableBalance ? "is-invalid" : ""
                      }`}
                      placeholder="Enter product available balance"
                      onChange={this.handleChange}
                      value={formValues.productAvailableBalance}
                    />
                    <div className="invalid-feedback">
                      {formErrors.productAvailableBalance}
                    </div>
                  </div>
                  <div className="form-group">
                    <UploadImages
                      uploadedImages={this.getUploadedImages.bind(this)}
                      valueFromParent={this.state.imageSrcs}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              type="submit"
              disabled={isSubmitting} /*onClick={this.changeProduct}*/
            >
              {isSubmitting ? "Please wait..." : "Change"}
            </Button>
            <Button variant="secondary" onClick={this.closeChangeProductModal}>
              Close
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );

    const deleteProductModalDialog = (
      <Modal
        show={this.state.isProductDeletingModal}
        onHide={this.closeProductDeletingModal}
        style={{
          marginTop: "200px",
          height: "300px",
          overflow: "hidden",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "135px" }}>
            Deleting product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              textAlign: "center",
            }}
          >
            {" "}
            Are you sure you want to delete product?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.deleteProduct}>
            Delete
          </Button>
          <Button variant="secondary" onClick={this.closeProductDeletingModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

    const imageModal = (
      <Modal
        show={this.state.isOpenImageModal}
        onHide={this.closeImageModal}
        style={{
          marginTop: "100px",
          height: "600px",
          overflow: "hidden",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              marginLeft: "155px",
              color: "#74767a",
            }}
          >
            Product images
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              overflow: "auto",
              height: "400px",
            }}
          >
            {this.state.imageSrcs.map((imageSrc, key) => {
              return (
                <div key={key}>
                  <img
                    style={{
                      float: "left",
                      width: "400px",
                      height: "auto",
                      marginLeft: "30px",
                    }}
                    src={imageSrc}
                    class="img-thumbnail"
                  />
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeImageModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

    return (
      <div>
        {newProductModalDialog}
        {changeProductModalDialog}
        {deleteProductModalDialog}
        {imageModal}
        {snackbar}
        <div class="container" style={{ maxWidth: "90%", marginTop: "20px" }}>
          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <div class="table-responsive project-list">
                    <div class="graph-star-rating-footer text-center ">
                      <h4
                        style={{
                          textAlign: "center",
                          marginLeft: "110px",
                          color: "#74767a",
                          paddingBottom: "20px",
                        }}
                      >
                        Products overview
                        <button
                          type="button"
                          onClick={() => {
                            this.openNewProductModal();
                          }}
                          class="btn btn-outline-primary btn-sm"
                          style={{
                            width: "120px",
                            fontSize: "17px",
                            float: "right",
                          }}
                        >
                          Add product
                        </button>
                      </h4>
                    </div>
                    <table class="table project-table table-centered table-nowrap fixed_header">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            style={{ minWidth: "110px", textAlign: "center" }}
                          >
                            Product name
                          </th>
                          <th scope="col" style={{ textAlign: "center" }}>
                            Description
                          </th>
                          <th scope="col" style={{ textAlign: "center" }}>
                            Price
                          </th>
                          <th scope="col" style={{ textAlign: "center" }}>
                            Available Balance
                          </th>
                          <th scope="col" style={{ textAlign: "center" }}>
                            Image
                          </th>
                          <th scope="col" style={{ textAlign: "center" }}>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>{tableRows}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
