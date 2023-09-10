import React, { useEffect, useState } from "react";
import axios from 'axios';
import  './Setting.css'
import { Link, useNavigate } from "react-router-dom";

function Setting (){
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const [showAvatar, setShowAvatar] = useState(false); 

    useEffect(() => {
        axios.get(`http://localhost:8080/setting/${userId}`)
          .then((response) => setUser(response.data))
          .catch((err) => console.log(err));
    }, []);

    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setImageUrl(URL.createObjectURL(event.target.files[0]));
    };

    const submit =async (e)=>{
        e.preventDefault();
        if (window.confirm("Bạn chắc chắn thay đổi không?")) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            axios.post(`http://localhost:8080/avatar/${userId}`, formData)
            .then(response => {
                console.log(response.data);
                window.location.href = `/setting/${userId}`;
            })
            .catch(error => {
                alert("Kích thước ảnh quá lớn!")

                console.error(error);
            });
        }
        
    }

    const handleCancelAvatar = () => {
        setShowAvatar(false);
    };

    return(
        <div>
            <h1 className="text-center">Thông tin cá nhân</h1>
            <form className="container" >
                <div class="avatar-container">
                    <img class="col avatar"
                        src={
                            user.avatar 
                            ? `http://localhost:8080/FileUpload/files/${user.avatar}`
                            :  "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
                        }
                        alt="Book Cover" 
                        onClick={() => { setShowAvatar(true)}}
                    />
                </div>
                {showAvatar && (
                    <div className="update-avatar">
                        <div class="update-container">
                            <h2>Ảnh hồ sơ</h2>
                            <input type="file" onChange={handleFileChange}  style={{ display: "none" }} id="avatarInput"/>
                            <div class="avatar-container">
                                <img class="col avatar"
                                    src={
                                    imageUrl !== "" ? imageUrl : 
                                        user.avatar 
                                        ?`http://localhost:8080/FileUpload/files/${user.avatar}`
                                        :"https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
                                    }
                                    alt="Book Cover"
                                    onClick={() => {
                                        document.getElementById("avatarInput").click();
                                    }}
                                />
                            </div>
                            <div class="row justify-content-around col-10">
                                <button class="btn btn-success col-4" onClick={(e)=> submit(e)}>Upload</button>
                                <button class="btn btn-danger col-4" onClick={(e)=> handleCancelAvatar(e)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="row">
                    <div className="col-lg-6 col-md-4">
                        <div className="col">
                            <label>Tên</label>
                            <input disabled class="form-control"
                            type="text"
                            id="name"
                            value={user.name ||""}
                            />
                        </div>
                        <div className="col">
                            <label>Email</label>
                            <input disabled class="form-control"
                            type="text"
                            id="author"
                            value={user.email ||""}
                            />
                        </div>
                        <div style={{marginTop:"10px"}} >
                            <button class="btn btn-success" onClick={() => { navigate(`/`) }}>Đăng xuất</button>
                        </div>
                    </div>
                </div>    
            </form>    
        </div>
    )
}

export default Setting