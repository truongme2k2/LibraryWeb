import { Route, Routes } from 'react-router-dom';

import Navbar from './componets/layout/Navbar';

import Login from './componets/login/Login';
import Signup from './componets/login/Signup'

import Books from './componets/admin/Books';
import Book from './componets/admin/BookDetails';
import BuyAdmin from './componets/admin/BuyAdmin';

import Home from './componets/user/Home'
import Cart from './componets/user/Cart'
import Buy from './componets/user/Buy'
import Setting from './componets/user/Setting'



function App() {
  return (
    <div class="body" > 
      <div className="header">
        <Navbar ></Navbar>
      </div>
      <div className="header-boder">
      </div>
      <div class="body">
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/books" element={<Books/>}></Route>
          <Route path="books/:id" element={<Book/>}></Route>
          <Route path="buyadmin" element={<BuyAdmin/>}></Route>
          <Route path="home" element={<Home/>}></Route>
          <Route path="cart/:id" element={<Cart/>}></Route>
          <Route path="buy/:id" element={<Buy/>}></Route>
          <Route path="setting/:id" element={<Setting/>}></Route>
        </Routes>
      </div>
    </div>
  );
}
export default App;
