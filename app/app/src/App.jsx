import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 import CouponList from './components/CouponList'
 import CustomerList from './components/CustomerList'
 import Registration from './components/Registration'
import CompanyList from "./components/CompanyList";
function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/admin" element={<><CustomerList /><CouponList /><CompanyList/></>} />
        <Route path="/customer" element={<CouponList />} />

      </Routes>
    </Router>
  );
}

export default App;


