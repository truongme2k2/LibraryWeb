import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';


function Login(props) {
  localStorage.removeItem("accessAdmin");
  localStorage.removeItem("accessUser");
  localStorage.removeItem('userId');
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    role: "",
  });

  function handle(e) {
    const { id, value } = e.target;
    setUser(prevState => ({ ...prevState, [id]: value }));
  }


  const submit = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    axios.post(`http://localhost:8080/login`, user)
      .then((response) => {
        alert("Bạn đã đăng nhập thành công!");
        const data = response.data;
        const userRole = data.role;
        if (userRole === 'Admin') {
          localStorage.setItem("accessAdmin", true)
          window.location.href = '/books';
        }
        else {
          localStorage.setItem("accessUser", true)
          const userId = response.data;
          localStorage.setItem('userId', userId);
          window.location.href = '/home';
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Sai tài khoản hoặc mật khẩu!");
      });

  }

  useEffect(() => {
    axios.get(`http://localhost:8080`)
      .then((response) => setUser(response.data))
      .catch((err) => console.log(err))
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row justify-content-center">
        <form className="form_container my-auto" onSubmit={(e) => submit(e)}>
          <h1 className="text-center">LOGIN</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={user.email || ""}
              onChange={(e) => handle(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={user.password || ""}
              onChange={(e) => handle(e)}
            />
          </div>
          <div className="mb-3">
            <a className="nav-link" href="" onClick={() => { navigate(`/signup`) }}>Tạo tài khoản</a>
          </div>
          <div className="row justify-content-center">
            <button className="btn btn-success col-6">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
  
}

export default Login;
