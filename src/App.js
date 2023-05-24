
import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import AllProducts from './Pages/AllProducts';
import ContextFunction from './context/Context';
import HompPage from './Pages/HompPage';
import ProductDetails from './Pages/ProductDetails';
import ShoppingCart from './Pages/ShoppingCart';
import CheckOut from './Pages/CheckOut';
import Register from './Pages/Register';
import Signin from "./Pages/Signin"
import Account from './Pages/Account';
import SingleProductCheckOut from './Pages/SingleProductCheckOut';
function App() {
  return (
    <>
      <BrowserRouter>
      <ContextFunction>
        <Routes>
          <Route path='/' element={<HompPage/>}/>
          <Route path='/allProduct/:categorie' element={<AllProducts/>}/>
          <Route path='/allProduct/:categorie/:name/:id' element={<ProductDetails/>}></Route>
          <Route path='/cart' element={<ShoppingCart/>}/>
          <Route path='/cart/checkout' element={<CheckOut/>}></Route>
          <Route path='/Go-Cart/Register' element={<Register/>}></Route>
          <Route path='/Go-Cart/Login' element={<Signin/>}/>
          <Route path='/Go-Cart/account' element={<Account/>}></Route>
          <Route path='/allProduct/:name/:qua/checkout' element={<SingleProductCheckOut/>}/>
        </Routes>
        </ContextFunction>
      </BrowserRouter>

    </>
  );
}

export default App;
