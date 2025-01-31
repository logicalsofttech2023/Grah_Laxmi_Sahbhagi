import Header1 from "./Components/Header1"
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Blog1 from "./Components/page/Blog1"
import Login from "./Components/page/Login";
import Priceplane from "./Components/page/Priceplane";
import Products1 from "./Components/page/Products1"
import Responsiveheaders from "./Components/Responsiveheaders"
import Sidebar from "./Components/Sidebar";
import Topbars from "./Components/Topbars";
import Adminpanel from "./Components/adminePannel/Adminpanel";
import Prfile1 from "./Components/page/Profile1"
import Notifications from "./Components/page/Notifications";
import Reviews1 from "./Components/page/Reviews1"
import Events1 from "./Components/page/Events1"
import Team1 from "./Components/page/Team1";
import Analytics1 from "./Components/Analytics1";
import MessageInbox1 from "./Components/page/MessageInbox1";
import User from "./Components/User";
import AddUser from "./Components/AddUser";
import CouponList from "./Components/page/CouponList";
import AddCoupon from "./Components/page/AddCoupon";
import ScratchList from "./Components/page/ScratchList";
import AddScratch from "./Components/page/AddScratch";
import Sideslide from "./Components/page/Sideslide";
import ContactUs from "./Components/page/ContactUs";
import AboutUs from "./Components/page/AboutUs";
import OrderCouponList from "./Components/page/OrderCouponList";
import { useEffect } from "react";

function App() {
  const location = useLocation();

  const Test = ['/login', '/signUp'];

  const shouldShowHeaderFooter = !Test.includes(location.pathname);
  

  const isLoggedIn = localStorage.getItem('authToken');

  return (
    <>
      <div>
        {shouldShowHeaderFooter && <Header1 />}
        {shouldShowHeaderFooter && <Topbars />}
        {shouldShowHeaderFooter && <Sidebar />}
        {shouldShowHeaderFooter && <Responsiveheaders />}

        <Routes>
          <Route path="/responsiveheaders" element={<Responsiveheaders />} />
          <Route path="/topbar" element={<Topbars />} />
          {/* Protected Routes */}
          <Route path="/" element={isLoggedIn ? <Analytics1 /> : <Navigate to="/login" />} />
          <Route path="/messages" element={isLoggedIn ? <MessageInbox1 /> : <Navigate to="/login" />} />
          <Route path="/notifications" element={isLoggedIn ? <Notifications /> : <Navigate to="/login" />} />
          <Route path="/profiles/:userId" element={isLoggedIn ? <Prfile1 /> : <Navigate to="/login" />} />
          <Route path="/analytic" element={isLoggedIn ? <Analytics1 /> : <Navigate to="/login" />} />
          <Route path="/sideslide" element={isLoggedIn ? <Sideslide /> : <Navigate to="/login" />} />
          <Route path="/products" element={isLoggedIn ? <Products1 /> : <Navigate to="/login" />} />
          <Route path="/priceplane" element={isLoggedIn ? <Priceplane /> : <Navigate to="/login" />} />
          <Route path="/user" element={isLoggedIn ? <User /> : <Navigate to="/login" />} />
          <Route path="/addUser" element={isLoggedIn ? <AddUser /> : <Navigate to="/login" />} />
          <Route path="/blog" element={isLoggedIn ? <Blog1 /> : <Navigate to="/login" />} />
          <Route path="/reviews" element={isLoggedIn ? <Reviews1 /> : <Navigate to="/login" />} />
          <Route path="/events" element={isLoggedIn ? <Events1 /> : <Navigate to="/login" />} />
          <Route path="/team" element={isLoggedIn ? <Team1 /> : <Navigate to="/login" />} />
          <Route path="/couponList" element={isLoggedIn ? <CouponList /> : <Navigate to="/login" />} />
          <Route path="/addCoupon" element={isLoggedIn ? <AddCoupon /> : <Navigate to="/login" />} />
          <Route path="/scratchList" element={isLoggedIn ? <ScratchList /> : <Navigate to="/login" />} />
          <Route path="/addScratch" element={isLoggedIn ? <AddScratch /> : <Navigate to="/login" />} />
          <Route path="/contactUs" element={isLoggedIn ? <ContactUs /> : <Navigate to="/login" />} />
          <Route path="/aboutUs" element={isLoggedIn ? <AboutUs /> : <Navigate to="/login" />} />
          <Route path="/orderCouponList" element={isLoggedIn ? <OrderCouponList /> : <Navigate to="/login" />} />

          {/* Login Route */}
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
