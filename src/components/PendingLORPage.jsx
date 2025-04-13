import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const PendingLORPage = () => {
  const { setUser } = useContext(UserContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);
  // const [selectedFile,setselectedFile] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const [fileData, setFileData] = useState([]);
  const BackEnd_url = 'http://localhost:3001';
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(BackEnd_url+'/user/faculty-files', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setFileData(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setUser(null);
    navigate('/login');
  };
  const [selectedFileIndex, setSelectedFileIndex] = useState(null);
  const handlePlusClick = (index) => {
    setSelectedFileIndex(index);
    setPopupIndex(index); // Set the index of the clicked row
    setIsPopupOpen(true); // Show the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupIndex(null);
    setComment(""); // Clear the comment field when the popup is closed
  };

  // const handleSaveComment = async () => {
  //   if (!comment.trim()) return;

  //   // setIsLoading(true);

  //   try {
  //     // Send comment to backend for AI enhancement
  //     const { data } = await axios.post("http://localhost:3001/ai/enhance-comment", {
  //       comment,
  //     });

  //     const enhancedComment = data.enhancedComment;

  //     // Save enhanced comment in database
  //     await axios.post("http://localhost:5173/ai/save-comment", {
  //       comment: enhancedComment,
  //     });

  //     alert("Comment saved successfully!");
  //     setComment(""); // Clear input
  //     handleClosePopup(); // Close popup
  //   } catch (error) {
  //     console.error("Error enhancing comment:", error);
  //   } finally {
  //     // setIsLoading(false);
  //   }
  // };
  const handleSaveComment = async () => {
    try {
      const fileId = fileData[selectedFileIndex]._id; // assuming you're tracking selected file
      await axios.post(BackEnd_url+`/comment/add-comment/${fileId}`, {
        comment,
      });
      alert("Comment saved!");
      handleClosePopup();
  
      // Optionally reload file data after saving comment
      // fetchFileData();
    } catch (err) {
      console.error("Error saving comment:", err);
      alert("Failed to save comment.");
    }
  };
  
  
  const handleDownload = (filename, facultyId) => {
    console.log(filename);
    console.log(facultyId);
    const url = BackEnd_url+`/user/download/${filename}/${facultyId}`;
    window.open(url, "_blank");
    
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-gray-300 px-6 py-4 flex justify-between items-center shadow-md">
        <div>
          <button className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-500 border border-blue-500 rounded-md">
            Pending LOR's
          </button>
        </div>
        <div>
          <button onClick={handleLogout} className="mx-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
            Logout
          </button>
          <button className="mx-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
            Profile
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="px-8 py-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="w-full border-collapse border border-gray-300 text-left text-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-300 font-bold">Student Name</th>
                <th className="px-4 py-2 border border-gray-300 font-bold">PDF</th>
                <th className="px-4 py-2 border border-gray-300 font-bold">Comments</th>
                <th className="px-4 py-2 border border-gray-300 font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {fileData.map((file, index) => (
                  <tr key={index} className="bg-gray-200">
                    <td className="px-4 py-2 border border-gray-300">
                    <div>{file.studentId.email}</div> {/* Display the email */}
    <div className="text-sm text-gray-600">University: {file.university}</div> {/* Display the university */}
    <div className="text-sm text-gray-600">Course: {file.course}</div> {/* Display the course */}
    <div className="text-sm text-gray-600">Upload time: {new Date(file.uploadedAt).toLocaleString()}</div> {/* Display the course */}
                    </td>
                    <td className="px-4 py-2 border border-gray-300"><img src="https://freesvg.org/img/pdf17.png" alt="no image" className="w-12 h-12 cursor-pointer" onClick={()=>handleDownload(file.filename,file.facultyId)}/>{file.filename}</td>
        
                    <td className="px-4 py-2 border border-gray-300 text-center">
                      <button
                        onClick={() => handlePlusClick(index)}
                        className="px-2 py-1 text-lg font-bold text-gray-700 border border-gray-400 rounded-full hover:bg-gray-300"
                      >
                        +
                      </button>
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                      <span className="text-green-500 text-lg font-bold">✔</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* Popup for Comments */}
      {isPopupOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white w-3/5 max-w-4xl p-8 rounded-lg shadow-2xl">
      <h2 className="text-2xl font-bold mb-6">Add Comment</h2>
      <textarea
        className="w-full p-4 border border-gray-300 rounded-lg mb-6 h-40"
        placeholder="Enter your comment here"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <div className="flex justify-end">
        <button
          className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg mr-4 hover:bg-gray-400"
          onClick={handleClosePopup}
        >
          Cancel
        </button>
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={handleSaveComment}
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default PendingLORPage;
