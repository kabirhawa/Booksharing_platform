import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import {useNavigate} from "react-router-dom";


const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Implement logic to submit the form data
    console.log(formData); // You can replace this with your logic
  };
  const navigate = useNavigate();


  return (
    <div>
    <Button style={{ float:"left" }} variant="contained" color="primary" onClick={()=>navigate("/admin/User")}>
     Back
  </Button>
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Create User
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="message"
              label="Message"
              multiline
              rows={4}
              fullWidth
              value={formData.message}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    </div>
  );
};

export default CreateUser;