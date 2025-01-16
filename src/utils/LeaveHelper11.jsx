import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js"

import { base64Image } from "../assets/base64image";

// Function to format the date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns date in YYYY-MM-DD format
};

// Function to format the time
const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toTimeString().split(' ')[0]; // Returns time in HH:MM:SS format
};

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "40px",
    },
    {
        name: "Emp Id",
        selector: (row) => row.employeeId,
        width: "100px",
    },
    {
        name: "Name",
        selector: (row) => row.name,
        width: "100px",
    },
    {
        name: "Department", // Added Department column
        selector: (row) => row.department,
        width: "120px",
    },
    {
        name: "Date", // Added Date column
        selector: (row) => formatDate(row.date), // Format the date here
        width: "120px",
    },
    {
        name: "Time", // Added Time column
        selector: (row) => formatTime(row.time), // Format the time here
        width: "80px",
    },
    {
        name: "Shift", // Added Shift column
        selector: (row) => row.shift,
        width: "80px",
    },
    {
        name: "Status",
        selector: (row) => row.status,
        width: "100px",
    },
    {
        name: "Action",
        cell: (row) => <LeaveButtons row={row} />, // Pass entire row to LeaveButtons
        center: true,
    },
];

export const LeaveButtons = ({ row }) => {
    const navigate = useNavigate();

    const handleView = () => {
        navigate(`/admin-dashboard/leaves11/${row._id}`);
    };

    const handleExport = async () => {
        // Fetch the leave details to export
        const response = await fetch(`https://dataanalytics-api.onrender.com/api/leave11/detail/${row._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            const leaveDetails = data.leave;

            // Check if leaveDetails is defined
            if (!leaveDetails) {
                console.error("Leave details not found");
                return;
            }

            // Create a new HTML element to render the leave details
            const element = document.createElement('div');
            element.innerHTML = `
           <img src="${base64Image}" alt="Description of Image" style="display: block; margin: 0 auto; width: 150px; height: auto;" />
            <h1 style="text-align: center; font-weight: bold;">Check Sheet Details</h1>
<div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
    <div>
        <p><strong>Employee ID:</strong> ${row.employeeId}</p>
        <p><strong>Name:</strong> ${row.name}</p>
        <p><strong>Department:</strong> ${row.department}</p>
        <p><strong>Status:</strong> ${leaveDetails.status}</p>
    </div>
    <div style="text-align: left; margin-left: auto;"> <!-- Align text left and push div to right -->
        <p><strong>Doc No:</strong> PAD/ENG/ASM/XM/F/20</p>
        <p><strong>Date:</strong> ${formatDate(row.date)}</p>
        <p><strong>Time:</strong> ${formatTime(row.time)}</p>
        <p><strong>Approved By:</strong> ${row.approver || 'Not Approved Yet'}</p> <!-- Added Approver Name -->
    </div>
</div>
            
            <h2 style="font-weight: bold; margin-top: 20px;">DAILY MAINTENANCE CHECKLIST RF TESTER</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                
                <tbody>
                     <tr>
                            <td style="border: 1px solid #000; padding: 8px; text-align: center;">1.Hourly Monitoring on the OEE , Yield Dashboards updated on time & Verify the data shows if correct</td>
                            
                            <td style="border: 1px solid #000; padding: 8px; text-align: center;">${leaveDetails.rawMaterialStorage?.question1 || 'Not answered'}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 8px; text-align: center;">2.Share the all Sector Yield and OEE Report in Whatsapp and verify the message </td>
                            
                            <td style="border: 1px solid #000; padding: 8px; text-align: center;">${leaveDetails.rawMaterialStorage?.question2 || 'Not answered'}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #000; padding: 8px; text-align: center;">3.Share the all Sector NPM Report in Whatsapp and verify the message</td>
                            
                            <td style="border: 1px solid #000; padding: 8px; text-align: center;">${leaveDetails.rawMaterialStorage?.question3 || 'Not answered'}</td>
                        </tr>
                        <tr>
                    <!-- Question 4 -->
                    <tr>
                        <td style="border: 1px solid #000; padding: 8px; text-align: center;">4.Post message for better readability (e.g., Low Performance Line , Top Contributors , RCCA)</td>
                        
                        <td style="border: 1px solid #000; padding: 8px; text-align:center">${leaveDetails.rawMaterialStorage?.question4 || 'Not answered'}</td>
                    </tr>
        
                    <!-- Question 5 -->
                    <tr>
                        <td style="border: 1px solid #000; padding: 8px; text-align:center">5.Keep an eye on the all the Dashboards and ensure the performance , if any abnormal escalate to DRI</td>
                        
                        <td style="border: 1px solid #000; padding: 8px; text-align:center">${leaveDetails.rawMaterialStorage?.question5 || 'Not answered'}</td>
                    </tr>

                    <!-- Question 6 -->
                    <tr>
                        <td style="border: 1px solid #000; padding: 8px; text-align:center">6.Daily Morning collecting SPI data from the line </td>
                        
                        <td style="border: 1px solid #000; padding: 8px; text-align:center">${leaveDetails.rawMaterialStorage?.question6 || 'Not answered'}</td>
                    </tr>

                    <!-- Question 7 -->
                    <tr>
                        <td style="border: 1px solid #000; padding: 8px; text-align:center">7.Daily Audit for the Temperature and humidity sensor working condition</td>
                        
                        <td style="border: 1px solid #000; padding: 8px; text-align:center">${leaveDetails.rawMaterialStorage?.question7 || 'Not answered'}</td>
                    </tr>

                    <!-- Question 8 -->
                    <tr>
                        <td style="border: 1px solid #000; padding: 8px; text-align:center">8.Updating Weekly Review Report Excel sheet for Engineering Review daily without fail</td>
                        
                        <td style="border: 1px solid #000; padding: 8px; text-align:center">${leaveDetails.rawMaterialStorage?.question8 || 'Not answered'}</td>
                    </tr>

                   
                    
                </tbody>
            </table>
        `;

            // Set options for html2pdf
            const options = {
                margin: 1,
                filename: `${row.department}-${new Date().toISOString().slice(0, 10)}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            // Generate PDF from the HTML element
            html2pdf()
                .from(element)
                .set(options)
                .save();
        } else {
            console.error("Failed to fetch leave details");
        }
    };

    return (
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-2">
            <button
                className="px-3 py-1 bg-custom-purple rounded text-white hover:bg-purple-600 mb-2 md:mb-0"
                onClick={handleView}>
                View
            </button>
            <button
                className="px-3 py-1 bg-electric-blue rounded text-white hover:bg-blue-600"
                onClick={handleExport}>
                Export
            </button>
        </div>
    );
};