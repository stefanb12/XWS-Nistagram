import React, { Component } from "react";

class UserAccount extends Component {
  state = {};
  render() {
    return (
      <div
        className="tab-pane fade show active"
        id="account"
        role="tabpanel"
        style={{ float: "right", marginRight: "20%", width: "50%" }}
      >
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Public info</h5>
          </div>
          <div className="card-body">
            <form>
              <div className="row">
                <div className="col-md-8">
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputUsername"
                      placeholder="Username"
                    />
                  </div>
                  <div className="form-group">
                    <label>Biography</label>
                    <textarea
                      rows="2"
                      className="form-control"
                      id="inputBio"
                      placeholder="Tell something about yourself"
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center">
                    <img
                      alt="Andrew Jones"
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      className="rounded-circle img-responsive mt-2"
                      width="128"
                      height="128"
                    />
                    <div className="mt-2">Marko Markovic</div>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
            </form>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Private info</h5>
          </div>
          <div className="card-body">
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputFirstName"
                    placeholder="First name"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputLastName"
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                />
              </div>
              <div className="form-group">
                <label>Address 2</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>City</label>
                  <input type="text" className="form-control" id="inputCity" />
                </div>
                <div className="form-group col-md-4">
                  <label>State</label>
                  <select id="inputState" className="form-control">
                    <option>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div className="form-group col-md-2">
                  <label>Zip</label>
                  <input type="text" className="form-control" id="inputZip" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UserAccount;
