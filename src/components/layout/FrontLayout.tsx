import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const FrontLayout = () => (
  <>
    <Navbar />
    <main className="min-h-screen pt-16">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default FrontLayout;
