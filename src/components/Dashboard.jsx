import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-pink-50 font-sans">
      {/* Header */}
      <header className="bg-orange-200 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src="/path-to-logo" // Replace with actual logo
            alt="Logo"
            className="h-10"
          />
          <h1 className="text-lg font-bold">GRO@VNRVJIET</h1>
        </div>
        <nav className="flex items-center space-x-6">
          <a href="#" className="text-sm font-medium text-gray-700 hover:underline">
            Home
          </a>
          <a href="#" className="text-sm font-medium text-gray-700 hover:underline">
            Upload an LOR
          </a>
          <a href="#" className="text-sm font-medium text-gray-700 hover:underline">
            My LORs
          </a>
        </nav>
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          <span className="text-sm font-medium">Yashwanth Kandaklatla</span>
        </div>
      </header>

      <main className="p-6">
        {/* Welcome Section */}
        <h2 className="text-2xl font-bold mb-4">Welcome, Yashwanth!</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notifications Section */}
          <div className="col-span-1">
            <div className="bg-white shadow-md rounded-xl p-4">
              <h3 className="text-lg font-bold mb-4">Notifications</h3>
              <div className="space-y-4">
                {/* Notification 1 */}
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-medium text-sm">LOR - HCI in University of California Berkeley</p>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold">Mrs. Sayeeda</span> dropped you a comment:
                  </p>
                  <blockquote className="text-gray-500 italic text-sm">
                    "You can make edits in paragraph 2 about your previous acad..."
                  </blockquote>
                  <button className="text-blue-600 text-sm hover:underline">Read More</button>
                </div>

                {/* Notification 2 */}
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-medium text-sm">LOR - HCID in University of Maryland</p>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold">Mr. Gnana Vardhan</span> dropped you a comment:
                  </p>
                  <blockquote className="text-gray-500 italic text-sm">
                    "All good, just correct my designation"
                  </blockquote>
                </div>
              </div>
              <button className="mt-4 text-blue-600 text-sm hover:underline">Load older notifications</button>
            </div>
          </div>

          {/* My LORs Section */}
          <div className="col-span-2">
            <div className="bg-white shadow-md rounded-xl p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">My LORs at a glance</h3>
                <button className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600">
                  +Upload
                </button>
              </div>

              <div className="space-y-4 mt-4">
                {/* LOR 1 */}
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-bold text-sm">Dr Sagar Yeruva - HCI in University of Ca...</p>
                  <p className="text-sm text-gray-600">
                    Dear Sir, Yashwanth Kandaklatla is an excellent student who...
                  </p>
                  <button className="text-blue-600 text-sm hover:underline">View More</button>
                </div>

                {/* LOR 2 */}
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-bold text-sm">Mrs. Sayeeda - HCI in University of Ca...</p>
                  <p className="text-sm text-gray-600">
                    Dear Sir, Yashwanth Kandaklatla is an excellent student who...
                  </p>
                  <button className="text-blue-600 text-sm hover:underline">View More</button>
                </div>
              </div>

              <button className="mt-4 text-blue-600 text-sm hover:underline">View all</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
