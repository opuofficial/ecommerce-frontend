import React, { useState } from "react";
import Sidebar from "../../components/sidebar";
import MainSection from "../../components/mainsection";
import { useMediaQuery } from "react-responsive";
import { Drawer } from "antd";

function Home() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1100px)" });
  const [open, setOpen] = useState(false);
  const showSidebar = () => {
    setOpen(true);
  };
  const hideSidebar = () => {
    setOpen(false);
  };

  return (
    <main>
      <div className="container">
        {isTabletOrMobile ? (
          <Drawer
            placement="left"
            closable={false}
            onClose={hideSidebar}
            open={open}
            key={"left"}
          >
            <Sidebar hideSidebar={hideSidebar} />
          </Drawer>
        ) : (
          <Sidebar />
        )}

        <MainSection showSidebar={showSidebar} />
      </div>
    </main>
  );
}

export default Home;
