import {
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../Service/user.service";
import { showSnakbar } from "../../store/slices/snakbar";

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  console.log(data);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibilityToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    name: Yup.string()
      .min(2, "please Enter Valid name")
      .required("Name is required"),
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
        initialValues={{
          name: data ? data?.name : "",
          email: data ? data?.email : "",
          password: "",
          mobile: data ? data.mobile : "",
          country: data ? data.country : "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          console.log(values);
          register({
            name: values.name,
            email: values.email,
            password: values.password,
            mobile: values.mobile,
            country: values.country,
          })
            .then(() => {
              dispatch(
                showSnakbar({
                  message: "Successfully Register",
                  open: true,
                  type: "success",
                })
              );

              navigate("/login");
            })
            .catch((error) => {
              console.error("Error:", error);
              dispatch(
                showSnakbar({
                  message: "Unable to Register",
                  open: true,
                  type: "error",
                })
              );
            });
        }}
      >
        {({
          errors,
          touched,
          values,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => (
          <Container component="main" maxWidth="sm" sx={{ pt: 1 }}>
            <Box
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                px: 4,
                py: 4,

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <Typography component="h1" variant="h5">
                Add user
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values.name}
                  id="name"
                  label="name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  margin="normal"
                  required
                  defaultValue={values.mobile}
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="phone_number"
                  label="Phone Number"
                  name="mobile"
                  autoComplete="mobile"
                  error={touched.mobile && !!errors.mobile}
                  helperText={touched.mobile && errors.mobile}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  defaultValue={values.country}
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
                  defaultValue={values.email}
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
                  type={showPassword ? "text" : "password"}
                  id="password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handlePasswordVisibilityToggle}>
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
                  Add
                </Button>
              </form>
            </Box>
          </Container>
        )}
      </Formik>
    </Box>
  );
};

export default CreateUser;
