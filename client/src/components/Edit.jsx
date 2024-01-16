import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/get_user/${id}`)
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/edit_user/${id}`, data[0])
      .then((resp) => {
        setData(resp.data);
        alert(`Edited successfully!`);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid bg-primary vh-100 vw-100">
      <h1>User I.D: {id}</h1>
      <Link to="/" className="btn btn-success">
        BACK
      </Link>
      {data.map((user) => {
        return (
          <form key={user.id} onSubmit={handleSubmit}>
            <div className="form-group my-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                required
                minLength={5}
                name="name"
                value={user.name}
                onChange={(e) =>
                  setData([{ ...data[0], name: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                required
                name="email"
                value={user.email}
                onChange={(e) =>
                  setData([{ ...data[0], email: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                required
                name="age"
                value={user.age}
                onChange={(e) => setData([{ ...data[0], age: e.target.value }])}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                required
                name="gender"
                value={user.gender}
                onChange={(e) =>
                  setData([{ ...data[0], gender: e.target.value }])
                }
              />
            </div>
            {/* {error && error} */}
            <div className="form-group my-3">
              <button type="submit" className="btn btn-success">
                Edit
              </button>
            </div>
          </form>
        );
      })}
    </div>
  );
};

export default Edit;
