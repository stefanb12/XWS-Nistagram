import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Link,
  TextField,
  Typography,
  RadioGroup,
  Radio,
  Snackbar,
} from "@material-ui/core";
import React from "react";
import AuthService from "../services/AuthService";
import { Alert } from "@material-ui/lab";

const Register = () => {
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState("success");

  const handleRegistration = async (
    fullName,
    username,
    email,
    password,
    gender,
    isAgent,
    websiteLink
  ) => {
    let resStatus = false;
    await AuthService.registerUser(
      fullName,
      username,
      email,
      password,
      gender,
      isAgent,
      websiteLink
    ).then((result) => {
      if (result.status === 201) {
        setSnackBarMessage("Registration successful!");
        setAlertSeverity("success");
        setShowSnackbar(true);
        resStatus = true;
      } else if (result.status === 400) {
        setSnackBarMessage("Profile with entered username already exists!");
        setAlertSeverity("error");
        setShowSnackbar(true);
        resStatus = false;
      }
    });
    return resStatus;
  };

  const handleClose = (event, reason) => {
    setShowSnackbar(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity={alertSeverity}>{snackBarMessage}</Alert>
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
              username: "",
              email: "",
              fullName: "",
              password: "",
              gender: "male",
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().max(255).required("Username is required"),
              email: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is required"),
              fullName: Yup.string()
                .max(255)
                .required("First name is required"),
              password: Yup.string().max(255).required("Password is required"),
            })}
            onSubmit={async (values) => {
              let res = await handleRegistration(
                values.fullName,
                values.username,
                values.email,
                values.password,
                values.gender,
                values.websiteLink
              );
              if (res) {
                values.username = "";
                values.email = "";
                values.fullName = "";
                values.password = "";
                values.gender = "male";
                values.websiteLink = "";
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{ mb: 3 }}
                  style={{
                    marginTop: "15px",
                  }}
                >
                  <Typography color="textPrimary" variant="h3">
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.fullName && errors.fullName)}
                  fullWidth
                  helperText={touched.fullName && errors.fullName}
                  label="Full name"
                  margin="normal"
                  name="fullName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
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
                <RadioGroup
                  label="Password"
                  name="gender"
                  onChange={handleChange}
                  value={values.gender}
                  row
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    //disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Have an account?{" "}
                  <Link component={RouterLink} to="/app/login" variant="h6">
                    Sign in
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

export default Register;
