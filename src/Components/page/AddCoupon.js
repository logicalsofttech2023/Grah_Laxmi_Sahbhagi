import React, { useState } from "react";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddCoupon = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mrpCoins, setMrpCoins] = useState("");
  const [saleCoins, setSaleCoins] = useState("");
  const [expireDate, setExpireDate] = useState("");
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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("mrpCoins", mrpCoins);
    formData.append("saleCoins", saleCoins);
    formData.append("expire_date", expireDate);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(`${base_url}/addCoupon`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Coupon added successfully!");
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/couponList");
        }, 1000);
        setTitle("");
        setDescription("");
        setMrpCoins("");
        setSaleCoins("");
        setExpireDate("");
        setImage(null);
      }
    } catch (err) {
      setError("Error while adding coupon. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarMessage("Error while adding coupon. Please try again.");
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
              ADD COUPON
            </h4>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Coupon Title"
                    variant="outlined"
                    fullWidth
                    required
                    value={title}
                    onChange={handleInputChange(setTitle)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    required
                    value={description}
                    onChange={handleInputChange(setDescription)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="MRP Coins"
                    variant="outlined"
                    fullWidth
                    required
                    type="number"
                    value={mrpCoins}
                    onChange={handleInputChange(setMrpCoins)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Sale Coins"
                    variant="outlined"
                    fullWidth
                    required
                    type="number"
                    value={saleCoins}
                    onChange={handleInputChange(setSaleCoins)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Expire Date"
                    variant="outlined"
                    fullWidth
                    required
                    type="date"
                    value={expireDate}
                    onChange={handleInputChange(setExpireDate)}
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
                      {loading ? "Submitting..." : "Add Coupon"}
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

export default AddCoupon;
