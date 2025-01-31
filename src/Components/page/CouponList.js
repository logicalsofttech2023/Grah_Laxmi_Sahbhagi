import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

const CouponList = () => {
  const [couponList, setCouponList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");

  const base_url = process.env.REACT_APP_BASE_URL;
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("User is not logged in.");
      return;
    }

    axios
      .get(`${base_url}/couponList`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);

        if (response.data.result) {
          setCouponList(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching Coupon list:", error);
        if (error.response.data.message === "jwt expired") {
          localStorage.removeItem("authToken");
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const truncateDescription = (description, maxLength = 20) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
  };

  const handleClickOpenDialog = (description) => {
    setSelectedDescription(description);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddCoupon = () => {
    navigate("/addCoupon");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="panel-content">
            <h4 className="mt-3 mb-3 text-capitalize d-flex align-items-center gap-2">
              <img width={20} src="assets/businessman.png" alt="" />
              COUPON LIST
            </h4>
            <Button
              sx={{
                margin: "20px",
              }}
              variant="contained"
              onClick={handleAddCoupon}
            >
              Add Coupon
            </Button>
            <div className="col-md-12">
              <div className="card">
                <div className="table-responsive">
                  <table
                    id="columnSearchDatatable"
                    style={{ textAlign: "left" }}
                    className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                  >
                    <thead className="thead-light thead-50 text-capitalize">
                      <tr>
                        <th className="pl-xl-5">SR NO.</th>
                        <th>Coupon image</th>
                        <th>Coupon Title</th>
                        <th>Coupon Description</th>
                        <th>MRPCoins</th>
                        <th className="text-center">Sale Coins</th>
                        <th>Discount(%)</th>
                        <th>Expire Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {loading ? (
                      <tr>
                        <td colSpan="8" className="text-center">
                          Loading...
                        </td>
                      </tr>
                    ) : (
                      couponList.map((data, index) => (
                        <tbody key={index}>
                          <tr>
                            <td className="text-center">{index + 1}</td>
                            <td>
                              <img
                                style={{ width: "50%" }}
                                src={`http://157.66.191.24:3086/uploads/${data.image}`}
                                alt=""
                              />
                            </td>
                            <td className="text-center">{data.title}</td>
                            <td className="text-center">
                              <Typography variant="body2" color="textSecondary">
                                {truncateDescription(data.description)}
                              </Typography>
                              {data.description.length > 20 && (
                                <Button
                                  size="small"
                                  color="primary"
                                  onClick={() =>
                                    handleClickOpenDialog(data.description)
                                  }
                                >
                                  Read More
                                </Button>
                              )}
                            </td>
                            <td className="text-center">{data.mrpCoins}</td>
                            <td className="text-center">{data.saleCoins}</td>
                            <td className="text-center">
                              {data.discountPercantage}
                            </td>
                            <td className="text-center">{data.expire_date}</td>
                            <td>
                              <div className="d-flex gap-10 justify-content-center">
                                <span
                                                              className="btn btn-outline--primary btn-sm cursor-pointer edit"
                                                              title="Edit">
                                                              <i
                                                                className="fa fa-pencil-square-o"
                                                                aria-hidden="true"
                                                              />
                                                            </span>
                                {/* <a
                                                          className="btn btn-outline-danger btn-sm cursor-pointer delete"
                                                          title="Delete">
                                                          <i className="fa fa-trash-o" aria-hidden="true" />
                                                        </a> */}
                                {/* <Link
                                  // to={`/profiles/${data._id}`}
                                  title="View"
                                  className="btn btn-outline-info btn-sm square-btn"
                                >
                                  <i class="fa fa-eye" aria-hidden="true"></i>
                                </Link> */}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      ))
                    )}
                  </table>
                  <div className="d-flex justify-content-center mt-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Community Description</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{selectedDescription}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CouponList;
