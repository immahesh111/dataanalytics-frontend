//////////////////////// Printer Machine //////////////////////////////////
import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const Add5 = () => {
    const { user } = useAuth();

    const [leave, setLeave] = useState({
        userId: user._id,
        date: new Date().toISOString().split('T')[0],
        shift: '',
        rawMaterialStorage: {
            question1: '',
            question2: '',
            question3: '',
            question4: '',
            question5: '',
            question6: '',
        },
    });

    const [showRawMaterialStorage, setShowRawMaterialStorage] = useState(false); // State to toggle Raw Material Storage questions
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        console.log(`Input Name: ${name}, Input Value: ${value}`);  // Debugging log

        if (name.includes('.')) {
            const [subdivision, key, subKey] = name.split('.');

            if (subKey) {
                setLeave((prevState) => ({
                    ...prevState,
                    [subdivision]: {
                        ...prevState[subdivision],
                        [key]: {
                            ...prevState[subdivision][key],
                            [subKey]: value  // Update nested field directly.
                        }
                    }
                }));
            } else {
                setLeave((prevState) => ({
                    ...prevState,
                    [subdivision]: {
                        ...prevState[subdivision],
                        [key]: value  // Update non-nested field.
                    }
                }));
            }
        } else {
            setLeave((prevState) => ({
                ...prevState,
                [name]: value  // Update top-level field.
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting leave data:", leave); // Log leave data before submission

        try {
            const response = await axios.post(`https://fatp-api.onrender.com/api/leave4/add`, leave, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                navigate(`/employee-dashboard/leaves4/${user._id}`);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    return (
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-6'>DAILY MAINTENANCE CHECKLIST FCT TESTER</h2>

            <form onSubmit={handleSubmit}>
                <div className='flex flex-col space-y-4'>
                    {/* Common Date Field */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Date:
                        </label>
                        <input
                            type='date'
                            name='date'
                            value={leave.date}
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        />
                    </div>

                    {/* Common Shift Selection */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Shift:
                        </label>
                        <select
                            name='shift'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        >
                            <option value="">Select Shift</option>
                            <option value="Day">Day</option>
                            <option value="Night">Night</option>
                        </select>
                    </div>

                    {/* Raw Material Storage Subdivision */}
                    <h3 className='text-lg font-bold cursor-pointer mt-4 p-2 border border-teal-500 bg-teal-100 rounded' onClick={() => setShowRawMaterialStorage(!showRawMaterialStorage)}>
                    DAILY MAINTENANCE CHECKLIST FCT TESTER
                    </h3>

                    {showRawMaterialStorage && (
                        <table className="min-w-full mt-4 border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 p-2">Class</th>
                                    <th className="border border-gray-300 p-2">Assembly/Part</th>
                                    <th className="border border-gray-300 p-2">Std Condition</th>
                                    <th className="border border-gray-300 p-2">Check Method</th>
                                    <th className="border border-gray-300 p-2">Tool Required</th>
                                    <th className="border border-gray-300 p-3">Check</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Question 1 */}
                                <tr>
                                    <td className="border border-gray-300 p-2 text-center">Cleaning</td>
                                    <td className="border border-gray-300 p-2 text-center">level meter ,Axis meter and gray card</td>
                                    <td className="border border-gray-300 p-2 text-center">No Dirt</td>
                                    <td className="border border-gray-300 p-2 text-center">Visual</td>
                                    <td className="border border-gray-300 p-2 text-center">Cloth & Brush</td>
                                    <td className="border border-gray-300 p-3 text-center">
                                        <div className="flex flex-col items-center">
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    name="rawMaterialStorage.question1"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    className="form-radio h-4 w-4 text-blue-600"
                                                    required
                                                />
                                                Yes
                                            </label>
                                            <label className="inline-flex items-center mt-2">
                                                <input
                                                    type="radio"
                                                    name="rawMaterialStorage.question1"
                                                    value="No"
                                                    onChange={handleChange}
                                                    className="form-radio h-4 w-4 text-blue-600"
                                                    required
                                                />
                                                No
                                            </label>
                                        </div>
                                    </td>
                                </tr>


                                {/* Question 2 */}
                                <tr>
                                    <td className="border border-gray-300 p-2 text-center">Change</td>
                                    <td className="border border-gray-300 p-2 text-center">Check the Earth (Grounding) cable</td>
                                    <td className="border border-gray-300 p-2 text-center">No Damage</td>
                                    <td className="border border-gray-300 p-2 text-center">Visual</td>
                                    <td className="border border-gray-300 p-2 text-center">NA</td>
                                    <td className="border border-gray-300 p-3 text-center">
                                        <div className="flex flex-col items-center">
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    name="rawMaterialStorage.question2"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    className="form-radio h-4 w-4 text-blue-600"
                                                    required
                                                />
                                                Yes
                                            </label>
                                            <label className="inline-flex items-center mt-2">
                                                <input
                                                    type="radio"
                                                    name="rawMaterialStorage.question2"
                                                    value="No"
                                                    onChange={handleChange}
                                                    className="form-radio h-4 w-4 text-blue-600"
                                                    required
                                                />
                                                No
                                            </label>
                                        </div>
                                    </td>
                                </tr>


                                {/* Additional questions can be added here */}
                                {/* Question 3 */}
                                <tr>
                                    <td className="border border-gray-300 p-2 text-center">Check/Change</td>
                                    <td className="border border-gray-300 p-2 text-center">Ensure the fixture should not have any misalignment and no dust particles</td>
                                    <td className="border border-gray-300 p-2 text-center">Firm Contact</td>
                                    <td className="border border-gray-300 p-2 text-center">Lock</td>
                                    <td className="border border-gray-300 p-2 text-center">NA</td>
                                    <td className="border border-gray-300 p-3 text-center">
                                        <div className="flex flex-col items-center">
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    name="rawMaterialStorage.question3"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    className="form-radio h-4 w-4 text-blue-600"
                                                    required
                                                />
                                                Yes
                                            </label>
                                            <label className="inline-flex items-center mt-2">
                                                <input
                                                    type="radio"
                                                    name="rawMaterialStorage.question3"
                                                    value="No"
                                                    onChange={handleChange}
                                                    className="form-radio h-4 w-4 text-blue-600"
                                                    required
                                                />
                                                No
                                            </label>
                                        </div>
                                    </td>
                                </tr>


                                {/* Question 4 */}
                                <tr>
                                    <td className="border border-gray-300 p-2 text-center">Check/ Change</td>
                                    <td className="border border-gray-300 p-2 text-center">Check LUX value</td>
                                    <td className="border border-gray-300 p-2 text-center">No abnormalities</td>
                                    <td className="border border-gray-300 p-2 text-center">Visual</td>
                                    <td className="border border-gray-300 p-2 text-center">Lux Meter</td>
                                    <td className="border border-gray-300 p-3 text-center">
                                        <div className="flex flex-col items-center">
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    name="rawMaterialStorage.question4"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    className="form-radio h-4 w-4 text-blue-600"
                                                    required
                                                />
                                                Yes
                                            </label>
                                            <label className="inline-flex items-center mt-2">
                                                <input
                                                    type="radio"
                                                    name="rawMaterialStorage.question4"
                                                    value="No"
                                                    onChange={handleChange}
                                                    className="form-radio h-4 w-4 text-blue-600"
                                                    required
                                                />
                                                No
                                            </label>
                                        </div>
                                    </td>
                                </tr>

                                {/* Question 5 */}
                                <tr>
                                    <td className="border border-gray-300 p-2 text-center">Check</td>
                                    <td className="border border-gray-300 p-2 text-center">Check the fixture position and Device seating properly without movement</td>
                                    <td className="border border-gray-300 p-2 text-center">No abnormalities</td>
                                    <td className="border border-gray-300 p-2 text-center">Visual</td>
                                    <td className="border border-gray-300 p-2 text-center">NA</td>
                                    <td className="border border-gray-300 p-3 text-center">
                                        <div className="flex flex-col items-center">
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    name="rawMaterialStorage.question5"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    className="form-radio h-4 w-4 text-blue-600"
                                                    required
                                                />
                                                Yes
                                            </label>
                                            <label className="inline-flex items-center mt-2">
                                                <input
                                                    type="radio"
                                                    name="rawMaterialStorage.question5"
                                                    value="No"
                                                    onChange={handleChange}
                                                    className="form-radio h-4 w-4 text-blue-600"
                                                    required
                                                />
                                                No
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                {/* Question 6 */}
                                <tr>
                                    <td className="border border-gray-300 p-2 text-center">Check</td>
                                    <td className="border border-gray-300 p-2 text-center">Check the correct script selected according to model requirements</td>
                                    <td className="border border-gray-300 p-2 text-center">No abnormalities</td>
                                    <td className="border border-gray-300 p-2 text-center">Visual</td>
                                    <td className="border border-gray-300 p-2 text-center">NA</td>
                                    <td className="border border-gray-300 p-3 text-center">
                                        <div className="flex flex-col items-center">
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    name="rawMaterialStorage.question6"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    className="form-radio h-4 w-4 text-blue-600"
                                                    required
                                                />
                                                Yes
                                            </label>
                                            <label className="inline-flex items-center mt-2">
                                                <input
                                                    type="radio"
                                                    name="rawMaterialStorage.question6"
                                                    value="No"
                                                    onChange={handleChange}
                                                    className="form-radio h-4 w-4 text-blue-600"
                                                    required
                                                />
                                                No
                                            </label>
                                        </div>
                                    </td>
                                </tr>


                            </tbody>
                        </table>
                    )}

                    {/* Submit Button */}
                    <button
                        type='submit'
                        className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Add5;