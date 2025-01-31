import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile1 = () => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("authToken");
  const { userId } = useParams(); 
  const [userDetail, setUserDetail] = useState(null);
  const [activeTab, setActiveTab] = useState("photos");

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${base_url}/userDetails`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        setUserDetail(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  // Demo data for each tab
  const tabContent = {
    photos: ["Photo 1", "Photo 2", "Photo 3"],
    videos: ["Video 1", "Video 2", "Video 3"],
    followers: ["Follower 1", "Follower 2", "Follower 3"],
    following: ["Following 1", "Following 2", "Following 3"],
    community: ["Community 1", "Community 2", "Community 3"],
    page: ["Post 1", "Post 2", "Post 3"],
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="panel-content">
            <h4 className="main-title">User Profile</h4>
            <div className="row merged20 mb-4">
              <div className="col-lg-4">
                <div className="d-widget text-center">
                  <div className="user-avatar-edit">
                    <figure>
                      <img
                        src="http://localhost:3000/images/resources/user-mockupbg.jpg"
                        alt="User"
                      />
                    </figure>
                  </div>
                  <div className="user-dp-edit">
                    <figure>
                      {userDetail ? (
                        userDetail[0]?.profileImage ? (
                          <img
                            src={`http://157.66.191.24:3054/uploads/${userDetail[0].profileImage}`}
                            alt="User"
                          />
                        ) : (
                          <img
                            src="https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
                            alt="Default"
                          />
                        )
                      ) : (
                        <p>Loading...</p>
                      )}
                    </figure>
                    <div className="users-name">
                      <h5>{userDetail ? userDetail[0]?.userName : "Loading..."}</h5>
                      <span>{userDetail ? userDetail[0]?.description : "Loading..."}</span>
                    </div>
                  </div>
                  <ul className="folowerss">
                    <li>
                      <span>Posts</span> <i>{userDetail ? userDetail[0]?.posts : 0}</i>
                    </li>
                    <li>
                      <span>Followers</span> <i>{userDetail ? userDetail[0]?.followers : 0}</i>
                    </li>
                    <li>
                      <span>Following</span> <i>{userDetail ? userDetail[0]?.followings : 0}</i>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-8">
                {/* Tab Navigation */}
                <nav className="responsive-tab style1">
                  <ul
                    className="uk-grid"
                    uk-switcher="connect: #picturez; animation: uk-animation-slide-left-medium, uk-animation-slide-right-medium"
                    uk-sticky="offset:50;media : @m"
                  >
                    <li>
                      <a href="#" onClick={() => setActiveTab("photos")}>
                        Photos
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={() => setActiveTab("videos")}>
                        Videos
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={() => setActiveTab("followers")}>
                        Followers
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={() => setActiveTab("following")}>
                        Following
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={() => setActiveTab("community")}>
                        Community
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={() => setActiveTab("page")}>
                        Page
                      </a>
                    </li>
                  </ul>
                </nav>

                {/* Tab Content */}
                <div className="tab-content" id="picturez">
                  <div className="tab-pane active" id="tab-1">
                    <h5>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h5>
                    <ul>
                      {tabContent[activeTab].map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile1;
