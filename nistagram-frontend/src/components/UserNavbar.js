import React, { useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Telegram from "@material-ui/icons/Telegram";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import {
  BookmarkBorder,
  ExitToApp,
  FavoriteBorder,
  Home,
  Instagram,
  SettingsOutlined,
} from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router";
import AuthService from "../services/AuthService";
import NotificationService from "../services/NotificationService";
import {
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import FollowRequestService from "../services/FollowRequestService";
import ProfileService from "../services/ProfileService";
import moment from "moment";
import PostService from "../services/PostService";
import hash from "../assets/images/hash.svg";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1.3),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  avatar: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {},
}))(MenuItem);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function UserNavbar() {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notificationEl, setNotificationEl] = React.useState(null);
  const [notifications, setNotifications] = React.useState([]);
  const [numberOfNotSeenNotifications, setNumberOfNotSeenNotifications] =
    React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertType, setAlertType] = React.useState("");
  const [loggedUser, setLoggedUser] = React.useState({});
  const [searchValue, setSearchValue] = React.useState("");
  const [allUsers, setAllUsers] = React.useState([]);
  const [mounted, setMounted] = React.useState(false);
  const [publicPosts, setPublicPosts] = React.useState([]);
  const [searchData, setSearchData] = React.useState([]);
  const [searchedPosts, setsearchedPosts] = React.useState([]);

  useEffect(async () => {
    await ProfileService.getAllUsers()
      .then((res) => res.json())
      .then((result) => {
        setAllUsers(result);
      });

    await PostService.getAllPosts()
      .then((res) => res.json())
      .then((result) => {
        setPublicPosts(result);
      });

    setMounted(false);

    let status;
    await NotificationService.getNotificationForProfile(
      AuthService.getCurrentUser().id
    )
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((result) => {
        if (status === 200) {
          setNotifications(result);
          countOfNotSeenNotifications(result);
        }
      });
    let loggedUser = AuthService.getCurrentUser();
    if (loggedUser) {
      await ProfileService.getUser(AuthService.getCurrentUser().id)
        .then((res) => res.json())
        .then((result) => {
          setLoggedUser(result);
        });
    }
  }, []);

  const handleAlertClick = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setOpen(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isNotificationsOpen = Boolean(notificationEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const navigateToHome = () => {
    history.push("/user");
  };

  const navigateToProfile = () => {
    history.push({
      pathname: "/user/profile",
      state: { profileId: AuthService.getCurrentUser().id },
    });
    handleMenuClose();
  };

  const navigateToSettings = () => {
    history.push("/user/settings");
    handleMenuClose();
  };

  const handleLogout = () => {
    AuthService.logout();
    history.push("/app/login");
    handleMenuClose();
  };

  const handleExploreClick = () => {
    history.push("/user/explore");
  };

  const handleConfirmFollowRequest = (followerId, followingId) => {
    ProfileService.follow(followerId, followingId)
      .then((res) => {
        return res.json();
      })
      .then(() => {
        FollowRequestService.deleteFollowRequest(followingId, followerId)
          .then(() => {})
          .then(() => {
            NotificationService.deleteFollowRequestNotification(
              followingId,
              followerId
            )
              .then(() => {})
              .then(() => {
                handleNotificationListClose();
                let status;
                NotificationService.getNotificationForProfile(
                  AuthService.getCurrentUser().id
                )
                  .then((res) => {
                    status = res.status;
                    return res.json();
                  })
                  .then((result) => {
                    if (status === 200) {
                      setNotifications(result);
                      countOfNotSeenNotifications(result);
                      handleAlertClick(
                        "Successfully confirmed follow request",
                        "success"
                      );
                    } else if (status === 404) {
                      setNotifications([]);
                    }
                  });
              });
          });
      });
  };

  const handleDeleteFollowRequest = (receiverId, senderId) => {
    FollowRequestService.deleteFollowRequest(receiverId, senderId)
      .then(() => {})
      .then(() => {
        NotificationService.deleteFollowRequestNotification(
          receiverId,
          senderId
        )
          .then(() => {})
          .then(() => {
            handleNotificationListClose();
            let status;
            NotificationService.getNotificationForProfile(
              AuthService.getCurrentUser().id
            )
              .then((res) => {
                status = res.status;
                return res.json();
              })
              .then((result) => {
                if (status === 200) {
                  setNotifications(result);
                  countOfNotSeenNotifications(result);
                  handleAlertClick("Follow request deleted", "info");
                } else if (status === 404) {
                  setNotifications([]);
                }
              });
          });
      });
  };

  const handleNotificationListOpen = (event) => {
    let status = 0;
    NotificationService.updateSeenNotifications(AuthService.getCurrentUser().id)
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((result) => {
        if (status === 200) {
          setNotifications(result);
          if (notifications.length === 0) {
            handleAlertClick("You dont have any notifications", "info");
          }
        } else if (status == 404) {
          handleAlertClick("You dont have any notifications", "info");
        }
        setNumberOfNotSeenNotifications(0);
      });
    setNotificationEl(event.currentTarget);
    handleMenuClose();
  };

  const handleNotificationListClose = (event) => {
    setNotificationEl(null);
  };

  const countOfNotSeenNotifications = (notifications) => {
    let notSeenNotifications = [];
    notifications.map((notification) => {
      if (notification.seen === false) {
        notSeenNotifications.push(notification);
      }
    });
    setNumberOfNotSeenNotifications(notSeenNotifications.length);
  };

  const notificationItems = notifications.map((notification) => {
    if (notification.followRequest === true) {
      return (
        <StyledMenuItem>
          <div class="dropdown-list-image mr-3">
            <img
              class="img-xs rounded-circle"
              src={notification.sender.imageSrc}
              alt=""
            />
          </div>
          <div class="font-weight mr-3">
            <div>
              {" "}
              {notification.content}
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                style={{ marginLeft: "8px" }}
                onClick={() => {
                  handleConfirmFollowRequest(
                    notification.senderId,
                    notification.receiverId
                  );
                }}
              >
                Confirm
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary btn-sm"
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  handleDeleteFollowRequest(
                    notification.receiverId,
                    notification.senderId
                  );
                }}
              >
                Delete
              </button>
            </div>
          </div>
          <span class="ml-auto mb-auto">
            <div class="text-right text-muted pt-1">
              {moment(
                moment(notification.time).format("YYYY-MM-DD HH:mm:ss")
              ).fromNow()}
            </div>
          </span>
        </StyledMenuItem>
      );
    } else {
      return (
        <StyledMenuItem>
          {(() => {
            if (notification.sender != null) {
              return (
                <div class="dropdown-list-image mr-3">
                  <img
                    class="img-xs rounded-circle"
                    src={notification.sender.imageSrc}
                    alt=""
                  />
                </div>
              );
            } else {
              return (
                <div class="dropdown-list-image mr-3">
                  <img
                    class="img-xs rounded-circle"
                    src="http://localhost:55988/defaultProfile.png"
                    alt=""
                  />
                </div>
              );
            }
          })()}

          <div class="font-weight mr-3">
            <div>
              {" "}
              {notification.content}
              {(() => {
                if (notification.post !== null) {
                  if (notification.post.id !== 1) {
                    return (
                      <div>
                        <img
                          style={{ marginLeft: "12px" }}
                          class="img-xs"
                          src={notification.post.imageSrc}
                          alt=""
                        />
                      </div>
                    );
                  }
                }
              })()}
            </div>
          </div>
          <span class="ml-auto mb-auto">
            <div class="text-right text-muted pt-1">
              {moment(
                moment(notification.time).format("YYYY-MM-DD HH:mm:ss")
              ).fromNow()}
            </div>
          </span>
        </StyledMenuItem>
      );
    }
  });

  const renderNotifications = (
    <StyledMenu
      style={{
        overflow: "auto",
        height: "330px",
      }}
      anchorEl={notificationEl}
      keepMounted
      open={isNotificationsOpen}
      onClose={handleNotificationListClose}
    >
      {notificationItems}
    </StyledMenu>
  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <StyledMenuItem onClick={navigateToProfile}>
        <ListItemIcon>
          <AccountCircle fontSize="medium" />
        </ListItemIcon>
        <ListItemText primary="Profile" style={{ marginRight: "33px" }} />
      </StyledMenuItem>
      <StyledMenuItem onClick={navigateToSettings}>
        <ListItemIcon>
          <SettingsOutlined fontSize="medium" />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </StyledMenuItem>
      {/* <StyledMenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <BookmarkBorder fontSize="medium" />
        </ListItemIcon>
        <ListItemText primary="Saved" />
      </StyledMenuItem> */}
      <StyledMenuItem onClick={handleLogout}>
        <ListItemIcon>
          <ExitToApp fontSize="medium" />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </StyledMenuItem>
    </StyledMenu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleClick}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const renderSearchResults = (
    <TableContainer
      style={{ width: "16%", marginLeft: "12%" }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={isMenuOpen}
    >
      <Table
        className={classes.table}
        aria-label="simple table"
        style={{
          width: "16%",
          marginTop: "4%",
          position: "absolute",
          zIndex: 10,
          backgroundColor: "white",
          border: "1px solid grey",
        }}
      >
        <div style={{ height: "212px", width: "100%", overflow: "auto" }}>
          <TableBody style={{ width: "100%" }}>
            {searchData
              .filter((val) => {
                if (searchValue == "") {
                  return val;
                } else if (
                  val.searchParam
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((row) => (
                <StyledTableRow
                  style={{ width: "100%" }}
                  key={row.searchParam}
                  onClick={(event) => onChoseSearchResult(event, row)}
                >
                  <StyledTableCell style={{ width: "40%" }} align="center">
                    <img
                      src={row.imageSrc}
                      className="rounded-circle img-responsive mt-2"
                      width="30"
                      height="30"
                    />
                    <label style={{ marginLeft: "4%" }}>
                      {row.searchParam}
                    </label>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </div>
      </Table>
    </TableContainer>
  );

  const onChoseSearchResult = async (event, row) => {
    await PostService.getSearchedPosts(row.searchParam)
      .then((res) => res.json())
      .then((result) => {
        setsearchedPosts(result);
      });

    if (row.type == "user") {
      setSearchValue("");
      history.push({
        pathname: "/user/profile",
        state: { profileId: row.id },
      });
    } else if (row.type == "tag" || row.type == "location") {
      setSearchValue("");
      await PostService.getSearchedPosts(row.searchParam)
        .then((res) => res.json())
        .then((result) => {
          history.push({
            pathname: "/user/search",
            state: {
              searchParam: row.searchParam,
              imageSrc: row.imageSrc,
              posts: result,
            },
          });
        });
    }
  };

  const onSearchChange = async (event) => {
    setSearchValue(event.target.value);
    if (searchValue == "" && mounted == false) {
      await ProfileService.getAllUsers()
        .then((res) => res.json())
        .then((result) => {
          setAllUsers(result);
        });

      await PostService.getAllPosts()
        .then((res) => res.json())
        .then((result) => {
          setPublicPosts(result);
        });
    }

    if (mounted == false) {
      for (let i = 0; i < allUsers.length; i++) {
        var user = {
          id: allUsers[i].id,
          searchParam: allUsers[i].username,
          imageSrc: allUsers[i].imageSrc,
          type: "user",
        };
        searchData.push(user);
      }

      for (let i = 0; i < publicPosts.length; i++) {
        if (publicPosts[i].tags != null) {
          for (let j = 0; j < publicPosts[i].tags.length; j++) {
            let flag = false;
            for (let k = 0; k < searchData.length; k++) {
              if (searchData[k].searchParam == publicPosts[i].tags[j]) {
                flag = true;
              }
            }
            if (flag == false) {
              var tag = {
                id: null,
                searchParam: publicPosts[i].tags[j],
                imageSrc: hash,
                type: "tag",
              };
              searchData.push(tag);
            }
          }
        }
        if(publicPosts[i].location.address == null && publicPosts[i].location.city == null && publicPosts[i].location.cpuntry == null){
          continue;
        }
        else if (
          publicPosts[i].location.address === "" ||
          publicPosts[i].location.address === null
        ) {
          let flag = false;
          for (let k = 0; k < searchData.length; k++) {
            if (
              searchData[k].searchParam ==
              publicPosts[i].location.city +
                ", " +
                publicPosts[i].location.country
            ) {
              flag = true;
            }
          }
          if (flag == false) {
            var location = {
              id: null,
              searchParam:
                publicPosts[i].location.city +
                ", " +
                publicPosts[i].location.country,
              imageSrc:
                "https://i.pinimg.com/564x/4e/dc/b4/4edcb460a940ff726549077935f57168.jpg",
              type: "location",
            };
            searchData.push(location);
          }
        } else {
          var location = {
            id: null,
            searchParam:
              publicPosts[i].location.address +
              ", " +
              publicPosts[i].location.city +
              ", " +
              publicPosts[i].location.country,
            imageSrc:
              "https://i.pinimg.com/564x/4e/dc/b4/4edcb460a940ff726549077935f57168.jpg",
            type: "location",
          };
          searchData.push(location);
        }
      }
    }

    await setMounted(true);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ position: "fixed" }}>
        <Snackbar
          open={open}
          autoHideDuration={1800}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleAlertClose} severity={alertType}>
            {alertMessage}
          </Alert>
        </Snackbar>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <Instagram onClick={navigateToHome} />
          </IconButton>
          <Typography
            onClick={navigateToHome}
            className={classes.title}
            variant="h6"
            noWrap
          >
            Nistagram
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              autoFocus
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={searchValue}
              onChange={(event) => onSearchChange(event)}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="show 12 new notifications"
              color="inherit"
              onClick={navigateToHome}
            >
              <Badge color="secondary">
                <Home />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="show 12 new notifications"
              color="inherit"
              onClick={handleExploreClick}
            >
              <Badge color="secondary">
                <ExploreOutlinedIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="show 12 new notifications"
              color="inherit"
              onClick={handleNotificationListOpen}
            >
              <Badge
                badgeContent={numberOfNotSeenNotifications}
                color="secondary"
              >
                <FavoriteBorder />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 12 new notifications" color="inherit">
              <Badge color="secondary">
                <Telegram
                  onClick={() =>
                    handleAlertClick("Chat is not available yet", "info")
                  }
                />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <div className={classes.avatar}>
                <Avatar
                  className={classes.small}
                  alt="profile"
                  src={loggedUser.imageSrc}
                />
              </div>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {(() => {
        if (notifications.length === 0) {
          return <div></div>;
        } else {
          return renderNotifications;
        }
      })()}
      {(() => {
        if (searchValue == "") {
          return <div></div>;
        } else {
          return renderSearchResults;
        }
      })()}
    </div>
  );
}
