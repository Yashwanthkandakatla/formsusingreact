import React,{useState} from "react";
import Piechart from "./Piechart";
import Barchart from "./Barchart";
import Navbar from "./Navbar";
import AddFaculty from "./AddFaculty";
import Addstudent from "./Addstudent";

function Admin() {
  const [activeComponent, setActiveComponent] = useState("Piechart");
  const renderComponent = () => {
    switch (activeComponent) {
      case "Piechart":
        return (
          <div>
            <Piechart />
            <Barchart />
          </div>
        );

      case "Addstudent":
        return <Addstudent />;
    case "AddFaculty":
        return <AddFaculty/>
      default:
        return <Piechart />;
    }
  }
  return (
    <div className="h-screen flex flex-col">
    {/* Navbar */}
    <Navbar setActiveComponent={setActiveComponent} />

    {/* Render the selected component */}
    <div className="flex-1 p-4 overflow-auto">{renderComponent()}</div>
  </div>
  );
}

export default Admin;
