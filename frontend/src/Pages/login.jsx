import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik } from "formik";
import * as Yup from "yup";
import { getUser, login } from "../Service/user.service";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../store/slices/user";
import { showSnakbar } from "../store/slices/snakbar";
import { loginImage } from "../images/loginRegister";
import axios from "axios";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibilityToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(3, "Password must be 3 characters at minimum")
      .required("Password is required"),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();



  return (
    <Box
      sx={{
        backgroundImage: `url(${loginImage})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          console.log(values);
          login({ email: values.email, password: values.password })
            .then((response) => {
              const authToken = response.data.token;
              const now = new Date().getTime();
              sessionStorage.setItem("authToken", authToken);
              sessionStorage.setItem("authTokenTimestamp", now);
              dispatch(setToken(response.data.token));
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + authToken;
              getUser().then((response) => {
                dispatch(setUser(response.data.data));
                dispatch(
                  showSnakbar({
                    message: "Login Success",
                    open: true,
                    type: "success",
                  })
                );

                navigate("/");
              });
            })
            .catch((error) => {
              dispatch(
                showSnakbar({
                  message: "Login Failed",
                  open: true,
                  type: "error",
                })
              );
              console.error("Error:", error);
            });
        }}
      >
        {({ errors, touched, handleSubmit, handleChange, handleBlur }) => (
          <Container component="main" maxWidth="sm" sx={{ pt: 8 }}>
            <Box
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                px: 4,
                py: 6,

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form onSubmit={handleSubmit}>
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
                  autoFocus
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
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to={"#"} variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to={"/register"} variant="body2">
                      {"Don't have an account? Sign Up"}
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
}
