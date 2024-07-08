import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
