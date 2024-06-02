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
import ActiveSalesOrder from "../components/contents/activeSaleOrder";

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
        <div className="right">
          <Button
            size="md"
            height="48px"
            width="200px"
            border="2px"
            borderColor="green.500"
            onClick={() => navigate("/sale-order-form")}
          >
            + Sale Orders
          </Button>
        </div>
        <div className="top">
          <div className="left">
            <Tabs variant="soft-rounded" colorScheme="green">
              <div className=""></div>
              <TabList>
                <Tab className="tab">Active Sales Order</Tab>
                <Tab className="tab">Completed Sales Order</Tab>
              </TabList>
              <TabPanels>
                <TabPanel className="tabpanel">
                  <ActiveSalesOrder />
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </main>
      <div className="footerDashboard">
        <Button colorScheme="teal" variant="solid" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
