import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/retrieve_users")
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container-fluid bg-primary vh-100 vw-100">
      <div className="d-flex justify-content-end">
        <Link className="btn btn-success" to="/create">
          Add User
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>AGE</th>
            <th>GENDER</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) &&
            data.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>{user.gender}</td>
                  <td>
                    <Link className="btn btn-success" to={`/read/${user.id}`}>
                      READ
                    </Link>
                    <Link className="btn btn-success" to={`/edit/${user.id}`}>
                      EDIT
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-danger"
                      to={`/`}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
