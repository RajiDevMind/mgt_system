import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/get_user/${id}`)
      .then((resp) => {
        setData(resp.data);
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="container-fluid bg-primary vh-100 vw-100">
      <h1>User I.D: {id}</h1>
      <Link to="/" className="btn btn-success">
        BACK
      </Link>
      {data.map((user) => {
        return (
          <ul className="list-group">
            <li className="list-group-item">
              <b>ID: </b>
              {user["id"]}
            </li>
            <li className="list-group-item">
              <b>NAME: </b>
              {user["name"]}
            </li>
            <li className="list-group-item">
              <b>EMAIL: </b>
              {user["email"]}
            </li>
            <li className="list-group-item">
              <b>AGE: </b>
              {user["age"]}
            </li>
            <li className="list-group-item">
              <b>GENDER: </b>
              {user["gender"]}
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default Read;
