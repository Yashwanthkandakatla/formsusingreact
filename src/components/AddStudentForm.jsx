import React from 'react';

const AddStudentForm = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-blue-100 flex flex-col">
      {/* Navbar */}
      <div className="bg-pink-100  top-0 left-0 w-full flex justify-center py-3 shadow-md">
        <button className="mx-2 px-4 py-2 bg-pink-300 hover:bg-pink-400 text-white rounded-lg">
          Add Student
        </button>
        <button className="mx-2 px-4 py-2 bg-pink-300 hover:bg-pink-400 text-white rounded-lg">
          Add Faculty
        </button>
        <button className="mx-2 px-4 py-2 bg-pink-300 hover:bg-pink-400 text-white rounded-lg">
          Pending LOR's
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center mt-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <form className="px-8 py-6">
              <h2 className="text-center text-xl font-semibold text-gray-700 mb-6">Add Student</h2>
              <div className="mb-4">
                <label className="block text-gray-600 font-medium mb-2">Roll No</label>
                <input
                  type="text"
                  placeholder="Enter Roll No"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 font-medium mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Role</label>
                <input
                  type="text"
                  placeholder="Enter Role"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudentForm;
