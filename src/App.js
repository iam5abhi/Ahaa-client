import react from "react";
import Login from "./pages/Authenticate/login";
import BillWiseReport from "./pages/BillWiseReport";
import BillGenrate from "./pages/BillGenrate";
import AddMenuItem from "./pages/AddMenuItem"
import PageNotFound from "./pages/PageNotFount";
import MenuItemlist from "./pages/MenuItemList";
import KitchenBillingSystem from "./pages/kitchenBillingSystem";
import { Routes, Route,BrowserRouter, Link } from "react-router-dom";
import BillingReport from "./pages/BillingReport";
import EditBillReport from "./pages/EditBillReport";
import ProtectedRoute from "./route/ProtectedRoute";

const App =()=>{
   return (
        <BrowserRouter>
            <Routes>
                 <Route path="/" element={<Login/>}/>
                 <Route path="/salerepost" element={<ProtectedRoute><BillWiseReport/></ProtectedRoute>}/> 
                 <Route path ='/additem'  element={<ProtectedRoute><AddMenuItem/></ProtectedRoute>}/>
                 <Route path ='/billgenreate'  element={<ProtectedRoute><KitchenBillingSystem/></ProtectedRoute>}/>
                 <Route path ='/listofitem' element={<ProtectedRoute><MenuItemlist/></ProtectedRoute>}/>
                 <Route path="/report" element={<ProtectedRoute><BillingReport/></ProtectedRoute>}/>
                 <Route path ='/report/:id' element={<ProtectedRoute><EditBillReport/></ProtectedRoute>}/>
                 <Route path ='*'  element={<PageNotFound/>}/>

            </Routes>
        </BrowserRouter>
   )
}

export default App