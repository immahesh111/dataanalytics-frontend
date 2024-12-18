import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "100px"
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px"

  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "120px"

  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px"
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true"
  },
]

export const fetchDepartments = async () => {
  let departments
  try {
    const response = await axios.get('https://fatp-api.onrender.com/api/department', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (response.data.success) {
      departments = response.data.departments
    }
  }
  catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error)
    }
  }
  return departments
};


export const EmployeeButtons = ({ _id }) => {

  const navigate = useNavigate()



  return (
    <div className="flex space-x-3">
      <button className="px-3 py-1 bg-custom-purple text-white"
        onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
      >View</button>

      <button className="px-3 py-1 bg-electric-blue text-white"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}
      >Edit</button>

      <button className="px-3 py-1 bg-bright-yellow text-white"
      >Salary</button>

      <button className="px-3 py-1 bg-bright-red text-white"
      onClick={() => navigate(`/admin-dashboard/employees/leaves/${_id}`)}
      >Leave</button>
    </div>
  )

}