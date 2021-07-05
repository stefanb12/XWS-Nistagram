import React, { Component } from "react";
import { Carousel, Modal, Button } from "react-bootstrap";
import {
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import "../assets/styles/campaigns.css";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import NumericInput from "material-ui-numeric-input";
import NotFound from "./NotFound";
import CommercialService from "../services/CommercialService";
import AuthService from "../services/AuthService";
import PostService from "../services/PostService";
import CampaignService from "../services/CampaignService";
import ProfileService from "../services/ProfileService";
import { ArrowForwardIosTwoTone } from "@material-ui/icons";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import dateFormat from "dateformat";
import StoryService from "../services/StoryService";
import NotificationService from "../services/NotificationService";

export default class Campaigns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaings: [],
      commercials: [],
      campaignType: "single",
      postOrStory: "post",
      selectedTime: new Date(),
      selectedFromDate: new Date(),
      selectedToDate: new Date(),
      selectedNumber: 1,
      checkedCommercials: [],
      isCampaignModalDialogOpen: false,
      snackBarOpen: false,
      snackBarMessage: "",
      snackBarType: "",
      isHireInfluencerDialogOpen: false,
      following: [],
      selectedCampaignId: 0,
      campaignRequestsForSelectedCampaign: [],
    };
    this.handleCampaignTypeChange = this.handleCampaignTypeChange.bind(this);
    this.handlePostOrStoryChange = this.handlePostOrStoryChange.bind(this);
  }

  async componentDidMount() {
    await CommercialService.getCommercialsForAgent(
      AuthService.getCurrentUser().id
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ commercials: data });
      });

    await this.getCampaignsForAgent();
  }

  getCampaignsForAgent = async () => {
    await CampaignService.getSingleCampaignsForAgent(
      AuthService.getCurrentUser().id
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let allCampaings = data;
        this.setState({ campaings: allCampaings });
        CampaignService.getRepeatableCampaignsForAgent(
          AuthService.getCurrentUser().id
        )
          .then((res) => {
            return res.json();
          })
          .then((result) => {
            allCampaings.push.apply(allCampaings, result);
            this.setState({ campaings: allCampaings });
          });
      });
  };

  hireInfluencer = (campaignId) => {
    CampaignService.getCampaignRequestForCampaign(campaignId)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          campaignRequestsForSelectedCampaign: result,
        });
        ProfileService.getFollowingInfluencers(AuthService.getCurrentUser().id)
          .then((res) => res.json())
          .then((result) => {
            this.setState({
              following: result,
            });
          });
      });

    this.setState({
      isHireInfluencerDialogOpen: true,
      selectedCampaignId: campaignId,
    });
  };

  createCampaign = () => {
    if (this.state.checkedCommercials.length == 0) {
      this.handleClickSnackBar("You must select commercials", "error");
    } else if (this.state.postOrStory === "post") {
      if (this.state.selectedNumber === 0) {
        this.handleClickSnackBar(
          "Daily repeat number can not be zero",
          "error"
        );
      } else {
        let agent = AuthService.getCurrentUser();
        let commercialsImages = [];
        for (let i = 0; i < this.state.checkedCommercials.length; i++) {
          let commercial = {
            imageName: this.state.checkedCommercials[i].imageName,
            websiteLink: this.state.checkedCommercials[i].websiteLink,
          };
          commercialsImages.push(commercial);
        }

        let resStatus = 0;
        PostService.insertCampaignPost(
          commercialsImages,
          "",
          "",
          "",
          [],
          "",
          agent
        )
          .then((res) => {
            resStatus = res.status;
            return res.json();
          })
          .then((result) => {
            if (resStatus === 200) {
              CampaignService.insertCampaign(
                this.state.campaignType === "single" ? true : false,
                this.state.postOrStory === "post" ? true : false,
                this.state.checkedCommercials,
                AuthService.getCurrentUser().id,
                result.id,
                1,
                this.state.selectedTime,
                this.state.selectedFromDate,
                this.state.selectedToDate,
                this.state.selectedNumber
              )
                .then((res) => {
                  resStatus = res.status;
                  return res.json();
                })
                .then((result) => {
                  if (resStatus === 200) {
                    this.getCampaignsForAgent();
                    this.handleClickSnackBar(
                      "Successfully created campaign",
                      "success"
                    );
                    this.closeCampaignModal();
                  }
                  return result;
                });
            }
            return result;
          });
      }
    } else {
      if (this.state.selectedNumber === 0) {
        this.handleClickSnackBar("Daily repeat number cannot be zero", "error");
      } else {
        let agent = AuthService.getCurrentUser();
        let commercialsImages = [];
        for (let i = 0; i < this.state.checkedCommercials.length; i++) {
          let commercial = {
            imageName: this.state.checkedCommercials[i].imageName,
            websiteLink: this.state.checkedCommercials[i].websiteLink,
          };
          commercialsImages.push(commercial);
        }

        let resStatus = 0;
        StoryService.addStoryCampaign(commercialsImages, false, agent)
          .then((res) => {
            resStatus = res.status;
            return res.json();
          })
          .then((result) => {
            if (resStatus === 200) {
              CampaignService.insertCampaign(
                this.state.campaignType === "single" ? true : false,
                this.state.postOrStory === "post" ? true : false,
                this.state.checkedCommercials,
                AuthService.getCurrentUser().id,
                result.id,
                1,
                this.state.selectedTime,
                this.state.selectedFromDate,
                this.state.selectedToDate,
                this.state.selectedNumber
              )
                .then((res) => {
                  resStatus = res.status;
                  return res.json();
                })
                .then((result) => {
                  if (resStatus === 200) {
                    this.getCampaignsForAgent();
                    this.handleClickSnackBar(
                      "Successfully created campaign",
                      "success"
                    );
                    this.closeCampaignModal();
                  }
                  return result;
                });
            }
            return result;
          });
      }
    }
  };

  handleNumberChange = (number) => {
    this.setState({
      selectedNumber: number,
    });
  };

  handleTimeChange = (time) => {
    this.setState({
      selectedTime: time,
    });
  };

  handleFromDateChange = (date) => {
    this.setState({
      selectedFromDate: date,
    });
  };

  handleToDateChange = (date) => {
    this.setState({
      selectedToDate: date,
    });
  };

  handleCampaignTypeChange = (event) => {
    this.setState({
      campaignType: event.target.value,
    });
  };

  handlePostOrStoryChange = (event) => {
    this.setState({
      postOrStory: event.target.value,
    });
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
      selectedTime: new Date(),
      selectedFromDate: new Date(),
      selectedToDate: new Date(),
      selectedNumber: 1,
      checkedCommercials: [],
    });
  };

  closeHireInfluencerModal = () => {
    this.setState({
      isHireInfluencerDialogOpen: false,
    });
  };

  handleClickSnackBar = (message, type) => {
    this.setState({
      snackBarMessage: message,
      snackBarType: type,
      snackBarOpen: true,
    });
  };

  handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackBarOpen: false });
  };

  checkIfCommercialIsChecked = (commercial) => {
    for (let c of this.state.checkedCommercials) {
      if (c.id === commercial.id) {
        return true;
      }
    }
    return false;
  };

  sendInfluencerHiringRequest = (influencerId) => {
    CampaignService.sendCampaignRequest(
      this.state.selectedCampaignId,
      influencerId
    ).then((res) => {
      if (res.status == 200) {
        NotificationService.sendCampaignRequestNotification(
          influencerId,
          AuthService.getCurrentUser().id,
          this.state.selectedCampaignId
        )
          .then((res) => res.json())
          .then((result) => {});
        CampaignService.getCampaignRequestForCampaign(
          this.state.selectedCampaignId
        )
          .then((res) => res.json())
          .then((result) => {
            this.setState({
              campaignRequestsForSelectedCampaign: result,
              snackBarOpen: true,
              snackBarMessage: "Campaign request sent",
              snackBarType: "success",
            });
          });
      }
      return res.json();
    });
  };

  isRegistrationRequestForInfluencerAlreadySent(influencerId) {
    for (let request of this.state.campaignRequestsForSelectedCampaign) {
      if (request.influencerId === influencerId) {
        if (!request.processed) {
          return 1;
        } else if (request.accepted) {
          return 2;
        } else {
          return 3;
        }
      }
    }
    return 0;
  }

  deleteCampaign = async (campaign) => {
    PostService.deletePost(campaign.postId)
    .then((res) => {
      if (res.status == 200) {
        CampaignService.deleteCampaign(campaign.id, campaign.isSingleCampaign)
        .then((res) => {
          if (res.status == 200) {
            this.setState({
              snackBarMessage: "Campaign successfully deleted",
              snackBarOpen: true,
              snackBarType: "success"
            })
            this.getCampaignsForAgent();
          }
        });
      }
    });
  }

  render() {
    let commercialsForCampaignModalDialog = this.state.commercials.map(
      (commercial) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                key={commercial.id}
                checked={this.checkIfCommercialIsChecked(commercial)}
                onChange={(event) => {
                  let list = this.state.checkedCommercials;
                  if (event.target.checked) {
                    list.push(commercial);
                  } else {
                    list.splice(list.indexOf(commercial), 1);
                  }
                  this.setState({
                    checkedCommercials: list,
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

    var hireInfuencerModal = (
      <Modal
        show={this.state.isHireInfluencerDialogOpen}
        onHide={this.closeHireInfluencerModal}
        style={{ marginTop: "120px", maxHeight: "500px", overflow: "hidden" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Hire influencer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ overflow: "auto", maxHeight: "300px" }}>
            {this.state.following.map((profile) => {
              return (
                <div class="list-group-item d-flex align-items-center">
                  <img
                    src={profile.imageSrc}
                    alt=""
                    width="50px"
                    class="rounded-sm ml-n2"
                  />
                  <div class="flex-fill pl-3 pr-3">
                    <div>
                      <a href="#" class="text-dark font-weight-600">
                        {profile.username}
                      </a>
                    </div>
                    {/* <div class="text-muted fs-13px">{follower.fullName}</div> */}
                  </div>
                  {(() => {
                    if (
                      this.isRegistrationRequestForInfluencerAlreadySent(
                        profile.id
                      ) == 0
                    ) {
                      return (
                        <Button
                          onClick={() => {
                            this.sendInfluencerHiringRequest(profile.id);
                          }}
                        >
                          Hire
                        </Button>
                      );
                    } else if (
                      this.isRegistrationRequestForInfluencerAlreadySent(
                        profile.id
                      ) == 1
                    ) {
                      return (
                        <div>
                          {" "}
                          <b
                            class="text-regular mr-4"
                            style={{ marginLeft: "25px" }}
                          >
                            {" "}
                            Request sent
                          </b>
                        </div>
                      );
                    } else if (
                      this.isRegistrationRequestForInfluencerAlreadySent(
                        profile.id
                      ) == 2
                    ) {
                      return (
                        <div>
                          {" "}
                          <b
                            class="text-success mr-4"
                            style={{ marginLeft: "25px" }}
                          >
                            {" "}
                            Accepted
                          </b>
                        </div>
                      );
                    } else {
                      return (
                        <div>
                          {" "}
                          <b
                            class="text-danger mr-4"
                            style={{ marginLeft: "25px" }}
                          >
                            {" "}
                            Rejected
                          </b>
                        </div>
                      );
                    }
                  })()}
                </div>
              );
            })}
          </div>
        </Modal.Body>
      </Modal>
    );

    var addCampaignModalDialog = (
      <Modal
        show={this.state.isCampaignModalDialogOpen}
        onHide={this.closeCampaignModal}
        centered
        style={{ marginTop: "28px" }}
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
            overflow: "auto",
          }}
        >
          <div style={{ height: "480px" }}>
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
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {(() => {
                  if (this.state.campaignType === "single") {
                    return (
                      <div>
                        <KeyboardTimePicker
                          margin="normal"
                          id="time-picker"
                          label="Select time"
                          value={this.state.selectedTime}
                          onChange={this.handleTimeChange}
                          KeyboardButtonProps={{
                            "aria-label": "change time",
                          }}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div>
                        <KeyboardDatePicker
                          margin="normal"
                          id="date-picker-dialog"
                          label="Select from date"
                          format="MM/dd/yyyy"
                          value={this.state.selectedFromDate}
                          onChange={this.handleFromDateChange}
                          minDate={this.state.selectedFromDate}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                        <br />
                        <KeyboardDatePicker
                          margin="normal"
                          id="date-picker-dialog"
                          label="Select to date"
                          format="MM/dd/yyyy"
                          value={this.state.selectedToDate}
                          onChange={this.handleToDateChange}
                          minDate={this.state.selectedFromDate}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />

                        <div>
                          <br />
                          <NumericInput
                            style={{ maxWidth: "50px" }}
                            value={this.state.selectedNumber}
                            name="example"
                            label="Daily repeat"
                            precision="0"
                            onChange={this.handleNumberChange}
                            variant="outlined"
                          />
                        </div>
                      </div>
                    );
                  }
                })()}
              </MuiPickersUtilsProvider>
              <RadioGroup
                style={{ marginTop: "18px" }}
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
          <Button variant="success" onClick={this.createCampaign}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    );

    let campaignCards = this.state.campaings.map((campaign) => {
      return (
        <div class="col-md-6 col-lg-4 g-mb-30">
          <article
            class="u-shadow-v18 g-bg-white text-center rounded g-px-20 g-py-40 g-mb-5"
            style={{ border: "1px solid black", height: "420px" }}
          >
            {(() => {
              if (campaign.commercials.length === 1) {
                return (
                  <img
                    class="d-inline-block img-fluid mb-4"
                    src={campaign.commercials[0].imageSrc}
                    alt="Image Description"
                    style={{ height: "160px" }}
                  />
                );
              } else {
                return (
                  <Carousel
                    interval={null}
                    nextIcon={
                      <span
                        aria-hidden="true"
                        class="carousel-control-next-icon"
                      />
                    }
                    style={{ paddingBottom: "23px" }}
                  >
                    {(() => {
                      return campaign.commercials.map((commercial) => {
                        return (
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src={commercial.imageSrc}
                              alt="First slide"
                              style={{ height: "160px" }}
                            />
                          </Carousel.Item>
                        );
                      });
                    })()}
                  </Carousel>
                );
              }
            })()}
            {(() => {
              if (campaign.isSingleCampaign) {
                return (
                  <div>
                    <h4 class="h5 g-color-black g-font-weight-600 g-mb-10">
                      Single campaign
                    </h4>
                    <p>At {dateFormat(campaign.broadcastTime, "h:MM TT")}</p>
                    <p>Once per day</p>
                  </div>
                );
              } else {
                return (
                  <div>
                    <h4 class="h5 g-color-black g-font-weight-600 g-mb-10">
                      Repeatable campaign
                    </h4>
                    <p>
                      {dateFormat(campaign.startTime, "dd.mm.yyyy.")} -
                      {dateFormat(campaign.endTime, "dd.mm.yyyy.")}
                    </p>
                    <p>{campaign.numberOfRepeats} times a day</p>
                  </div>
                );
              }
            })()}

            {(() => {
              if (campaign.isPost) {
                return (
                  <span class="d-block g-color-primary g-font-size-16">
                    Post
                  </span>
                );
              } else {
                return (
                  <span class="d-block g-color-primary g-font-size-16">
                    Story
                  </span>
                );
              }
            })()}

            <a
              href="javascript:void(0)"
              class="text-success mr-4"
              data-toggle="tooltip"
              data-placement="top"
              title=""
              data-original-title="Edit"
              style={{
                fontSize: "19px",
                float: "left",
                marginTop: "1px",
              }}
              onClick={() => {
                this.hireInfluencer(campaign.id);
              }}
            >
              <i class="fa fa-envelope"></i>
            </a>
            <a
              href="javascript:void(0)"
              class="text-info mr-4"
              data-toggle="tooltip"
              data-placement="top"
              title=""
              data-original-title="Edit"
              style={{ fontSize: "20px", float: "left", marginLeft: "-8px" }}
            >
              <i class="fa fa-pencil"></i>
            </a>
            <a
              href="javascript:void(0)"
              class="text-danger mr-4"
              data-toggle="tooltip"
              data-placement="top"
              title=""
              data-original-title="Edit"
              style={{
                fontSize: "20px",
                float: "left",
                marginLeft: "-10px",
              }}
              onClick={() => {
                this.deleteCampaign(campaign);
              }}
            >
              <i class="fa fa-trash"></i>
            </a>
          </article>
        </div>
      );
    });

    if (localStorage.getItem("userRole") !== "Agent") {
      return <NotFound />;
    } else {
      return (
        <div>
          {addCampaignModalDialog}
          {hireInfuencerModal}
          <Snackbar
            open={this.state.snackBarOpen}
            autoHideDuration={2000}
            onClose={this.handleCloseSnackBar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={this.handleCloseSnackBar}
              severity={this.state.snackBarType}
            >
              {this.state.snackBarMessage}
            </Alert>
          </Snackbar>
          ;
          <div class="graph-star-rating-footer text-center ">
            <h2
              style={{
                textAlign: "center",
                color: "#74767a",
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
              {campaignCards}
              {/* {(() => {
                if (this.state.campaings.length === 0) {
                  return <div>Doesn't exist campaigns yet</div>;
                } else {
                  return <div>{campaignCards}</div>;
                }
              })()} */}
            </div>
          </div>
        </div>
      );
    }
  }
}
