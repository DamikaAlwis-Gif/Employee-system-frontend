import React from 'react'
import { useState } from 'react'; 

import employeeService from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import userValidation from '../validations/userValidation';

function AddEmployee() {
  const [employee, setEmployee] = useState({
    id: "",
    firstName: "",
    lastName: "",
    emailId: "",
  });
  const [errors, setErrors] = useState({});// errors is an object 
  const navigate =useNavigate();
// e refers to input field
  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({ ...employee, [e.target.name]: value });
  };
  const saveEmployee = (e) =>{
    e.preventDefault(); // prevent refershing
    // abortEarly: false will collect all validation errors rather than stopping after the first one
    userValidation
      .validate(employee, { abortEarly: false })
      .then((validUser) => { // formValid is the value we get after validation
        
         employeeService
          .saveEmployee(validUser)
          .then((response) => {
            //console.log(response);
            alert("Employee added successfully")
            navigate("/employeeList");
          })
          .catch((error) => {
            console.log(error);
            
          });

      })
      .catch((errors) => {// error is the value we get after validation
       
        const newErrors = {};
        //console.log(errors);
        // errors.inner is an array of all the errors
        errors.inner.forEach((error) => {
          // error.path is the field name
          // error.message is the error message
          newErrors[error.path] = error.message;
         
        });
        setErrors(newErrors);
        
      });
    
  };
  const clearForm = (e) =>{
    e.preventDefault();
    setEmployee({
      id: "",
      firstName: "",
      lastName: "",
      emailId: ""
    });

  }
  // by doing  value={employee.firstName } that value display in the input field
  // e.target.value and value in input field is same value referes to the value ente by user
  return (
    <div className="flex max-w-md mx-auto items-center justify-center shadow border-b my-8">
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>Add new Employee</h1>
        </div>

        <div className="items-center justify-center h-14 my-4">
          <label className="block text-gray-600 text-sm font-normal">
            First Name
          </label>

          <input
            type="text"
            name="firstName"
            value={employee.firstName}
            onChange={(e) => handleChange(e)}
            className="h-10 w-full border mt-2 px-2 py-2"
          ></input>
        </div>
        {errors.firstName && (
          <div class=" items-center justify-center h-10  border border-t-0 w-full border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>{errors.firstName}</p>
          </div>
        )}

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        {errors.lastName && (
          <div class=" items-center justify-center h-10  border border-t-0 w-full border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>{errors.lastName}</p>
          </div>
        )}

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Email
          </label>
          <input
            type="text"
            name="emailId"
            value={employee.emailId}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        {errors.emailId && (
          <div class=" items-center justify-center h-10  border border-t-0 w-full border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>{errors.emailId}</p>
          </div>
        )}

        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            className="rounded text-white font-semibold bg-green-400
          hover:bg-green-700 py-3 px-6"
            onClick={saveEmployee}
          >
            Save
          </button>

          <button
            className="rounded text-white font-semibold bg-red-400
          hover:bg-red-700 py-3 px-6"
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee