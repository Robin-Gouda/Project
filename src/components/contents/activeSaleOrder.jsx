import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import "./css/activeSaleOrder.css";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const ActiveSalesOrder = () => {
  const [salesData, setSalesData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3005/saleOrder");
      const data = response.data;

      // Process the data to calculate totalPrice
      const processedData = data.map((order) => {
        const totalPrice = order.items.reduce((acc, item) => {
          return acc + item.price * item.quantity;
        }, 0);
        return { ...order, totalPrice };
      });

      setSalesData(processedData);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }

    try {
      const response = await axios.get("http://localhost:3003/customerSchema");
      setCustomerData(response.data);
      console.log(customerData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Set up interval to fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 50000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Customer Name</Th>
              <Th>Price</Th>
              <Th>Last Modified</Th>
              <Th>Edit/view</Th>
            </Tr>
          </Thead>
          <Tbody>
            {salesData.flatMap((order, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{order.customerId}</Td>
                <Td>{order.totalPrice.toFixed(2)}</Td>
                <Td>{order.invoiceDate}</Td>
                <Td className="choicelink">
                  <a
                    className="linkButton"
                    onClick={() => navigate("/sale-order-form")}
                  >
                    ooo
                    {/* <BsThreeDots /> */}
                  </a>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ActiveSalesOrder;
