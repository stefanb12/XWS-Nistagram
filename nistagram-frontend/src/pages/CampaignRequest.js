import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import "../assets/styles/campaigns.css";
import "date-fns";
import NotFound from "./NotFound";
import dateFormat from "dateformat";
import CampaignService from "../services/CampaignService";
import { Link, withRouter } from "react-router-dom";
import PostService from "../services/PostService";
import AuthService from "../services/AuthService";
import StoryService from "../services/StoryService";
import NotificationService from "../services/NotificationService";

class CampaignRequests extends Component {
  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
    this.state = {
      campaignId: this.props.location.state.campaignId,
      campaign: {},
      campaings: [],
      snackBarOpen: false,
      snackBarMessage: "",
      snackBarType: "",
      accepted: false,
      processed: false,
    };
  }

  static componentWillReceiveProps(props) {
    return {
      campaignId: props.location.state.campaignId,
    };
  }

  componentDidMount() {
    CampaignService.getCampaign(this.state.campaignId)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let campaignList = [];
        campaignList.push(data);
        this.setState({ campaings: campaignList, campaign: data });
      });
    this.checkIfCampaignIsProcessed();
  }

  checkIfCampaignIsProcessed = () => {
    CampaignService.getCampaignRequestForCampaign(this.state.campaignId)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        let campaignsForCampaign = result;
        for (let i = 0; i < campaignsForCampaign.length; i++) {
          if (
            campaignsForCampaign[i].campaignId === this.state.campaignId &&
            campaignsForCampaign[i].influencerId ===
              AuthService.getCurrentUser().id
          ) {
            this.setState({
              accepted: campaignsForCampaign[i].accepted,
              processed: campaignsForCampaign[i].processed,
            });
          }
        }
        return result;
      });
  };

  confirmCampaignRequest = () => {
    if (this.state.campaign.isPost) {
      // save post
      let commercialsImages = [];
      for (let i = 0; i < this.state.campaign.commercials.length; i++) {
        let commercial = {
          imageName: this.state.campaign.commercials[i].imageName,
          websiteLink: this.state.campaign.commercials[i].websiteLink,
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
        AuthService.getCurrentUser()
      )
        .then((res) => {
          resStatus = res.status;
          return res.json();
        })
        .then((result) => {
          if (resStatus === 200) {
            CampaignService.acceptCampaignRequest(
              this.state.campaignId,
              AuthService.getCurrentUser().id
            )
              .then((res) => {
                resStatus = res.status;
                return res.json();
              })
              .then((result) => {
                this.checkIfCampaignIsProcessed();
                return result;
              });
            this.handleClickSnackBar(
              "Successfully accepted campaign request",
              "success"
            );
          }
          return result;
        });
    } else {
      // save story
      let commercialsImages = [];
      for (let i = 0; i < this.state.campaign.commercials.length; i++) {
        let commercial = {
          imageName: this.state.campaign.commercials[i].imageName,
          websiteLink: this.state.campaign.commercials[i].websiteLink,
        };
        commercialsImages.push(commercial);
      }

      let resStatus = 0;
      StoryService.addStoryCampaign(
        commercialsImages,
        false,
        AuthService.getCurrentUser()
      )
        .then((res) => {
          resStatus = res.status;
          return res.json();
        })
        .then((result) => {
          if (resStatus === 200) {
            CampaignService.acceptCampaignRequest(
              this.state.campaignId,
              AuthService.getCurrentUser().id
            )
              .then((res) => {
                resStatus = res.status;
                return res.json();
              })
              .then((result) => {
                this.checkIfCampaignIsProcessed();
                return result;
              });
            this.handleClickSnackBar(
              "Successfully accepted campaign request",
              "success"
            );
          }
          return result;
        });
    }
  };

  rejectCampaignRequest = () => {
    let resStatus = 0;
    CampaignService.rejectCampaignRequest(
      this.state.campaignId,
      AuthService.getCurrentUser().id
    )
      .then((res) => {
        resStatus = res.status;
        return res.json();
      })
      .then((result) => {
        if (resStatus === 200) {
          this.checkIfCampaignIsProcessed();
          this.handleClickSnackBar(
            "Successfully rejected campaign request",
            "success"
          );
        }
        return result;
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

  render() {
    let campaignCards = this.state.campaings.map((campaign) => {
      return (
        <div class="col-md-6 col-lg-4 g-mb-30">
          <article
            class="u-shadow-v18 g-bg-white text-center rounded g-px-20 g-py-40 g-mb-5"
            style={{
              border: "1px solid black",
              height: "420px",
            }}
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
                    style={{ paddingBottom: "65px" }}
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
            {(() => {
              if (
                this.state.processed === true &&
                this.state.accepted === true
              ) {
                return (
                  <div style={{ color: "blue", float: "left" }}>Accepted</div>
                );
              } else if (
                this.state.processed === true &&
                this.state.accepted === false
              ) {
                return (
                  <div style={{ color: "red", float: "left" }}>Rejected</div>
                );
              } else {
                return (
                  <div>
                    <a
                      href="javascript:void(0)"
                      class="text-info mr-4"
                      data-toggle="tooltip"
                      data-placement="top"
                      title=""
                      data-original-title="Edit"
                      style={{ fontSize: "20px", float: "left" }}
                      onClick={this.confirmCampaignRequest}
                    >
                      <i class="fa fa-check"></i>
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
                      onClick={this.rejectCampaignRequest}
                    >
                      <i class="fa fa-times"></i>
                    </a>
                  </div>
                );
              }
            })()}
          </article>
        </div>
      );
    });

    if (localStorage.getItem("userRole") !== "User") {
      return <NotFound />;
    } else {
      return (
        <div
          style={{
            overflow: "hidden",
          }}
        >
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
                marginRight: "38px",
                paddingBottom: "15px",
                fontSize: "34px",
              }}
            >
              Campaign request
            </h2>
          </div>
          <div
            class="container"
            style={{
              marginLeft: "550px",
              marginTop: "30px",
              overflow: "hidden",
            }}
          >
            <div>{campaignCards}</div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(CampaignRequests);
