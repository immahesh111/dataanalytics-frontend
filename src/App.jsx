
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBasedRoutes from './utils/RoleBasedRoutes';
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/department/DepartmentList';
import AddDepartment from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';
import List from './components/employee/List';
import Add from './components/employee/Add';
import View from './components/employee/View';
import Edit from './components/employee/Edit';
import Summary from './components/EmployeeDashboard/Summary'


import LeaveList12 from './components/leave/List12'


import AddLeave12 from './components/leave/Add12'

import Setting from './components/EmployeeDashboard/Setting';


import Table11 from './components/leave/Table11'


import Detail11 from './components/leave/Detail11';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBasedRoutes>

          </PrivateRoutes>

        }>
          <Route index element={<AdminSummary />}></Route>

          <Route path="/admin-dashboard/departments" element={<DepartmentList />}></Route>
          <Route path="/admin-dashboard/add-department" element={<AddDepartment />}></Route>
          <Route path="/admin-dashboard/department/:id" element={<EditDepartment />}></Route>

          <Route path="/admin-dashboard/employees" element={<List />}></Route>
          <Route path="/admin-dashboard/add-employee" element={<Add />}></Route>
          <Route path="/admin-dashboard/employees/:id" element={<View />}></Route>
          <Route path="/admin-dashboard/employees/edit/:id" element={<Edit />}></Route>

          
          <Route path="/admin-dashboard/leaves11" element={<Table11 />}></Route>

         
          <Route path="/admin-dashboard/leaves11/:id" element={<Detail11 />}></Route>


          <Route path="/admin-dashboard/employees/leaves11/:id" element={<LeaveList12 />}></Route>

          <Route path="/admin-dashboard/setting" element={<Setting />}></Route>
        </Route>
        <Route path="/employee-dashboard" element={
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />
            </RoleBasedRoutes>

          </PrivateRoutes>
        }>

          <Route index element={<Summary />}></Route>

          <Route path='/employee-dashboard/profile/:id' element={<View />}></Route>
          
          <Route path='/employee-dashboard/leaves11/:id' element={<LeaveList12/>}></Route>

         
          <Route path='/employee-dashboard/add-leave12' element={<AddLeave12 />}></Route>

          <Route path='/employee-dashboard/setting' element={<Setting />}></Route>

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
