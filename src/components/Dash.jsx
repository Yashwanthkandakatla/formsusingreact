import * as React from "react";
import { useState, useContext, useEffect } from "react";
// import Upload from "./Upload";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Dash() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Home");
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [studentfiles, setStudentfiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeComment, setActiveComment] = useState("");
  const [enhancedComment, setEnhancedComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDropdown,setShowDropdown]= useState(false);
  // const [activeTab, setActiveTab] = useState("facultyTable");
  // const BackEnd_url = "http://localhost:3001";
  const BackEnd_url = "https://formsusingreact-6.onrender.com";

  const deleteFile = async (facultyId, uploadedAt) => {
    if (!facultyId || !uploadedAt) {
      alert("Missing required inputs: facultyId, studentId, or uploadedAt");
      return;
    }
    console.log("facultyid", facultyId);
    console.log("uploadedaat", uploadedAt);
    const formattedUploadedAt = new Date(uploadedAt).toISOString();
    console.log("formaated upload", formattedUploadedAt);
    try {
      const response = await axios.delete(
        `${BackEnd_url}/user/delete-file?facultyId=${facultyId}&uploadedAt=${formattedUploadedAt}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert(response.data.message);
        // Optional: Refresh the file list or perform additional actions
      }
    } catch (error) {
      console.error(
        "Error deleting file:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message ||
          "An error occurred while deleting the file. Please try again."
      );
    }
  };

  const displayedFaculties = searchQuery
    ? faculties.filter((faculty) =>
        faculty.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faculties;
  const handleUniversityChange = (e) => {
    setUniversity(e.target.value);
  };
  const handleCourseChange = (e) => {
    setCourse(e.target.value);
  };

  useEffect(() => {
    const fetchStudentFiles = async () => {
      try {
        const response = await axios.get(BackEnd_url + "/user/student-files", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setStudentfiles(response.data); // Assuming `setFiles` is part of your state management
      } catch (err) {
        console.error("Error fetching student files:", err.message);
      }
    };

    fetchStudentFiles();
  }, []);
  console.log(studentfiles);
  // console.log(studentfiles)
  const handleGenerateText = async () => {
    setLoading(true);
    try {
      const response = await fetch(BackEnd_url + "/ai/enhance-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: activeComment }),
      });

      const data = await response.json();
      setEnhancedComment(data.enhancedComment || "No enhancement received");
    } catch (error) {
      console.error("Error enhancing comment:", error);
      setEnhancedComment("Error enhancing comment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch list of faculties
    const fetchFaculties = async () => {
      try {
        const response = await axios.get(BackEnd_url + "/user/faculty-list");
        // console.log('Response Type:', response.headers['content-type']);
        // console.log('Faculties:', response);

        if (Array.isArray(response.data)) {
          setFaculties(response.data); // Set faculties as an array
        } else {
          console.error("Response is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    fetchFaculties();
  }, []);

  useEffect(() => {
    // console.log(faculties); // This will run when faculties state is updated
  }, [faculties]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setUser(null);
    navigate("/login");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !selectedFaculty || !university || !course) {
      setUploadStatus("Please select a file and faculty before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("facultyId", selectedFaculty);
    formData.append("university", university);
    formData.append("course", course);
    // console.log(selectedFaculty)
    // console.log('File:', file);
    // console.log(university);
    // console.log(course);
    // // console.log(localStorage.getItem('authToken'));

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await axios.post(
        BackEnd_url + "/file/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Failed to upload file. Please try again.");
    }
  };
  const handleCheckboxChange = (facultyId) => {
    // Toggle the checkbox
    // if (selectedFaculty === facultyId) {
    //   setSelectedFaculty(""); // Uncheck if already selected
    // } else {
    //   setSelectedFaculty(facultyId); // Select the new checkbox
    // }
    setSelectedFaculty(facultyId.target.value);
  };

  return (
    <div className="flex overflow-hidden flex-col px-12 py-16 bg-red-100 max-md:px-5">
      <div className="flex flex-wrap gap-5 justify-between px-12 py-2 w-full font-medium rounded-[50px] text-neutral-700 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-6 items-center text-2xl max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a83fc3426e716d5aa0a16352cb62c1511d2e47a8?placeholderIfAbsent=true&apiKey=a171ae09608a40d09028d1fe980e584d"
            className="object-contain shrink-0 self-stretch aspect-[0.75] w-[61px]"
          />
          <div className="self-start mt-3 text-4xl font-bold basis-auto">
            GRO@VNRVJIET
          </div>
          <button
            onClick={() => setActiveTab("Home")}
            className="self-stretch my-auto"
          >
            home
          </button>
          <button
            onClick={openModal}
            className="self-stretch my-auto basis-auto"
          >
            upload an LOR
          </button>
          <button
            onClick={() => setActiveTab("Mylor")}
            className="self-stretch my-auto basis-auto"
          >
            my LORs
          </button>
        </div>
        <div className="relative">
          <div
            className="flex gap-5 my-auto text-3xl cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/666d26fa729e2907c1dc78d8693baeef37928e8c?placeholderIfAbsent=true&apiKey=a171ae09608a40d09028d1fe980e584d"
              className="object-contain shrink-0 w-14 aspect-square"
            />
            <div className="flex-auto self-start">Yashwanth Kandakatla</div>
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      {activeTab == "Home" && (
        <div className="mt-14 ml-4 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow mt-3.5 max-md:mt-10 max-md:max-w-full">
                <div className="self-start text-6xl font-bold text-neutral-700 max-md:max-w-full max-md:text-4xl">
                  Welcome, Yashwanth!
                </div>
                <div className="flex overflow-hidden flex-col px-7 pt-16 pb-60 mt-14 bg-red-300 rounded-[50px] max-md:px-5 max-md:pb-24 max-md:mt-10 max-md:max-w-full">
                  <div className="self-start text-4xl font-bold underline text-neutral-700">
                    Notifications
                  </div>
                  <div className="flex flex-col px-7 py-2.5 mt-10 w-full shadow-sm bg-zinc-300 rounded-[30px] max-md:px-5 max-md:max-w-full">
                    <div className="flex flex-wrap gap-10 text-black max-md:mr-1.5">
                      <div className="flex-auto text-2xl font-bold tracking-wider underline max-md:max-w-full">
                        LOR - HCI in University of California Ber...
                      </div>
                      <div className="grow shrink text-xl w-[109px]">
                        Today, 3:15pm
                      </div>
                    </div>
                    <div className="self-start mt-3 text-2xl font-bold text-black max-md:max-w-full">
                      Mrs. Sayeeda{" "}
                      <span className="">dropped you a comment:</span>
                    </div>
                    <div className="flex flex-wrap gap-7 px-4 pt-px pb-2 mt-3 text-xl rounded-3xl bg-stone-50">
                      <div className="flex-auto text-black w-[551px] max-md:max-w-full">
                        “You can made edits in paragraph 2 about your previous
                        acad...”
                      </div>
                      <div className="grow shrink font-bold text-blue-600 underline w-[90px]">
                        Read More
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col px-7 py-2.5 mt-6 w-full text-black shadow-sm bg-zinc-300 rounded-[30px] max-md:px-5 max-md:max-w-full">
                    <div className="flex flex-wrap gap-7 max-md:mr-1.5">
                      <div className="flex-auto text-2xl font-bold tracking-wider underline w-[488px] max-md:max-w-full">
                        LOR - HCID in University of Maryland...
                      </div>
                      <div className="grow shrink text-xl w-[150px]">
                        Yesterday, 12:46pm
                      </div>
                    </div>
                    <div className="self-start mt-3 text-2xl font-bold max-md:max-w-full">
                      Mr. Gnana Vardhan{" "}
                      <span className="">dropped you a comment:</span>
                    </div>
                    <div className="px-4 pt-px pb-2 mt-3 text-xl rounded-3xl bg-stone-50 max-md:pr-5 max-md:max-w-full">
                      “All good, just correct my designation”
                    </div>
                  </div>
                  <div className="self-center mt-9 mb-0 text-2xl font-bold text-blue-600 underline max-md:mb-2.5">
                    Load older notifications
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex overflow-hidden flex-col px-7 pt-12 pb-20 mx-auto w-full bg-red-100 rounded-[50px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
                <div className="flex flex-wrap gap-10 max-w-full font-bold w-[742px]">
                  <div className="flex-auto self-start text-4xl underline text-neutral-700 w-[378px] max-md:max-w-full">
                    My LORs at a glance
                  </div>
                  <button onClick={openModal}>
                    <div className="flex gap-4 items-start px-5 py-3.5 text-3xl text-black whitespace-nowrap bg-red-500 rounded-3xl max-md:pl-5">
                      <div className="grow">+Upload</div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ecba432b8d4c55dead58ac35ab048499eb6af84?placeholderIfAbsent=true&apiKey=a171ae09608a40d09028d1fe980e584d"
                        className="object-contain shrink-0 aspect-square w-[38px]"
                      />
                    </div>
                  </button>
                </div>
                {/* <div className="flex flex-col px-7 pt-4 pb-8 mt-6 w-full text-black bg-red-300 shadow-sm rounded-[30px] max-md:px-5 max-md:max-w-full">
                <div className="flex flex-wrap gap-7 max-md:mr-1">
                  <div className="flex-auto my-auto text-2xl font-bold tracking-wider underline max-md:max-w-full">
                    Dr Sagar Yeruva - HCI in University of Ca...
                  </div>
                  <div className="flex flex-col">
                    <div className="self-end text-base font-bold">
                      last edited
                    </div>
                    <div className="mt-2 text-xl">Today, 3:01pm</div>
                  </div>
                </div>
                <div className="px-4 pt-2 pb-4 mt-4 text-xl rounded-3xl bg-stone-50 max-md:pr-5 max-md:max-w-full">
                  Dear Sir
                  <br />
                  Yashwanth Kandakatla is an excellent student who has worked
                  under my
                  <br />
                  presence. As his professor in Operating Systems and Software
                  Engineering, I have seen him do immense work regarding
                  projects and course-related work. His commitment to the craft
                  was unmatched for, an took part in many hackathons and
                  seminars. He also wrote a research paper under my guidance for
                  the paper titled “Prediction-based system for aquaculture
                  org...
                </div>
              </div>
              <div className="flex flex-col px-7 pt-4 pb-7 mt-5 w-full text-black bg-red-300 shadow-sm rounded-[30px] max-md:px-5 max-md:max-w-full">
                <div className="flex flex-wrap gap-2.5 max-md:mr-1">
                  <div className="flex-auto my-auto text-2xl font-bold tracking-wider underline w-[505px] max-md:max-w-full">
                    Mrs. Sayeeda - HCI in University of Cal...
                  </div>
                  <div className="flex flex-col">
                    <div className="self-end text-base font-bold">
                      last edited
                    </div>
                    <div className="mt-2 text-xl max-md:mr-1.5">
                      Yesterday, 10:16pm
                    </div>
                  </div>
                </div>
                <div className="px-4 pt-2 pb-5 mt-4 text-xl rounded-3xl bg-stone-50 max-md:pr-5 max-md:max-w-full">
                  Dear Sir
                  <br />
                  Yashwanth Kandakatla is an excellent student who has worked
                  under my
                  <br />
                  presence. As her professor in Operating Systems and Softwa...
                </div>
              </div> */}
                {/* Using for loop */}
                <div>
                  {studentfiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex flex-col px-7 pt-4 pb-8 mt-6 w-full text-black bg-red-300 shadow-sm rounded-[30px] max-md:px-5 max-md:max-w-full"
                    >
                      <div className="flex flex-wrap gap-7 max-md:mr-1">
                        <div className="flex-auto my-auto text-2xl font-bold tracking-wider underline max-md:max-w-full">
                          {file.course} in {file.university}
                        </div>
                        <div className="flex flex-col">
                          <div className="self-end text-base font-bold">
                            last edited
                          </div>
                          <div className="mt-2 text-xl">{file.uploadedAt}</div>
                        </div>
                      </div>
                      <div className="px-4 pt-2 pb-4 mt-4 text-xl rounded-3xl bg-stone-50 max-md:pr-5 max-md:max-w-full">
                        {file.comment && file.comment.trim() !== ""
                          ? file.comment
                          : "No comments yet"}
                      </div>
                    </div>
                  ))}
                  <div className="self-center mt-7 text-2xl font-bold text-blue-600 underline">
                    View all
                  </div>
                </div>
                <div className="self-center mt-7 text-2xl font-bold text-blue-600 underline">
                  View all
                </div>
              </div>
              <div>
                {/* <Upload isOpen={isModalOpen} closeModal={closepop}/> */}
                {isModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-red-100 bg-opacity-75 p-4">
                    {/* Your original popup content starts here */}
                    <section className="relative flex overflow-hidden flex-col px-14 pt-7 pb-12 border border-solid bg-stone-50 border-neutral-400 max-w-[851px] w-full rounded-[50px] max-md:px-5">
                      {/* Close Button - position: absolute works relative to the nearest positioned ancestor ('relative' on section) */}
                      <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-200 hover:bg-neutral-300 transition-colors"
                        aria-label="Close popup"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L13 13M1 13L13 1"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>

                      <h1 className="self-center text-4xl font-bold underline text-neutral-700">
                        Upload an LOR
                      </h1>

                      {/* Attach Button */}
                      <button className="flex flex-col justify-center items-center px-16 py-3.5 mt-9 w-full text-2xl font-bold text-center bg-red-500 rounded-2xl text-stone-50 hover:bg-red-600 transition-colors max-md:px-5 max-md:max-w-full">
                        {/* ... (rest of the button content) ... */}
                        <div className="flex gap-2.5 max-w-full w-[412px]">
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8bacbabef44938c0493f44f6cd6bebaff331b2d?placeholderIfAbsent=true&apiKey=a171ae09608a40d09028d1fe980e584d"
                            alt=""
                            className="object-contain shrink-0 aspect-square w-[33px]"
                          />
                          <input
                            type="file"
                            name="file"
                            onChange={handleFileChange}
                          />
                          <span className="flex-auto w-[362px]"></span>
                        </div>
                      </button>

                      <p className="self-center mt-2 text-xl text-center text-black max-md:max-w-full">
                        your LOR can either be a completed letter, or can
                        include information that you want the faculty to use to
                        get your LOR written.{" "}
                      </p>

                      {/* University Name Input */}
                      <div className="mt-7">
                        {/* ... (rest of the input) ... */}
                        <label className="block text-2xl font-bold text-black max-md:max-w-full">
                          University name{" "}
                          <span className="font-normal">
                            (that you're applying to)
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter University Name"
                          value={university}
                          onChange={handleUniversityChange}
                          className="flex w-full shrink-0 mt-4 rounded-lg border border-black border-solid bg-stone-50 h-[41px] max-md:max-w-full"
                        />
                      </div>

                      {/* Course Name Input */}
                      <div className="mt-5">
                        {/* ... (rest of the input) ... */}
                        <label className="block text-2xl font-bold text-black max-md:max-w-full">
                          Course name{" "}
                          <span className="font-normal">
                            (mention both long and short names)
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Course Name"
                          value={course}
                          onChange={handleCourseChange}
                          className="flex w-full shrink-0 mt-5 rounded-lg border border-black border-solid bg-stone-50 h-[41px] max-md:max-w-full"
                        />
                      </div>

                      {/* Faculty and Urgent Row */}
                      <div className="mt-3 max-md:mr-1.5 max-md:max-w-full">
                        {/* ... (rest of the row) ... */}
                        <div className="flex gap-5 max-md:flex-col">
                          <div className="w-6/12 max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col mt-2 text-black max-md:mt-10">
                              <label className="self-start text-2xl font-bold">
                                Choose Faculty
                              </label>
                              <select
                                id="facultySelect"
                                value={selectedFaculty}
                                onChange={handleCheckboxChange}
                                className="px-3.5 pt-2.5 pb-1 mt-5 text-xl whitespace-nowrap rounded-lg border border-black border-solid bg-stone-50 max-md:pr-5"
                              >
                                <option
                                  value=""
                                  disabled={selectedFaculty !== ""}
                                >
                                  {" "}
                                  {/* Optionally disable if something is selected */}
                                  Select Faculty
                                </option>

                                {/* Map over your faculties array to create options */}
                                {displayedFaculties.length > 0 ? (
                                  displayedFaculties.map((faculty) => (
                                    <option
                                      key={faculty._id}
                                      value={faculty._id}
                                    >
                                      {
                                        faculty.name /* Display the faculty's name - Adjust 'name' if your property is different */
                                      }
                                    </option>
                                  ))
                                ) : (
                                  <option value="" disabled>
                                    No faculties available
                                  </option> // Optional: Message if array is empty
                                )}
                                {/* Add more faculty options here */}
                              </select>
                            </div>
                          </div>
                          <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col w-full text-black max-md:mt-8">
                              <div className="flex gap-6 items-center self-start">
                                <label className="self-stretch my-auto text-2xl font-bold">
                                  Urgent?
                                </label>
                                <input
                                  type="checkbox"
                                  className="flex shrink-0 self-stretch my-auto rounded-xl border border-black border-solid bg-zinc-300 h-[25px] w-[25px]"
                                />
                                <span className="text-xl text-center">
                                  DO NOT MISUSE THIS FEATURE.
                                </span>
                              </div>
                              <p className="mt-4 text-xl text-center">
                                in genuine cases, faculty will prioritise
                                working on your deadline-based LORs{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        onClick={handleUpload}
                        className="self-center px-16 pt-4 pb-7 mt-4 max-w-full text-2xl font-bold text-center bg-red-400 rounded-2xl text-stone-50 w-[412px] hover:bg-red-500 transition-colors max-md:px-5"
                      >
                        Submit LOR
                      </button>
                      {uploadStatus && (
                        <p className="text-sm text-red-500 mt-2">
                          {uploadStatus}
                        </p>
                      )}
                    </section>
                    {/* End of your original popup content */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === "Mylor" && (
        <div className="bg-red-300 rounded-lg p-4">
          <h2 className="text-md font-semibold text-gray-800 mb-4">
            Choose Faculty to View LOR
          </h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-red-100 rounded-md shadow-lg">
              <thead>
                <tr>
                  <th className="p-2 text-left">Filename</th>
                  <th className="p-2 text-left">University</th>
                  <th className="p-2 text-left">Course</th>
                  <th className="p-2 text-left">uploaded at</th>
                  <th className="p-2 text-left">Comment</th>
                  <th className="p-2 text-left">Delete</th>
                </tr>
              </thead>
              <tbody>
                {studentfiles.length > 0 ? (
                  studentfiles.map((stufile) => (
                    <tr key={stufile._id} className="border-b border-blue-400">
                      <td className="p-2">{stufile.filename}</td>
                      <td className="p-2">{stufile.university}</td>
                      <td className="p-2">{stufile.course}</td>
                      <td className="p-2">
                        {new Date(stufile.uploadedAt).toLocaleString()}
                      </td>
                      <td className="p-2 text-center">
                        {stufile.comment ? (
                          <button
                            onClick={() => {
                              setActiveComment(stufile.comment);
                              setShowModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                            title="View Comment"
                          >
                            📝
                          </button>
                        ) : (
                          "No comment yet"
                        )}
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() =>
                            deleteFile(stufile.facultyId, stufile.uploadedAt)
                          }
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-4 text-center text-gray-500 font-semibold"
                    >
                      No faculties found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
              <div
                className={`relative bg-white p-6 rounded-xl shadow-xl text-center transition-all duration-300 ease-in-out
                  ${
                    enhancedComment
                      ? "w-[700px] min-h-[350px]"
                      : "w-[600px] min-h-[250px]"
                  } max-w-[90vw]`}
              >
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEnhancedComment("");
                  }}
                  className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
                >
                  &times;
                </button>

                <h2 className="text-lg font-semibold mb-4">Original Comment</h2>
                <p className="mb-4 text-sm text-gray-700">{activeComment}</p>

                <button
                  onClick={handleGenerateText}
                  disabled={loading}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  {loading ? "Generating..." : "Generate Text"}
                </button>

                {enhancedComment && (
                  <>
                    <h3 className="mt-4 text-md font-semibold">
                      Enhanced Comment
                    </h3>
                    <p className="mt-2 text-gray-800 text-sm">
                      {enhancedComment}
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dash;
