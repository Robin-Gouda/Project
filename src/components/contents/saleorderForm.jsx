import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
// import "./css/saleorderForm.css";
import axios from "axios";

const SaleorderForm = () => {
  const [productInventory, setProductInventory] = useState([]);
  const [combined, setCombined] = useState([]);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState([]);
  const [dataFetched, setDataFetched] = useState({
    product: false,
    customer: false,
  });
  const initialState = selectedOption.flatMap((product) =>
    product.sku.map((item) => ({
      id: item.id,
      price: 0,
      quantity: 0,
    }))
  );
  const [formData, setFormData] = useState({
    customerId: "",
    invoiceNo: "",
    paid: false,
    invoiceDate: "",
    items: initialState,
  });
  const [saleOrders, setSaleOrders] = useState([]);

  // fetching data from the URL//
  useEffect(() => {
    fetch("http://localhost:3002/productInventory")
      .then((response) => response.json())
      .then((data) => {
        setProductInventory(data);
        setDataFetched((prevState) => ({ ...prevState, product: true }));
      });
  }, []);

  // Data is stored in combined state variable post fetching
  useEffect(() => {
    if (dataFetched.product) {
      setCombined([...productInventory]);
    }
  }, [dataFetched, productInventory]);

  // adding label's for multi select
  const addFields = (arr) => {
    return arr.map((obj) => {
      return {
        label: obj.name,
        value: obj.name,
        ...obj,
      };
    });
  };
  const modifiedArray = addFields(combined);

  // selecting data for multi-select search bar
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  // creating array for payload [array]
  const [values, setValues] = useState(initialState);

  const handleChangeInInput = (e, skuId) => {
    const { name, value } = e.target;
    setValues((prevValues) =>
      prevValues.map((item) =>
        item.id === skuId ? { ...item, [name]: parseFloat(value) } : item
      )
    );
  };

  useEffect(() => {
    setValues(initialState);
  }, [selectedOption]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      items: values,
    }));
  }, [values]);

  const handleChangeForm = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3005/saleOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log(formData);
  };

  return (
    <div className="AddFormContainer">
      <div className="formToAdd">
        <form onSubmit={handleSubmit}>
          <div className="sale_Order_Form_Header">
            <div className="two_by_two">
              <div>
                <h5>Customer Id</h5>
                <input
                  id="customerId"
                  name="customerId"
                  required={true}
                  type="text"
                  placeholder="Customer Id"
                  value={formData.customerId}
                  onChange={handleChangeForm}
                />
              </div>
              <div>
                <h5>Invoice No</h5>
                <input
                  id="invoiceNo"
                  name="invoiceNo"
                  type="text"
                  required={true}
                  placeholder="Invoice Number"
                  value={formData.invoiceNo}
                  onChange={handleChangeForm}
                />
              </div>
            </div>
            <div className="two_by_two">
              <div>
                <h5>Paid</h5>
                <input
                  id="paid"
                  name="paid"
                  type="checkbox"
                  checked={formData.paid}
                  onChange={handleChangeForm}
                />
              </div>
              <div>
                <h5>Invoice Date</h5>
                <input
                  type="date"
                  id="invoiceDate"
                  name="invoiceDate"
                  value={formData.invoiceDate}
                  onChange={handleChangeForm}
                />
              </div>
            </div>
          </div>

          <Select
            options={modifiedArray}
            value={selectedOption}
            onChange={handleChange}
            isMulti={true}
          />

          <div className="dropdown">
            {selectedOption.map((product, productIndex) => {
              return product.sku.map((item, skuIndex) => {
                const valueObj = values.find((v) => v.id === item.id);
                return (
                  <div key={skuIndex} className="mainContainer">
                    <div className="bodyContainer">
                      <div className="top">
                        <div className="left">
                          <h3>{skuIndex + 1}.</h3>
                          <h3> SKU </h3>
                          <h3> {item.id} </h3>
                          <h3> (234KG) </h3>
                        </div>
                        <div className="right">
                          Rate Rs {item.max_retail_price}
                        </div>
                      </div>
                      <hr />
                      <div className="bottom">
                        <div className="bleft">
                          <h4>Selling Rate</h4>
                          <input
                            type="number"
                            name="price"
                            value={valueObj ? valueObj.price : ""}
                            placeholder="Enter Selling Rate"
                            onChange={(e) => handleChangeInInput(e, item.id)}
                          />
                        </div>
                        <div className="bleft">
                          <h4>Total Item</h4>
                          <input
                            type="number"
                            name="quantity"
                            value={valueObj ? valueObj.quantity : ""}
                            placeholder="Enter Quantity"
                            onChange={(e) => handleChangeInInput(e, item.id)}
                          />
                        </div>
                      </div>
                      <div className="green_element_each_item">
                        {item.quantity_in_inventory} item remaining
                      </div>
                    </div>
                  </div>
                );
              });
            })}
          </div>
          <div className="buttons">
            <button type="submit">Submit</button>
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={() => navigate("/content")}
            >
              Close and go back
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaleorderForm;
