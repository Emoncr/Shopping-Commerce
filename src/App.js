import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import Order from './Components/Order/Order'
import Review from './Components/Order-Review/Review'
import Inventory from './Components/Inventory/Inventory'
import Login from './Components/Login/Login'
import Error from "./Components/Error/Error";
import ProductPage from "./Components/ProductPage/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route exact path='/' element={<Shop></Shop>} />
        <Route exact path='/shop' element={<Shop></Shop>} />
        <Route exact path='/Order' element={<Order></Order>} />
        <Route exact path='/review' element={<Review></Review>} />
        <Route exact path='/inventory' element={<Inventory></Inventory>} />
        <Route exact path='/login' element={<Login></Login>} />
        <Route exact path="/product/:id" element={<ProductPage />} />
        <Route exact path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
