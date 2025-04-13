import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Student() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("facultyTable");
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [studentfiles, setStudentfiles] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeComment, setActiveComment] = useState("");
  const [enhancedComment, setEnhancedComment] = useState("");
const [loading, setLoading] = useState(false);
// const BackEnd_url = 'http://localhost:3001';
const BackEnd_url = 'https://formsusingreact-6.onrender.com';
  // Filter faculties based on the search query
  // const filteredFaculties = faculties.filter((faculty) =>
  //   faculty.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

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
        const response = await axios.get(
          BackEnd_url+"/user/student-files",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setStudentfiles(response.data); // Assuming `setFiles` is part of your state management
      } catch (err) {
        console.error("Error fetching student files:", err.message);
      }
    };

    fetchStudentFiles();
  }, []);

  // console.log(studentfiles)
  const handleGenerateText = async () => {
    setLoading(true);
    try {
      const response = await fetch(BackEnd_url+"/ai/enhance-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ comment: activeComment })
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
        const response = await axios.get(
          BackEnd_url+"/user/faculty-list"
        );
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
        BackEnd_url+"/file/upload",
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
    if (selectedFaculty === facultyId) {
      setSelectedFaculty(""); // Uncheck if already selected
    } else {
      setSelectedFaculty(facultyId); // Select the new checkbox
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex flex-col items-center p-6">
      {/* Header Section */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-lg font-semibold text-gray-700 mb-6">
          Welcome Student
        </h1>
        <div className="flex justify-between items-center mb-8">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded transition">
            Update Profile
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded transition"
            onClick={() => setActiveTab("facultyTable")}
          >
            Upload My LOR
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded transition"
            onClick={() => setActiveTab("uploadedLORs")}
          >
            Uploaded LOR's
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Upload Section */}
        {activeTab === "facultyTable" && (
          <div className="bg-blue-300 rounded-lg p-4 mb-6">
            <h2 className="text-md font-semibold text-gray-800 mb-4">
              Upload LOR
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:border-blue-500"
              />
            </div>
            <input
              type="text"
              placeholder="Enter University Name"
              value={university}
              onChange={handleUniversityChange}
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="text"
              placeholder="Enter Course Name"
              value={course}
              onChange={handleCourseChange}
              className="border border-gray-300 rounded p-2"
            />
            {/* <button
            onClick={handleUpload}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
          >
            Upload
          </button> */}
            {/* <button
  className="cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group"
  onClick={handleUpload}>
  <div class="relative overflow-hidden">
    <p
      class="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]"
    >
      Button
    </p>
    <p
      class="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]"
    >
      Button
    </p>
  </div>
</button> */}

            <button
              className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
              onClick={handleUpload}
            >
              Button
            </button>
            {uploadStatus && (
              <p className="text-sm text-red-500 mt-2">{uploadStatus}</p>
            )}
          </div>
        )}

        {/* Faculty Section */}
        {activeTab === "facultyTable" && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search faculty by name..."
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
        {activeTab === "facultyTable" && (
          <div className="bg-blue-300 rounded-lg p-4">
            <h2 className="text-md font-semibold text-gray-800 mb-4">
              Choose Faculty to View LOR
            </h2>
            <table className="table-auto w-full bg-blue-200 rounded-md shadow-lg">
              <thead>
                <tr>
                  <th className="p-2 text-left">Select</th>
                  <th className="p-2 text-left">Faculty Name</th>
                  <th className="p-2 text-left">Photo</th>
                </tr>
              </thead>
              <tbody>
                {displayedFaculties.length > 0 ? (
                  displayedFaculties.map((faculty) => (
                    <tr key={faculty._id} className="border-b border-blue-400">
                      <td className="p-2">
                        {selectedFaculty === "" ||
                        selectedFaculty === faculty._id ? (
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600"
                            checked={selectedFaculty === faculty._id}
                            onChange={() => handleCheckboxChange(faculty._id)}
                          />
                        ) : null}
                      </td>
                      <td className="p-2" value={faculty._id}>
                        {faculty.name}
                      </td>
                      <td className="p-2">
                        <img
                          src={
                            faculty.photo || "https://via.placeholder.com/50"
                          }
                          alt={`${faculty.name}'s photo`}
                          className="w-12 h-12 bg-gray-200 rounded-full"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="p-4 text-center text-gray-500 font-semibold"
                    >
                      No faculties found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Uploaded Lors */}
        {activeTab === "uploadedLORs" && (
          <div className="bg-blue-300 rounded-lg p-4">
            <h2 className="text-md font-semibold text-gray-800 mb-4">
              Choose Faculty to View LOR
            </h2>
            <table className="table-auto w-full bg-blue-200 rounded-md shadow-lg">
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

                      {/* {console.log(stufile.comment)} */}
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
                      colSpan="3"
                      className="p-4 text-center text-gray-500 font-semibold"
                    >
                      No faculties found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div
      className={`relative bg-white p-6 rounded-xl shadow-xl text-center transition-all duration-300 ease-in-out
        ${enhancedComment ? "w-[700px] min-h-[350px]" : "w-[600px] min-h-[250px]"} max-w-[90vw]`}
    >
      {/* Close Button */}
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
          <h3 className="mt-4 text-md font-semibold">Enhanced Comment</h3>
          <p className="mt-2 text-gray-800 text-sm">{enhancedComment}</p>
        </>
      )}
    </div>
  </div>
)}




          </div>
        )}
      </div>
    </div>
  );
}

export default Student;
