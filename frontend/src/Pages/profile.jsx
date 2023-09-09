import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateUsers } from "../Service/user.service";
import { showSnakbar } from "../store/slices/snakbar";
import * as Yup from "yup";

const Profile = () => {
  const [changePassword, setChangePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordVisibilityToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleConfirmPasswordVisibilityToggle = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const UpdateSchema1 = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    name: Yup.string()
      .min(2, "please Enter Valid name")
      .required("Name is required"),

    mobile: Yup.string().matches(/^\d{10}$/, "Invalid phone number"),
    country: Yup.string().required(),
  });

  const UpdateSchema2 = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const location = useLocation();
  const defaultVal = useSelector((state) => state.user).user;
  const user = location.state ? location.state : defaultVal;
  console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box sx={{ p: 2, mt: 5, mb: 5 }}>
      <Typography variant={"h2"}>Your Profile</Typography>
      <Formik
        initialValues={{
          name: user?.name ? user.name : "",
          email: user?.email ? user.email : "",
          password: "",
          confirmPassword: "",
          mobile: user?.mobile ? user.mobile : "",
          country: user?.country ? user.country : "",
        }}
        validationSchema={changePassword ? UpdateSchema2 : UpdateSchema1}
        onSubmit={(values) => {
          console.log(values);
          updateUsers(user?._id, {
            name: values.name,
            email: values.email,
            mobile: values.mobile,
            country: values.country,
          })
            .then(() => {
              dispatch(
                showSnakbar({
                  message: "Successfully saved Settings",
                  open: true,
                  type: "success",
                })
              );

              navigate("/");
            })
            .catch((error) => {
              console.error("Error:", error);
              dispatch(
                showSnakbar({
                  message: "Unable to save settings",
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
          <Box>
            <Box sx={{ p: 2, mt: 5, mb: 5 }}>
              {!changePassword ? (
                <>
                  <Grid container sx={{ mt: 3, mb: 3 }}>
                    <Grid xs={12} sm={12} md={5} lg={5} xl={5}>
                      <TextField
                        fullWidth
                        type="name"
                        value={values?.name}
                        onChange={handleChange}
                        id="filled-basic"
                        label="name"
                        name="name"
                        variant="standard"
                        error={touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                      />
                    </Grid>
                    <Grid xs={1} sm={1} md={1} lg={1} xl={2}></Grid>
                    <Grid xs={12} sm={12} md={5} lg={5} xl={5}>
                      <TextField
                        fullWidth
                        name="email"
                        type="email"
                        onChange={handleChange}
                        value={values?.email}
                        id="filled-basic"
                        label="email"
                        variant="standard"
                        error={touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                  </Grid>

                  <Grid container sx={{ mt: 3, mb: 3 }}>
                    <Grid xs={12} sm={12} md={5} lg={5} xl={5}>
                      <TextField
                        fullWidth
                        name="mobile"
                        onChange={handleChange}
                        value={values?.mobile}
                        id="filled-basic"
                        label="mobile number"
                        variant="standard"
                        error={touched.mobile && !!errors.mobile}
                        helperText={touched.mobile && errors.mobile}
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={1} lg={1} xl={2}></Grid>
                    <Grid xs={12} sm={12} md={5} lg={5} xl={5}>
                      <TextField
                        fullWidth
                        name="country"
                        type="text"
                        onChange={handleChange}
                        value={values?.country}
                        id="filled-basic"
                        label="country"
                        variant="standard"
                        error={touched.country && !!errors.country}
                        helperText={touched.country && errors.country}
                      />
                    </Grid>
                  </Grid>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      onClick={() => {
                        setChangePassword(true);
                      }}
                    >
                      Change password
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Grid container sx={{ mt: 3, mb: 3 }}>
                    <Grid xs={12} sm={12} md={5} lg={5} xl={5}>
                      <TextField
                        fullWidth
                        name="password"
                        type={showPassword ? "text" : "password"}
                        onChange={handleChange}
                        value={values?.password}
                        id="filled-basic"
                        label="password"
                        variant="standard"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handlePasswordVisibilityToggle}
                              >
                                {showPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        error={touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                      />
                    </Grid>
                    <Grid xs={1} sm={1} md={1} lg={1} xl={2}></Grid>
                    <Grid xs={12} sm={12} md={5} lg={5} xl={5}>
                      <TextField
                        fullWidth
                        name="confirmPassword"
                        onChange={handleChange}
                        type={showConfirmPassword ? "text" : "password"}
                        value={values?.confirmPassword}
                        id="filled-basic"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleConfirmPasswordVisibilityToggle}
                              >
                                {showConfirmPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        label="Confirm password"
                        error={
                          touched.confirmPassword && !!errors.confirmPassword
                        }
                        helperText={
                          touched.confirmPassword && errors.confirmPassword
                        }
                        variant="standard"
                      />
                    </Grid>
                  </Grid>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      onClick={() => {
                        setChangePassword(false);
                      }}
                    >
                      Change profile
                    </Button>
                  </Box>
                </>
              )}
            </Box>

            <Box
              sx={{
                p: 2,
                mt: 5,
                mb: 5,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button type="submit" onClick={handleSubmit} variant="contained">
                Submit
              </Button>
            </Box>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Profile;
