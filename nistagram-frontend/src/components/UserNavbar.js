import React from "react";
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
  root: {
    // "&:focus": {
    //   backgroundColor: theme.palette.common.white,
    //   "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
    //     color: theme.palette.common.white,
    //   },
    // },
  },
}))(MenuItem);

export default function UserNavbar() {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notificationEl, setNotificationEl] = React.useState(null);

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
    history.push("/user/home");
  };

  const navigateToProfile = () => {
    history.push("/user/profile");
    handleMenuClose();
  };

  const navigateToSettings = () => {
    history.push("/user/settings");
    handleMenuClose();
  };

  const handleLogout = () => {
    AuthService.logout();
    history.push("/app");
    handleMenuClose();
  };

  const handleNotificationListOpen = (event) => {
    setNotificationEl(event.currentTarget);
    handleMenuClose();
  };

  const handleNotificationListClose = (event) => {
    setNotificationEl(null);
  };

  const renderNotifications = (
    <StyledMenu
      anchorEl={notificationEl}
      keepMounted
      open={isNotificationsOpen}
      onClose={handleNotificationListClose}
    >
      <StyledMenuItem>
        <div class="dropdown-list-image mr-3">
          <img
            class="img-xs rounded-circle"
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
            alt=""
          />
        </div>
        <div class="font-weight-bold mr-3">
          <div class="text-truncate">DAILY RUNDOWN: WEDNESDAY</div>
          <div class="small">
            Income tax sops on the cards, The bias in VC funding, and other top
            news for you
          </div>
        </div>
        <span class="ml-auto mb-auto">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-light btn-sm rounded"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="mdi mdi-dots-vertical"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-right">
              <button class="dropdown-item" type="button">
                <i class="mdi mdi-delete"></i> Delete
              </button>
              <button class="dropdown-item" type="button">
                <i class="mdi mdi-close"></i> Turn Off
              </button>
            </div>
          </div>
          <br />
          <div class="text-right text-muted pt-1">3d</div>
        </span>
      </StyledMenuItem>
      <StyledMenuItem>
        <div class="dropdown-list-image mr-3">
          <img
            class="img-xs rounded-circle"
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
            alt=""
          />
        </div>
        <div class="font-weight-bold mr-3">
          <div class="text-truncate">DAILY RUNDOWN: WEDNESDAY</div>
          <div class="small">
            Income tax sops on the cards, The bias in VC funding, and other top
            news for you
          </div>
        </div>
        <span class="ml-auto mb-auto">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-light btn-sm rounded"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="mdi mdi-dots-vertical"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-right">
              <button class="dropdown-item" type="button">
                <i class="mdi mdi-delete"></i> Delete
              </button>
              <button class="dropdown-item" type="button">
                <i class="mdi mdi-close"></i> Turn Off
              </button>
            </div>
          </div>
          <br />
          <div class="text-right text-muted pt-1">3d</div>
        </span>
      </StyledMenuItem>
      <StyledMenuItem>
        <div class="dropdown-list-image mr-3">
          <img
            class="img-xs rounded-circle"
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
            alt=""
          />
        </div>
        <div class="font-weight-bold mr-3">
          <div class="text-truncate">DAILY RUNDOWN: WEDNESDAY</div>
          <div class="small">
            Income tax sops on the cards, The bias in VC funding, and other top
            news for you
          </div>
        </div>
        <span class="ml-auto mb-auto">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-light btn-sm rounded"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="mdi mdi-dots-vertical"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-right">
              <button class="dropdown-item" type="button">
                <i class="mdi mdi-delete"></i> Delete
              </button>
              <button class="dropdown-item" type="button">
                <i class="mdi mdi-close"></i> Turn Off
              </button>
            </div>
          </div>
          <br />
          <div class="text-right text-muted pt-1">3d</div>
        </span>
      </StyledMenuItem>
      <StyledMenuItem>
        <div class="dropdown-list-image mr-3">
          <img
            class="img-xs rounded-circle"
            src="https://bootdey.com/img/Content/avatar/avatar2.png"
            alt=""
          />
        </div>
        <div class="font-weight-bold mr-3">
          <div class="mb-2">
            <span class="font-weight-normal">
              Congratulate Gurdeep Singh Osahan (iamgurdeeposahan)
            </span>{" "}
            for 5 years at Askbootsrap Pvt.
          </div>
          <button type="button" class="btn btn-outline-success btn-sm">
            Say congrats
          </button>
        </div>
        <span class="ml-auto mb-auto">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-light btn-sm rounded"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="mdi mdi-dots-vertical"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-right">
              <button class="dropdown-item" type="button">
                <i class="mdi mdi-delete"></i> Delete
              </button>
              <button class="dropdown-item" type="button">
                <i class="mdi mdi-close"></i> Turn Off
              </button>
            </div>
          </div>
          <br />
          <div class="text-right text-muted pt-1">4d</div>
        </span>
      </StyledMenuItem>
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
      <StyledMenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <BookmarkBorder fontSize="medium" />
        </ListItemIcon>
        <ListItemText primary="Saved" />
      </StyledMenuItem>
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
            <Instagram />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Nistagram
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
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
            <IconButton aria-label="show 12 new notifications" color="inherit">
              <Badge color="secondary">
                <Telegram />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="show 12 new notifications"
              color="inherit"
              onClick={handleNotificationListOpen}
            >
              <Badge badgeContent={17} color="secondary">
                <FavoriteBorder />
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
                  src="https://bootdey.com/img/Content/avatar/avatar6.png"
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
      {renderNotifications}
    </div>
  );
}
