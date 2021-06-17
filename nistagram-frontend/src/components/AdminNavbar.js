import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Instagram } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import BusinessCenterOutlinedIcon from "@material-ui/icons/BusinessCenterOutlined";
import ReportOutlinedIcon from "@material-ui/icons/ReportOutlined";
import { Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

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
  buttonMargin: {
    marginLeft: "12px",
  },
  container: {
    maxHeight: 10,
  },
}));

const MyTooltip = withStyles({
  tooltip: {
    fontSize: "14px",
    color: "black",
    backgroundColor: "#caf0f8",
  },
})(Tooltip);

export default function AdminNavbar() {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {}, []);

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

  const navigateToLogin = () => {
    history.push("/app/login");
  };

  const navigateToRegister = () => {
    history.push("/app/register");
  };

  const navigateToHome = () => {
    history.push("/app");
  };

  const handleExploreClick = () => {
    history.push("/user/explore");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
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
      <MenuItem onClick={handleProfileMenuOpen}>
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

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ position: "fixed" }}>
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

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <MyTooltip title="Inappropriate content requests">
              <IconButton
                aria-label="Inappropriate content requests"
                color="inherit"
                onClick={handleExploreClick}
              >
                <Badge color="secondary">
                  <ReportOutlinedIcon />
                </Badge>
              </IconButton>
            </MyTooltip>
            <MyTooltip title="Agent requests">
              <IconButton
                aria-label="Agent requests"
                color="inherit"
                onClick={handleExploreClick}
              >
                <Badge color="secondary">
                  <BusinessCenterOutlinedIcon />
                </Badge>
              </IconButton>
            </MyTooltip>
            <MyTooltip title="Verification requests">
              <IconButton
                aria-label="Verification requests"
                color="inherit"
                onClick={handleExploreClick}
              >
                <Badge color="secondary">
                  <CheckCircleOutlineIcon />
                </Badge>
              </IconButton>
            </MyTooltip>
            <MyTooltip title="Log out">
              <IconButton
                aria-label="log out"
                color="inherit"
                onClick={handleExploreClick}
              >
                <Badge color="secondary">
                  <ExitToAppIcon />
                </Badge>
              </IconButton>
            </MyTooltip>

            {/* <Button
              variant="contained"
              color="primary"
              onClick={navigateToLogin}
              className={classes.buttonMargin}
            >
              Inappropriate content requests
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={navigateToLogin}
              className={classes.buttonMargin}
            >
              Verification requests
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={navigateToLogin}
              className={classes.buttonMargin}
            >
              Agent requests
            </Button> */}
            {/* <Button
              variant="contained"
              color="primary"
              onClick={navigateToRegister}
              className={classes.buttonMargin}
            >
              Log out
            </Button> */}
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
    </div>
  );
}
