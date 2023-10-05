import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import employeeService from "../services/EmployeeService";
import Employee from "./Employee";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [employees, setEmployees] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      //employeeService.getEmployees() call. This means that the code execution will pause at this point
      //and wait for the getEmployees() function to resolve (i.e., fetch the employee data).
      //Once the promise is resolved, the result will be assigned to the response variable.
      try {
        const response = await employeeService.getEmployees();
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    };
    fetchData();
  }, []); // fetching data only occur when mounting process

  const handleDelete = (e, id) => {
    e.preventDefault();
    employeeService.deleteEmployee(id).then((res) => {
      if (employees) {
        // when the logic pass (return true) it aooend that item to the list
        // setEmployees method eke eka vidiyak tamai meka (prev) => return newElement
        // emp=> emp.id !== id mehema gahnnath puluvan eken kyanne emp.id !== id mekata ena(thani expression ekak tyena kota agata ; danna epa)
        // agaya retrun karanava kyana eka tamai but meheam use karoth {} return karanna venava agayak
        setEmployees((prevElement) => {
          return prevElement.filter((emp) => {
            return emp.id !== id;
          });
        });
      }
    });
  };
  const hanleUpdate = (e, id) => {
    e.preventDefault();
    navigate("/updateEmployee/" + id);
  }

  return (
    <div className="container mx-auto my-8">
      <div className="h-12">
        <button
          onClick={() => navigate("/addEmployee")}
          className="rounded bg-slate-600 text-white px-6 py-2 hover:bg-slate-800"
        >
          Add Employee
        </button>
        {employees && employees.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <h1 className="text-3xl text-gray-600">No Employees Found</h1>
          </div>
        ) : (
          <div className="flex shadow border-b my-4">
            <table className="min-w-full ">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left font-medium text-gray-600 uppercase translate-wider py-3 px-6 ">
                    First Name
                  </th>
                  <th className="text-left font-medium text-gray-600 uppercase translate-wider py-3 px-6 ">
                    Last Name
                  </th>
                  <th className="text-left font-medium text-gray-600 uppercase translate-wider py-3 px-6 ">
                    Email ID
                  </th>
                  <th className="text-right font-medium text-gray-600 uppercase translate-wider py-3 px-6 ">
                    Actions
                  </th>
                </tr>
              </thead>
              {!loading && (
                <tbody>
                  {employees.map((emp) => (
                    <Employee
                      emp={emp}
                      onDelete={handleDelete}
                      onUpdate={hanleUpdate}
                      key={emp.id}
                    ></Employee>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
