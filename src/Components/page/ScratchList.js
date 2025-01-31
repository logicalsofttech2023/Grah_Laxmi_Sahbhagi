import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

const ScratchList = () => {
  const [scratchList, setScratchList] = useState([]);
  const [loading, setLoading] = useState(true);

  const base_url = process.env.REACT_APP_BASE_URL;
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("User is not logged in.");
      return;
    }

    axios
      .get(`${base_url}/scratchList`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.result) {
          setScratchList(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching community list:", error);
        if (error.response.data.message === "jwt expired") {
          localStorage.removeItem("authToken");
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [base_url, navigate]);

  const handleAddCoupon = ()=>{
    navigate("/addScratch");
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="panel-content">
            <h4 className="mt-3 mb-3 text-capitalize d-flex align-items-center gap-2">
              <img width={20} src="assets/businessman.png" alt="" />
              Scratch List
            </h4>
            <Button sx={{
              margin: "20px"
            }} variant="contained" onClick={handleAddCoupon}>Add Scratch</Button>
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
                        <th>Coins</th>
                        <th>Date</th>
                        <th>CreatedAt</th>
                      </tr>
                    </thead>

                    {loading ? (
                      <tr>
                        <td colSpan="8" className="text-center">
                          Loading...
                        </td>
                      </tr>
                    ) : (
                      scratchList.map((data, index) => (
                        <tbody key={index}>
                          <tr>
                            <td className="text-start">{index + 1}</td>
                            <td className="text-start">{data.coins}</td>
                            <td className="text-start">{data.date}</td>
                            <td className="text-start">{new Date(data.createdAt).toDateString()}</td>
                          </tr>
                        </tbody>
                      ))
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScratchList;
