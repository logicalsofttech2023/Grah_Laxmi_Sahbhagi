import React, { useState } from "react";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [dob, setDOB] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const token = localStorage.getItem("authToken");
  const base_url = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const handleFileChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const currentDate = new Date();
    const selectedDate = new Date(dob);

    if (selectedDate > currentDate) {
      setError("Date of Birth cannot be in the future.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("personName", name);
    formData.append("dob", dob);
    if (image) formData.append("userProfile", image);

    try {
      const response = await axios.post(`${base_url}/userRegister`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setSnackbarSeverity("success");
        setSnackbarMessage("User added successfully!");
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/user");
        }, 1000);
        setEmail("");
        setPassword("");
        setPhone("");
        setName("");
        setDOB("");
        setImage(null);
      }
    } catch (err) {
      setError("Error while adding user. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarMessage("Error while adding user. Please try again.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = async () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="panel-content">
            <h4 className="mt-3 mb-3 text-capitalize d-flex align-items-center gap-2">
              <img src="assets/businessman.png" alt="" />
              ADD USER
            </h4>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="email"
                    variant="outlined"
                    fullWidth
                    required
                    value={email}
                    onChange={handleInputChange(setEmail)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="password"
                    variant="outlined"
                    fullWidth
                    required
                    value={password}
                    onChange={handleInputChange(setPassword)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    required
                    type="number"
                    value={phone}
                    onChange={handleInputChange(setPhone)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Person Name"
                    variant="outlined"
                    fullWidth
                    required
                    value={name}
                    onChange={handleInputChange(setName)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Expire Date"
                    variant="outlined"
                    fullWidth
                    required
                    type="date"
                    value={dob}
                    onChange={handleInputChange(setDOB)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <input
                    accept="image/*"
                    type="file"
                    onChange={handleFileChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  {error && <Typography color="error">{error}</Typography>}
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="center">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Add User"}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddUser;
