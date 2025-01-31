import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Button, Snackbar, Alert, TextField } from '@mui/material';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const [contactUs, setContactUs] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    clientName: '',
    phone: '',
    email: '',
    whatsappNumber: '',
  });
  const base_url = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/contactusList`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.data.data) {
        setContactUs(response.data.data);
        setUpdatedData({
          clientName: response.data.data.clientName,
          phone: response.data.data.phone,
          email: response.data.data.email,
          whatsappNumber: response.data.data.whatsappNumber,
        });
      }
    } catch (error) {
      console.error("Error fetching contact us:", error);
      if (error.response.data.message === "jwt expired") {
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await axios.post(
        `${base_url}/addContactus`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.result) {
        setSnackbarMessage('Contact info updated successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error updating contact us:", error);
      setSnackbarMessage('Failed to update contact info');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="panel-content">
            <h3 className="mb-3">Contact Us</h3>

            {contactUs ? (
              <div style={{ width: "100%" }}>
                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Client Name:</Typography>
                      <TextField
                        name="clientName"
                        value={updatedData.clientName}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      />

                      <Typography variant="h6" mt={2}>Phone:</Typography>
                      <TextField
                        name="phone"
                        value={updatedData.phone}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      />

                      <Typography variant="h6" mt={2}>Email:</Typography>
                      <TextField
                        name="email"
                        value={updatedData.email}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      />

                      <Typography variant="h6" mt={2}>WhatsApp Number:</Typography>
                      <TextField
                        name="whatsappNumber"
                        value={updatedData.whatsappNumber}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </div>
            ) : (
              <Typography>No contact information available</Typography>
            )}

            <Button
              onClick={handleUpdate}
              variant="contained"
              color="primary"
              className="mt-3"
            >
              Update
            </Button>
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

export default ContactUs;
