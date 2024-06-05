import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function AssignCrud() {
  const [customer, setCustomer] = useState([]);
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [accNum, setAccNum] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8888/bank/read")
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the customers!", error);
      });
  }, []);

  const createCustomer = () => {
    axios
      .post("http://localhost:8888/bank/add", {
        name,
        userName,
        password,
        age,
        accNum,
        address,
        email,
        phone,
        balance,
      })
      .then((response) => {
        setCustomer([...customer, response.data]);
        resetForm();
      })
      .catch((error) => {
        console.error("There was an error creating the customer!", error);
      });
  };

  const updateCustomer = (customer) => {
    axios
      .put(`http://localhost:8888/bank/update/${customer.id}`, {
        name,
        userName,
        password,
        age,
        accNum,
        address,
        email,
        phone,
        balance,
      })
      .then((response) => {
        setCustomer(
          customer.map((c) => (c.id === customer.id ? response.data : c))
        );
        setEditingCustomer(null);
        resetForm();
      })
      .catch((error) => {
        console.error("There was an error updating the customer!", error);
      });
  };

  const deleteCustomer = (id) => {
    axios
      .delete(`http://localhost:8888/bank/delete/${id}`)
      .then(() => {
        setCustomer(customer.filter((customer) => customer.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the customer!", error);
      });
  };

  const handleEditClick = (customer) => {
    setEditingCustomer(customer);
    setUserName(customer.userName);
    setPassword(customer.password);
    setName(customer.name);
    setAge(customer.age);
    setBalance(customer.balance);
    setEmail(customer.email);
    setAddress(customer.address);
    setAccNum(customer.accNum);
    setPhone(customer.phone);
  };

  const handleSaveClick = () => {
    if (editingCustomer) {
      updateCustomer(editingCustomer);
    } else {
      if (validateEmail(email)) {
        createCustomer();
      } else {
        setEmailError("Invalid email format");
      }
    }
  };

  const resetForm = () => {
    setName("");
    setBalance(0.0);
    setAge(0);
    setEmail("");
    setAddress("");
    setAccNum("");
    setPhone("");
    setUserName("");
    setPassword("");
    setEmailError("");
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="#">
            Brillio Bank
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="App bg-light p-4 text-center">
        <h1 className="m-0">Banking CRUD Example</h1>
        <div className="d-flex flex-column align-items-center gap-2 mb-4">
          <input
            type="text"
            className="form-control p-2"
            placeholder="Customer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            className="form-control p-2"
            placeholder="Balance"
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
          />
          <input
            type="email"
            className="form-control p-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="text-danger">{emailError}</p>}
          <input
            type="text"
            className="form-control p-2"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            className="form-control p-2"
            placeholder="Account Number"
            value={accNum}
            onChange={(e) => setAccNum(e.target.value)}
          />
          <input
            type="text"
            className="form-control p-2"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="number"
            className="form-control p-2"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            type="text"
            className="form-control p-2"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            className="form-control p-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSaveClick} className="btn btn-primary p-2">
            {editingCustomer ? "Update Customer" : "Add Customer"}
          </button>
        </div>
        <table className="table table-striped">
          <thead className="bg-primary text-white">
            <tr>
              <th>Name</th>
              <th>Balance</th>
              <th>Email</th>
              <th>Address</th>
              <th>Age</th>
              <th>Account Number</th>
              <th>Phone Number</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customer.map((customer, i) => (
              <tr key={i}>
                <td>{customer.name}</td>
                <td>{customer.balance}</td>
                <td>{customer.email}</td>
                <td>{customer.address}</td>
                <td>{customer.age}</td>
                <td>{customer.accNum}</td>
                <td>{customer.phone}</td>
                <td>{customer.userName}</td>
                <td>
                  <button
                    onClick={() => handleEditClick(customer)}
                    className="btn btn-warning btn-sm mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCustomer(customer.id)}
                    className="btn btn-danger btn-sm mx-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssignCrud;
