import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { Grid, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import UploadImages from "../components/UploadImages";
import ProductService from "../services/ProductService";
import ReactPlayer from "react-player";
import CommercialService from "../services/CommercialService";

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
      isOpenCommercialModal: false,
      imagesSrc: [],
      currentChosenImageFiles: [],
      open: false,
      message: "",
      snackbarType: "success",
      isUpdate: false,
      token: "",
      // form
      formValues: {
        productName: "",
        productDescription: "",
        productPrice: 0.0,
        productAvailableBalance: 0,
      },
      formErrors: {
        productName: "",
        productDescription: "",
        productPrice: 0.0,
        productAvailableBalance: 0,
      },
      formValidity: {
        productName: false,
        productDescription: false,
        productPrice: false,
        productAvailableBalance: false,
      },
      isSubmitting: false,
    };

    this.handleTokenInputChange = this.handleTokenInputChange.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  resetFormStates = () => {
    this.setState({
      formValues: {
        productName: "",
        productDescription: "",
        productPrice: 0.0,
        productAvailableBalance: 0,
      },
      formErrors: {
        productName: "",
        productDescription: "",
        productPrice: 0.0,
        productAvailableBalance: 0,
      },
      formValidity: {
        productName: false,
        productDescription: false,
        productPrice: false,
        productAvailableBalance: false,
      },
      isSubmitting: false,
      imagesSrc: [],
      currentChosenImageFiles: [],
    });
  };

  getProducts = () => {
    ProductService.getAllIncludingDeletedProducts()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ products: data });
      });
  };

  getUploadedImages = (images) => {
    this.setState({
      currentChosenImageFiles: images,
    });
  };

  deleteProduct = () => {
    ProductService.deleteProduct(this.state.chosenProduct.id)
      .then((res) => {
        this.getProducts();
        this.handleClickSnackBar("Product is deleted", "info");
        this.closeProductDeletingModal();
        return res.json();
      })
      .then((data) => {});
  };

  sendCommercial = () => {
    if (!this.state.chosenProduct.deleted) {
      if (this.state.token !== "") {
        var websiteLink =
          "http://localhost:3001/user/singleProduct/" +
          this.state.chosenProduct.id;

        let resStatus = 0;
        CommercialService.sendCommercial(
          websiteLink,
          this.state.chosenProduct.imagesSrc[0],
          this.state.token
        )
          .then((res) => {
            resStatus = res.status;
            return res.json();
          })
          .then((result) => {
            if (resStatus === 200) {
              this.handleClickSnackBar(
                "Product is successfully sent",
                "success"
              );
              this.closeCommercialModal();
            } else {
              this.handleClickSnackBar("Unsuccessfully sending", "error");
            }
            return result;
          })
          .catch((error) => {
            if (resStatus === 401) {
              this.handleClickSnackBar("Invalid token", "error");
            } else {
              this.handleClickSnackBar("Unsuccessfully sending", "error");
            }
          });
      } else {
        this.handleClickSnackBar("You must enter a token", "error");
      }
    } else {
      this.handleClickSnackBar("Product was deleted", "error");
    }
  };

  openNewProductModal = () => {
    this.setState({ isOpenNewProductModal: true, isUpdate: false });
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
      chosenProduct: product,
      isUpdate: true,
      formValues: {
        productName: product.name,
        productDescription: product.description,
        productPrice: product.price,
        productAvailableBalance: product.availableBalance,
      },
      imagesSrc: product.imagesSrc,
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

  openImageModal = (imagesSrc) => {
    this.setState({
      isOpenImageModal: true,
      imagesSrc: imagesSrc,
    });
  };

  closeImageModal = () =>
    this.setState({
      isOpenImageModal: false,
      chosenProduct: null,
      currentChosenImageFiles: [],
      imagesSrc: [],
    });

  openProductDeletingModal = (product) => {
    this.setState({
      isProductDeletingModal: true,
      chosenProduct: product,
      isUpdate: false,
    });
  };

  closeProductDeletingModal = () =>
    this.setState({
      isProductDeletingModal: false,
      chosenProduct: null,
    });

  openCommercialModal = (product) => {
    this.setState({
      isOpenCommercialModal: true,
      chosenProduct: product,
    });
  };

  closeCommercialModal = () =>
    this.setState({
      isOpenCommercialModal: false,
      chosenProduct: null,
      token: "",
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
      if (
        this.state.currentChosenImageFiles.length > 0 ||
        this.state.isUpdate
      ) {
        if (this.state.isUpdate) {
          let resStatus = 0;
          ProductService.update(
            this.state.chosenProduct.id,
            formValues.productName,
            formValues.productPrice,
            formValues.productDescription,
            formValues.productAvailableBalance,
            this.state.currentChosenImageFiles
          )
            .then((res) => {
              resStatus = res.status;
              return res.json();
            })
            .then((res) => {
              if (resStatus === 200) {
                this.getProducts();
                this.handleClickSnackBar("Product is changed", "success");
                this.closeChangeProductModal();
                this.setState({
                  isSubmitting: false,
                  currentChosenImageFiles: [],
                  imagesSrc: [],
                });
              } else {
                this.handleClickSnackBar(
                  "You have already had product with entered name",
                  "error"
                );
                this.setState({ isSubmitting: false });
              }

              return res;
            })
            .then((data) => {});
        } else {
          let resStatus = 0;
          ProductService.insert(
            formValues.productName,
            formValues.productPrice,
            formValues.productDescription,
            formValues.productAvailableBalance,
            this.state.currentChosenImageFiles
          )
            .then((res) => {
              resStatus = res.status;
              return res.json();
            })
            .then((res) => {
              if (resStatus === 200) {
                this.getProducts();
                this.handleClickSnackBar("New product is added", "success");
                this.closeNewProductModal();
                this.setState({
                  isSubmitting: false,
                  currentChosenImageFiles: [],
                  imagesSrc: [],
                });
              } else {
                this.handleClickSnackBar(
                  "You have already had product with entered name",
                  "error"
                );
                this.setState({ isSubmitting: false });
              }

              return res;
            })
            .then((data) => {});
        }
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

  handleTokenInputChange(event) {
    this.setState({
      token: event.target.value,
    });
  }

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
          <td style={{ textAlign: "center" }}>
            {product.price.toString().split(".")[0]}
          </td>
          <td style={{ textAlign: "center" }}>{product.availableBalance}</td>
          <td style={{ textAlign: "center" }}>
            <button
              type="button"
              onClick={() => {
                this.openImageModal(product.imagesSrc);
              }}
              class="btn btn-outline-primary btn-sm"
              style={{
                width: "120px",
                fontSize: "17px",
              }}
            >
              Show
            </button>
          </td>
          <td style={{ textAlign: "center" }}>
            <button
              type="button"
              onClick={() => {
                this.openCommercialModal(product);
              }}
              class="btn btn-outline-primary btn-sm"
              style={{
                width: "120px",
                fontSize: "17px",
              }}
            >
              Send
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
                    <label>Product price (RSD):</label>
                    <input
                      type="number"
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
                      type="number"
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
                      valueFromParent={this.state.imagesSrc}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Please wait..." : "Add"}
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
                    <label>Product price (RSD):</label>
                    <input
                      type="number"
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
                      type="number"
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
                      valueFromParent={this.state.imagesSrc}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit" disabled={isSubmitting}>
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
              marginLeft: "135px",
              color: "#74767a",
            }}
          >
            Product contents
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              overflow: "auto",
              height: "400px",
            }}
          >
            {this.state.imagesSrc.map((imageSrc, key) => {
              return (
                <div key={key}>
                  {(() => {
                    if (imageSrc.endsWith(".mp4")) {
                      return (
                        <ReactPlayer
                          className="d-block w-100"
                          url={imageSrc}
                          controls={true}
                        />
                      );
                    } else {
                      return (
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
                      );
                    }
                  })()}
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

    const commercialModal = (
      <Modal
        show={this.state.isOpenCommercialModal}
        onHide={this.closeCommercialModal}
        style={{
          marginTop: "200px",
          height: "300px",
          overflow: "hidden",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "115px", color: "#74767a" }}>
            Sending commercial
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <input
              name="tokenName"
              type="text"
              value={this.state.token}
              onChange={this.handleTokenInputChange}
              className="form-control"
              id="inputTokenName"
              placeholder="Enter the token generated on Nistagram"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={this.sendCommercial}>
            Send
          </Button>
          <Button variant="secondary" onClick={this.closeCommercialModal}>
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
        {commercialModal}
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
                            Price (RSD)
                          </th>
                          <th scope="col" style={{ textAlign: "center" }}>
                            Available Balance
                          </th>
                          <th scope="col" style={{ textAlign: "center" }}>
                            Contents
                          </th>
                          <th
                            scope="col"
                            style={{ minWidth: "130px", textAlign: "center" }}
                          >
                            Sending commerical
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
