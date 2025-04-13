import React from "react";
import { useState } from "react";
import axios from "axios";
function Survey() {
  const [name, setName] = useState("");
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    gender: "",
    subject: "",
  });

  const handlechange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
const BackEnd_url = "http://localhost:3001";
  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post(BackEnd_url+"/survey/submit", {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    console.log(values);
  };
  const [data, setData] = useState([]);
  const getdata = (e) => {
    axios
      .get(BackEnd_url+"/survey/getusers")
      .then((data) => setData(user.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-lg ">
      <p>Hi this is the survey components</p>
      <form
        action="POST"
        // style={{ background: "rgba(191, 212, 234, 0.8)" }}
        className="rounded p-9 md:p-10 md:mx-28 hover:shadow-2xl"
      >
        <div className="form-group ">
          <label
            className="text-base sm:text-lg md:text-xl mb-2 "
            htmlFor="firstname"
          >
            FirstName
          </label>
          <input
            type="text"
            name="firstname"
            className="w-full h-10 px-3 mb-4 sm:mb-5 md:mt-2 py-1.5 text-gray-700   rounded-xl"
            placeholder="Enter your firstname"
            id=""
            onChange={(e) => handlechange(e)}
          />
        </div>

        <div className="form-group">
          <label
            className="text-base sm:text-lg md:text-xl mb-2"
            htmlFor="lastname"
          >
            lastname
          </label>
          <input
            type="text"
            name="lastname"
            placeholder="Enter your lastname"
            className="w-full h-10 px-3 mb-4 sm:mb-5 md:mt-2 py-1.5 text-gray-700  rounded-xl"
            id=""
            onChange={(e) => handlechange(e)}
          />
        </div>

        <div className="form-group">
          <label
            className="text-base sm:text-lg md:text-xl mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            className="w-full h-10 px-3 mb-4 sm:mb-5 md:mt-2 py-1.5 text-gray-700  rounded-xl"
            id=""
            onChange={(e) => handlechange(e)}
          />
        </div>

        <div className="form-group">
          <label
            className="text-base sm:text-lg md:text-xl mb-2"
            htmlFor="contact"
          >
            Contact No
          </label>
          <input
            type="text"
            name="contact"
            placeholder="Enter your Contact Number"
            className="w-full h-10 px-3 mb-4 sm:mb-5 md:mt-2 py-1.5 text-gray-700  rounded-xl"
            id=""
            onChange={(e) => handlechange(e)}
          />
        </div>

        {/* <br /> */}

        {/* <br /> */}

        <div className="form-group">
          <label
            className="text-base sm:text-lg md:text-xl mb-2"
            htmlFor="gender"
          >
            Gender
          </label>
          <div className="py-1"></div>
          <input
            type="radio"
            name="gender"
            id=""
            // className="list-disc"
            onChange={(e) => handlechange(e)}
          />{" "}
          Male
          <input
            type="radio"
            name="gender"
            id=""
            // className="list-disc"
            onChange={(e) => handlechange(e)}
          />{" "}
          Female
          <input
            type="radio"
            name="gender"
            id=""
            onChange={(e) => handlechange(e)}
          />{" "}
          Other
        </div>
        <div className="form-group py-2 my-2">
          <label
            className="text-base sm:text-lg md:text-xl mb-2"
            htmlFor="subject"
          >
            Subject
          </label>
          <select
            name="subject"
            id="subject"
            className="w-full h-10 px-3 py-1.5 md:mt-2 mb-4 sm:mb-5 text-gray-700 outline rounded-xl"
          >
            <option value="Math">Math</option>
            <option value="Pyhsics">Physics</option>
            <option value="Chemistry">Chemistry</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="submit"
            onClick={handlesubmit}
            style={{ backgroundColor: "#37af65" }}
            className="w-full p-3 mb-6 rounded-sm cursor-pointer border-0"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Survey;
