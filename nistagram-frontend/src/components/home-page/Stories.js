import React, { Component } from "react";
import "../../assets/styles/stories.css";

export default class Stories extends Component {
  render() {
    return (
      <div>
        <div class="container bootdey">
          <div class="row">
            <div class="col-md-2">
              <div class="team text-center rounded p-4 py-3">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  class="img-fluid avatar avatar-medium shadow rounded-pill"
                  alt=""
                />
                <div class="content mt-2">
                  <h4 class="title mb-0">Lisa Martin</h4>
                  {/* <small class="text-muted">Founder</small> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
