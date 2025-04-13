import React from "react";
import { useState } from "react";
import axios from "axios";
function Getdata() {
  const [users, setUsers] = useState([]);
  const BackEnd_url = "http://localhost:3001";
  const getdata = (e) => {
    axios
      .get(BackEnd_url+"/survey/getusers")
      .then((users) => {
        setUsers(users.data);
        console.log(users.data);
      })
      .catch((err) => console.log(err));
    //   console.log(users)
  };
  return (
    <div>
      <button onClick={getdata}>Get Data</button>
      {users.map((user) => (
        <p>{user.firstname}</p>
      ))}
    </div>
  );
}

export default Getdata;
