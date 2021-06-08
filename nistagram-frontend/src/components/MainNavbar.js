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
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Instagram } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { Autocomplete } from "@material-ui/lab";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  withStyles,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import SelectSearch from "react-select-search";
import ProfileService from "../services/ProfileService";
import PostService from "../services/PostService";
import hash from "../assets/images/hash.svg";

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
  buttonMargin: {
    marginLeft: "12px",
  },
  container: {
    maxHeight: 10,
  },
}));

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

export default function MainNavbar() {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [allUsers, setAllUsers] = React.useState([]);
  const [mounted, setMounted] = React.useState(false);
  const [publicPosts, setPublicPosts] = React.useState([]);
  const [searchData, setSearchData] = React.useState([]);
  const [searchedPosts, setsearchedPosts] = React.useState([]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    ProfileService.getAllUsers()
      .then((res) => res.json())
      .then((result) => {
        setAllUsers(result);
      });

    PostService.getAllPosts()
      .then((res) => res.json())
      .then((result) => {
        setPublicPosts(result);
      });

    setMounted(false);
    //loadData();
  }, []);

  /*const loadData = async () => {
    const response = await ProfileService.getAllUsers();
    const json = await response.json();
    setAllUsers(json.data);
  }*/

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

  const onChoseSearchResult = async (event, row) => {
    await PostService.getSearchedPosts(row.searchParam)
      .then((res) => res.json())
      .then((result) => {
        setsearchedPosts(result);
      });

    if (row.type == "user" && row.id != null) {
      setSearchValue("");
      history.push({
        pathname: "/app/profile",
        state: { profileId: row.id },
      });
    } else if (row.type == "tag" || row.type == "location") {
      setSearchValue("");
      await PostService.getSearchedPosts(row.searchParam)
        .then((res) => res.json())
        .then((result) => {
          history.push({
            pathname: "/app/search",
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
        if (
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

  const handleSearhClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <Button
              variant="contained"
              color="primary"
              onClick={navigateToLogin}
            >
              Sign in
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={navigateToRegister}
              className={classes.buttonMargin}
            >
              Register
            </Button>
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
        if (searchValue == "") {
          return <div></div>;
        } else {
          return renderSearchResults;
        }
      })()}
    </div>
  );
}
