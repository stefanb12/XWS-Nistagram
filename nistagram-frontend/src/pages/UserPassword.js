import React, { Component } from "react";

class UserPassword extends Component {
  state = {};
  render() {
    return (
      <div
        className="card"
        style={{ float: "right", marginRight: "20%", width: "50%" }}
      >
        <div className="card-header">
          <h5 className="card-title">Password</h5>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Current password</label>
              <input
                type="password"
                className="form-control"
                id="inputPasswordCurrent"
              />
            </div>
            <div className="form-group">
              <label>New password</label>
              <input
                type="password"
                className="form-control"
                id="inputPasswordNew"
              />
            </div>
            <div className="form-group">
              <label>Verify password</label>
              <input
                type="password"
                className="form-control"
                id="inputPasswordNew2"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default UserPassword;
