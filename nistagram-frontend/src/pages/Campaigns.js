import React, { Component } from "react";
import { Carousel, Modal, Button } from "react-bootstrap";
import {
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import "../assets/styles/campaigns.css";

export default class Campaigns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaings: [],
      comercials: [],
      campaignType: "single",
      postOrStory: "post",
      checkedItems: [],
      isCampaignModalDialogOpen: false,
    };
    this.handleCampaignTypeChange = this.handleCampaignTypeChange.bind(this);
    this.handlePostOrStoryChange = this.handlePostOrStoryChange.bind(this);
  }

  componentDidMount() {}

  handleCampaignTypeChange = (event) => {
    this.setState(
      {
        campaignType: event.target.value,
      },
      () => {
        console.log(this.state.campaignType);
      }
    );
  };

  handlePostOrStoryChange = (event) => {
    this.setState(
      {
        postOrStory: event.target.value,
      },
      () => {
        console.log(this.state.postOrStory);
      }
    );
  };

  openCampaignModal = () => {
    this.setState({
      isCampaignModalDialogOpen: true,
    });
  };

  closeCampaignModal = () => {
    this.setState({
      isCampaignModalDialogOpen: false,
      campaignType: "single",
      postOrStory: "post",
    });
  };

  checkIfCommercialIsChecked = (commercialId) => {
    for (let id of this.state.checkedItems) {
      if (id === commercialId) {
        return true;
      }
    }
    return false;
  };

  render() {
    let commercialsForCampaignModalDialog = this.state.comercials.map(
      (commercial) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                key={commercial.id}
                checked={this.checkIfStoryIsChecked(commercial.id)}
                onChange={(event) => {
                  let list = this.state.checkedItems;
                  if (event.target.checked) {
                    list.push(commercial.id);
                  } else {
                    list.splice(list.indexOf(commercial.id), 1);
                  }
                  this.setState({
                    checkedItems: list,
                  });
                }}
              >
                {" "}
              </Checkbox>
            }
            label={
              <>
                <img
                  src={commercial.imageSrc}
                  className="profile-img"
                  width="400px"
                  height="auto"
                />
              </>
            }
          />
        );
      }
    );

    var addCampaignModalDialog = (
      <Modal
        show={this.state.isCampaignModalDialogOpen}
        onHide={this.closeCampaignModal}
        centered
        style={{ marginTop: "25px" }}
      >
        <Modal.Header
          closeButton
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Modal.Title
            style={{
              marginLeft: "140px",
            }}
          >
            Create campaign
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <div className="form-group">
              <RadioGroup
                label="Campaign type"
                name="campaignType"
                onChange={this.handleCampaignTypeChange}
                value={this.state.campaignType}
                row
              >
                <FormControlLabel
                  value="single"
                  control={<Radio />}
                  label="Single"
                />
                <FormControlLabel
                  value="repeatable"
                  control={<Radio />}
                  label="Repeatable"
                />
              </RadioGroup>
              <RadioGroup
                label="Post or story"
                name="postOrStory"
                onChange={this.handlePostOrStoryChange}
                value={this.state.postOrStory}
                row
              >
                <FormControlLabel
                  value="post"
                  control={<Radio />}
                  label="Post"
                />
                <FormControlLabel
                  value="story"
                  control={<Radio />}
                  label="Story"
                />
              </RadioGroup>
            </div>
            <h6
              style={{
                textAlign: "center",
                color: "#74767a",
                fontSize: "18px",
              }}
            >
              Select commercials{" "}
            </h6>
            <div
              style={{
                overflow: "auto",
                height: "350px",
              }}
            >
              {commercialsForCampaignModalDialog}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              console.log("Add campaign");
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    );

    return (
      <div>
        {addCampaignModalDialog}
        <div class="graph-star-rating-footer text-center ">
          <h2
            style={{
              textAlign: "center",
              color: "#74767a",
              marginTop: "5px",
              marginLeft: "155px",
              paddingBottom: "15px",
              fontSize: "34px",
            }}
          >
            Campaigns
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              style={{
                width: "140px",
                fontSize: "17px",
                float: "right",
                marginRight: "20px",
              }}
              onClick={this.openCampaignModal}
            >
              New campaign
            </button>
          </h2>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-md-6 col-lg-4 g-mb-30">
              <article
                class="u-shadow-v18 g-bg-white text-center rounded g-px-20 g-py-40 g-mb-5"
                style={{ border: "1px solid black" }}
              >
                <Carousel
                  interval={null}
                  nextIcon={
                    <span
                      aria-hidden="true"
                      class="carousel-control-next-icon"
                    />
                  }
                >
                  <Carousel.Item>
                    <img
                      class="d-inline-block img-fluid mb-4"
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="Image Description"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      class="d-inline-block img-fluid mb-4"
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt="Image Description"
                    />
                  </Carousel.Item>
                </Carousel>
                <h4 class="h5 g-color-black g-font-weight-600 g-mb-10">
                  Single campaign
                </h4>
                <p>At 13:00</p>
                <p>One time</p>
                <span class="d-block g-color-primary g-font-size-16">
                  Story
                </span>
              </article>
            </div>
            <div class="col-md-6 col-lg-4 g-mb-30">
              <article
                class="u-shadow-v18 g-bg-white text-center rounded g-px-20 g-py-40 g-mb-5"
                style={{ border: "1px solid black" }}
              >
                <Carousel
                  interval={null}
                  nextIcon={
                    <span
                      aria-hidden="true"
                      class="carousel-control-next-icon"
                    />
                  }
                >
                  <Carousel.Item>
                    <img
                      class="d-inline-block img-fluid mb-4"
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="Image Description"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      class="d-inline-block img-fluid mb-4"
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt="Image Description"
                    />
                  </Carousel.Item>
                </Carousel>
                <h4 class="h5 g-color-black g-font-weight-600 g-mb-10">
                  Repeatable campaign
                </h4>
                <p>01.07.20201. - 05.07.20201.</p>
                <p>3 times a day</p>
                <span class="d-block g-color-primary g-font-size-16">Post</span>
              </article>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
