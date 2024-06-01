import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/contents/Navbar";
import { logout } from "../services/AuthServices";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from "@chakra-ui/react";
import "../App.css";
import Popup from "reactjs-popup";
import SaleorderForm from "../components/contents/saleorderForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={`app ${theme}`}>
      <Navbar />
      <main>
        <h2>Dashboard</h2>
        <div className="top">
          <div className="left">
            <Tabs variant="soft-rounded" colorScheme="green">
              <TabList>
                <Tab className="tab">Tab 1</Tab>
                <Tab className="tab">Tab 2</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
          <div className="right">
            <Popup
              trigger={
                <Button
                  size="md"
                  height="48px"
                  width="200px"
                  border="2px"
                  borderColor="green.500"
                >
                  + Sale Orders
                </Button>
              }
              modal
              nested
            >
              {(close) => (
                <div className="modal">
                  <div className="content">
                    <SaleorderForm />
                  </div>
                  <div>
                    <Button
                      colorScheme="teal"
                      variant="solid"
                      onClick={() => close()}
                    >
                      Close modal
                    </Button>
                  </div>
                </div>
              )}
            </Popup>
            ;
          </div>
        </div>
        <p>This is a sample content that will follow the theme.</p>
      </main>
      <Button colorScheme="teal" variant="solid" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
