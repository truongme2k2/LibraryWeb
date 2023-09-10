import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import './Navbar.css'

function Navbar() {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/setting/${userId}`)
          .then((response) => setUser(response.data))
          .catch((err) => console.log(err));
    }, []);

return (
    <div class="body-login">
       <nav class="navbar navbar-expand-lg bg-body-tertiary bg"  >
            <div class="container-fluid">
                <a class="navbar-brand" href="" onClick={() => { navigate(`/`) }}>Truong</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    {
                    localStorage.getItem("accessAdmin") ?(
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link"  href="" onClick={() => { navigate(`/books`) }}>Trang chủ</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="" onClick={() => { navigate(`/buyadmin`) }}>Đơn hàng</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="" onClick={() => { navigate(`/`) }}>Đăng xuất</a>
                            </li>  
                        </ul>
                    ):(
                    localStorage.getItem("accessUser") ? (
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link"  href="" onClick={() => { navigate(`/home`) }}>Trang chủ</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="" onClick={() => { navigate(`/cart/${userId}`) }}>Đơn hàng</a>
                            </li>
                        </ul>
                    ):(
                        null
                    )
                    )}
                    {localStorage.getItem("accessUser") ? (
                        <div class="icon-avatar">
                            <img class="col avatar"
                                src={
                                    user.avatar 
                                    ? `http://localhost:8080/FileUpload/files/${user.avatar}`
                                    :  "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
                                }
                                alt="Book Cover"
                                onClick={() => { navigate(`/setting/${user.avatar}`) }}
                            />
                        </div>
                    ):(
                        null
                    )}
                </div>
            </div>
        </nav>
    </div>
  );
}

export default Navbar