import { Outlet } from "react-router";
import NavBar from "~/components/Navbar";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default MainLayout;
