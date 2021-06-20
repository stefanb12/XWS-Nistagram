import { Link as RouterLink, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import AuthService from "../services/AuthService";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import jwt_decode from "jwt-decode";

const Login = () => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleLogin = (username, password) => {
    let resStatus = 0;
    AuthService.login(username, password)
      .then((res) => {
        resStatus = res.status;
        return res.json();
      })
      .then((result) => {
        if (resStatus === 200) {
          var decodedToken = jwt_decode(result.token);
          var userRole = decodedToken.UserRole;

          localStorage.setItem("currentUser", JSON.stringify(result));
          localStorage.setItem("userToken", result.token);
          localStorage.setItem("userRole", userRole);

          if (result.userRole === 0) {
            history.push("/user");
          } else if (result.userRole === 1) {
            history.push("/user"); // agent
          } else if (result.userRole === 2) {
            history.push("/admin/profileVerificationRequests");
          }
        } else if (resStatus === 400) {
          setSnackBarMessage("Invalid username or password");
          handleClick();
        } else if (resStatus === 401) {
          setSnackBarMessage("Your profile is not active");
          handleClick();
        }

        return result;
      });
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          {snackBarMessage}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().max(255).required("Username is required"),
              password: Yup.string().max(255).required("Password is required"),
            })}
            onSubmit={() => {}}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit} style={{ marginTop: "80px" }}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h3">
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in with your username
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Username"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  // type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }} style={{ marginTop: "10px" }}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={() => handleLogin(values.email, values.password)}
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?{" "}
                  <Link component={RouterLink} to="/app/register" variant="h6">
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
