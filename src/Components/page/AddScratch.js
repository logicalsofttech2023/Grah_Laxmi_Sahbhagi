import React, { useState } from "react";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddScratch = () => {
  const [coins, setCoins] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const token = localStorage.getItem("authToken");
  const base_url = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString("en-GB", options);
    return formattedDate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formattedExpireDate = formatDate(expireDate);

    const data = {
      coins: coins,
      date: formattedExpireDate,
    };

    try {
      const response = await axios.post(`${base_url}/addScratch`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Scratch added successfully!");
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/scratchList");
        }, 1000);
        setCoins("");
        setExpireDate("");
      }
    } catch (err) {
      setError("Error while adding scratch. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarMessage("Error while adding scratch. Please try again.");
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
              ADD Scratch
            </h4>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Coins"
                    variant="outlined"
                    fullWidth
                    required
                    value={coins}
                    onChange={handleInputChange(setCoins)}
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
                      {loading ? "Submitting..." : "Add Scratch"}
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

export default AddScratch;
