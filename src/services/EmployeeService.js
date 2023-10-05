import axios from "axios";

const EMPLOYEE_API_BASE_URL ="http://localhost:8080/api/v1/employees";
class EmployeeService {
    saveEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL, employee); 
    }
    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    } 
    deleteEmployee(id){
        return axios.delete(EMPLOYEE_API_BASE_URL + "/" + id);
         
    }
    getEmployee(id){
        return axios.get(EMPLOYEE_API_BASE_URL + "/" + id);
    }

    putEmployee(id,employee){
        return axios.put(EMPLOYEE_API_BASE_URL + "/" + id, employee);
    }
   


}
const employeeService = new EmployeeService();
export default employeeService;