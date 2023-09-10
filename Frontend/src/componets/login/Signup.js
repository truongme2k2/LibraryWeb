import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function Signup(props) {
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

    if (window.confirm("Bạn chắc chắn muốn tạo tài khoản không?")) {
      axios.post(`http://localhost:8080/signup`, user)
        .then((response) => {
          console.log(response.data);
          window.location.href = '/';
          alert("Tạo tài khoản thành công!");
        })
        .catch((error) => {
          console.error(error);
          alert("Email này đã được sử dụng!");
        });
    }
  }

  useEffect(() => {
    axios.get(`http://localhost:8080`)
      .then((response) => setUser(response.data))
      .catch((err) => console.log(err))
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row justify-content-center">
        <form className="form_container my-auto " onSubmit={(e) => submit(e)}>
          <h1 className="text-center">SIGNUP</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" value={user.name || ""} onChange={(e) => handle(e)}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" value={user.email || ""} onChange={(e) => handle(e)}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={user.password || ""} onChange={(e) => handle(e)}></input>
          </div>
          <div className="mb-3">
            <a class="nav-link" href="" onClick={() => { navigate(`/`) }}>Đã có tài khoản</a>
          </div>
          <div className="row justify-content-center">
            <button className="btn btn-success col-6">Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
