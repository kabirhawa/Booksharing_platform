import {
  Alert,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../Service/user.service";
import { Formik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const [openAlert, setOpenAlert] = useState(false);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(3, "Password must be 3 characters at minimum")
      .required("Password is required"),
    mobile: Yup.string().matches(/^\d{10}$/, "Invalid phone number"),
    country: Yup.string().required(),
  });
  return (
    <Box>
      {/* <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          Form submitted successfully!
        </Alert>
      </Snackbar> */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          console.log(values);
          register({
            email: values.email,
            password: values.password,
            mobile: values.mobile,
            country: values.country,
          })
            .then((response) => {
              if (response.success) {
                setOpenAlert(true);
              }

              navigate("/login");
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }}
      >
        {({ errors, touched, handleSubmit, handleChange, handleBlur }) => (
          <Container component="main" maxWidth="sm">
            <Box
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                px: 4,
                py: 6,
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="phone_number"
                  label="Phone Number"
                  name="mobile"
                  autoComplete="mobile"
                  autoFocus
                  error={touched.mobile && !!errors.mobile}
                  helperText={touched.mobile && errors.mobile}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="country_name"
                  label="country"
                  name="country"
                  autoComplete="country"
                  error={touched.country && !!errors.country}
                  helperText={touched.country && errors.country}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  margin="normal"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/login" variant="body2">
                      {"Already have account? sign-in"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Container>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
