import React, { useState, useEffect } from "react";
import axios from "axios";
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
  };

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Set up interval to fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Sales Orders</h1>
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
                <Td>...</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ActiveSalesOrder;
