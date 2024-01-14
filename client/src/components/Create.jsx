import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
  const [error, setErr] = useState(null);
  const [values, setValues] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("http://localhost:5000/add_user", values, {
        withCredentials: true,
      });
      if (resp) {
        alert(`${resp.data} was added successfully`);
        navigate("/");
      }
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="container vh-100 vw-100 bg-primary">
      <div className="row">
        <h3>Add person</h3>
        <div className="d-flex justify-content-end">
          <Link to="/" className="btn btn-success">
            Home
          </Link>
        </div>
        <form onSubmit={handleForm}>
          <div className="form-group my-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              required
              minLength={5}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="email">Email</label>
            <input type="email" required name="email" onChange={handleChange} />
          </div>
          <div className="form-group my-3">
            <label htmlFor="age">Age</label>
            <input type="number" required name="age" onChange={handleChange} />
          </div>
          <div className="form-group my-3">
            <label htmlFor="gender">Gender</label>
            <input type="text" required name="gender" onChange={handleChange} />
          </div>
          {error && error}
          <div className="form-group my-3">
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
