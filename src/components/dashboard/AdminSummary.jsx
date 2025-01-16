import React, { useEffect, useState } from 'react'
import SummaryCard from './SummaryCard'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa'
import axios from 'axios'

const AdminSummary = () => {
  const [summary, setSummary] = useState(null)
  useEffect(() => {
    const fetchSummary = async () => {
      try{
        const summary = await axios.get('https://dataanalytics-api.onrender.com/api/dashboard/summary', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(summary)
        setSummary(summary.data)
      }catch(error){
       if(error.response){
        alert(error.response.data.error)
       }
       console.log(error.message)
      }
    }
    fetchSummary()

  },[])

  if(!summary) {
    return <div>Loading...</div>
  }

  return (
    <div className='p-6'>
      <h3 className='text-2xl font-bold'>Dashboard Overview</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        <SummaryCard icon={<FaUsers />} text="Total Checksheets" number={summary.totalEmployees} color="bg-custom-purple" />
        <SummaryCard icon={<FaBuilding />} text="Total Departments" number={summary.totalDepartments} color="bg-bright-yellow" />
{       /* <SummaryCard icon={<FaMoneyBillWave />} text="Monthly Salary" number="$654" color="bg-red-600" />
*/}      </div>

      <div className='mt-12'>
        <h4 className='text-center text-2xl font-bold'>CheckSheet Details</h4>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <SummaryCard icon={<FaFileAlt />} text="CheckSheet Applied" number={summary.leaveSummary.appliedFor} color="bg-custom-purple" />
          <SummaryCard icon={<FaCheckCircle />} text="CheckSheet Approved" number={summary.leaveSummary.approved} color="bg-neon-green" />
          <SummaryCard icon={<FaHourglassHalf />} text="CheckSheet Pending" number={summary.leaveSummary.pending} color="bg-bright-yellow" />
          <SummaryCard icon={<FaTimesCircle />} text="CheckSheet Rejected" number={summary.leaveSummary.rejected} color="bg-bright-red" />
          

        </div>
      </div>

    </div>
  )
}

export default AdminSummary