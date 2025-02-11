import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const TransactionList = () => {
  const [transactionList, setTransactionList] = useState([]);
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
      .get(`${base_url}/orderCouponList`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        
        if (response.status === 200) {
          setTransactionList(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching community list:", error);
        if (error.response.data.message === "Token has expired") {
          localStorage.removeItem("authToken");
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="panel-content">
            <h4 className="mt-3 mb-3 text-capitalize d-flex align-items-center gap-2">
              <img width={20} src="assets/businessman.png" alt="" />
              ORDER COUPON LIST
            </h4>
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
                        <th>USER NAME</th>
                        <th>USER NUMBER</th>
                        <th className="text-center">COUPON TITLE</th>
                        <th className="text-center">COUPON DESCRIPTION</th>
                        <th className="text-center">COINS</th>
                        <th className="text-center">DATE</th>
                        
                      </tr>
                    </thead>
                    {loading ? (
                      <tr>
                        <td colSpan="8" className="text-center">
                          Loading...
                        </td>
                      </tr>
                    ) : (
                      transactionList.map((data, index) => (
                        <tbody key={index}>
                          <tr>
                            <td className="text-center">{index + 1}</td>
                            
                            <td className="text-center">{data.userId.personName}</td>

                            <td className="text-center">
                              {data.userId.phone}
                            </td>
                            <td className="text-center">{data.couponId.title}</td>
                            <td className="text-center">{data.couponId.description}</td>
                            <td className="text-center">{data.coins}</td>
                            <td className="text-center">
                              {new Date(data.createdAt).toLocaleString()}
                            </td>

                            {/* <td>
                              <div className="d-flex gap-10 justify-content-center">
                                <span
                                  className="btn btn-outline--primary btn-sm cursor-pointer edit"
                                  title="Edit">
                                  <i className="fa fa-pencil-square-o" aria-hidden="true" />
                                </span>
                                <Link
                                  to="/profiles"
                                  title="View"
                                  className="btn btn-outline-info btn-sm square-btn"
                                >
                                  <i
                                    className="fa fa-eye"
                                    aria-hidden="true"
                                  ></i>
                                </Link>
                              </div>
                            </td> */}
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
    </div>
  );
};

export default TransactionList;
