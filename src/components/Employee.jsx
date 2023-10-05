import React from 'react'

const Employee = (props) => {
  return (
    <tr key={props.emp.id}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        {props.emp.firstName}
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        {props.emp.lastName}
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        {props.emp.emailId}
      </td>
      <td className="text-right px-6 py-4 whitespace-nowrap">
        <a  onClick ={(e) => props.onUpdate(e, props.emp.id)} className="text-indigo-600 hover:text-indigo-800 px-4 cursor-pointer">
          Edit
        </a>
        <a onClick={(e) => {props.onDelete(e, props.emp.id)}} className="text-red-600
         hover:text-red-800 px-4 cursor-pointer">
          Delete
        </a>


      </td>
    </tr>
  );
}

export default Employee