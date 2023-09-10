import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const Book=()=> {

    const params = useParams("");
    const id = params.id;
    
    function handle(e) {
        const { id, value } = e.target;
        setBook(prevState => ({ ...prevState, [id]: value }));
    }

    const [book, setBook] = useState({
        id: "",
        title: "",
        author: "",
        description: "",
        date: "",
        page: "",
        category: "",
        book_cover: ""
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleViewEditClick = () => {
        setIsEditing(!isEditing);
    };

    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        if (id < 0) {
            setBook(prevState => ({
              ...prevState,
              book_cover: "."
            }));
        }
        setImageUrl(URL.createObjectURL(event.target.files[0]));
    };


    const submit =async (e)=>{
        e.preventDefault();
        
        if (!book.title || !book.author || !book.date||!book.book_cover) {
            alert("Vui lòng nhập đầy đủ thông tin của sách");
            return;
        }

        
        if (id > 0) {
            if (window.confirm("Bạn chắc chắn thay đổi không?")) {
                axios.put(`http://localhost:8080/book/${id}`, book)
                .then((response) => {
                    console.log(response.data);
                    window.location.href = '/books';
                })
                .catch((error) => {
                    console.error(error);
                });

                const formData = new FormData();
                formData.append('file', selectedFile);
                axios.post(`http://localhost:8080/FileUpload/${id}`, formData)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
            }
        }
        else{
            if (window.confirm("Bạn chắc chắn thay đổi không?")) {
                
                axios.post(`http://localhost:8080/book/insert`, book)
                .then((response) => {
                    const newBookId = response.data; 
                    console.log(response.data);
                    window.location.href = '/books';

                    const formData = new FormData();
                    formData.append('file', selectedFile);
                    axios.post(`http://localhost:8080/FileUpload/${newBookId}`, formData) 
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                })
                .catch((error) => {
                    alert("Title đã tồn tại!");
                    console.error(error);
                });
            }
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/book/${id}`)
        .then((response) => setBook(response.data))
        .catch((err) => console.log(err))
    }, []);
    

return (
    <div>
        <h1 className="text-center">{id < 0 ? "New Book" : `Book ${id}`}</h1>
        <form className="container" onSubmit={(e)=> submit(e)}>
            <div className="row">
                <div className="col-lg-8 col-md-6">
                    <div className="col">
                        <label>Id</label>
                        <input disabled class="form-control"
                        type="number"
                        id="id"
                        value={book.id ||""}
                        onChange={(e) => handle(e)
                            
                        }
                        />
                    </div>
                    <div className="row">
                        <div className="col">
                            <label>Tên sách</label>
                            <input disabled={!isEditing && id > 0} class="form-control"
                            type="text"
                            id="title"
                            value={book.title ||""}
                            onChange={(e) => handle(e)}
                            />
                        </div>
                        <div className="col">
                            <label>Tác giả</label>
                            <input disabled={!isEditing && id > 0} class="form-control"
                            type="text"
                            id="author"
                            value={book.author ||""}
                            onChange={(e) => handle(e)}
                            />
                        </div>
                    </div>
                    <div class="description">
                        <label>Mô tả</label>
                        <input disabled={!isEditing && id > 0} class="form-control"
                            type="text"
                            id="description"
                            value={book.description ||""}
                            onChange={(e)  => handle(e)}
                        />
                    </div>
                    <div className="row">
                        <div className="col">
                            <label>Ngày sản xuất</label>
                            <input disabled={!isEditing && id > 0} class="form-control"
                            type="date"
                            id="date"
                            value={book.date ||""}
                            onChange={(e) => handle(e)}
                            />
                        </div>
                        <div className="col">
                            <label>Số trang</label>
                            <input disabled={!isEditing && id > 0}   class="form-control"                
                            type="number"
                            id="page"
                            value={book.page ||""}
                            onChange={(e) => handle(e)}
                            />
                        </div>
                    </div>
                    <div className="col input-group mb-3 category">
                        <label class="input-group-text" for="inputGroupSelect01">Thể loại</label>
                        <select  value={book.category || ""} onChange={(e) => handle(e)} id="category" class="custom-select col" disabled={!isEditing && id > 0} >
                            <option value="">-- Chọn loại sách --</option>
                            <option value="Tiểu thuyết">Tiểu thuyết</option>
                            <option value="Truyện tranh">Truyện cổ tích</option>
                            <option value="Thơ">Thơ</option>
                            <option value="Truyện tranh">Truyện tranh</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-6  col-lg-4 row con-img">
                    <input type="file" onChange={handleFileChange} disabled={!isEditing && id > 0} style={{ display: "none" }} id="avatarInput"/>
                    <img class="col book_cover"
                        src={
                            imageUrl !== "" ? imageUrl :
                            (id < 0 || !book.book_cover) ?
                              "https://mir-s3-cdn-cf.behance.net/project_modules/fs/244986139980773.6239a611d14f6.jpg" :
                              `http://localhost:8080/FileUpload/files/${book.book_cover}`
                        }
                        alt="Book Cover"
                        onClick={() => {
                            document.getElementById("avatarInput").click();
                        }}
                    />
                </div>
            </div>
            <div className="container footer">
                <div className="row">
                    {id > 0 ? (
                        <div class="row">
                            {isEditing ? (
                                <button type="submit" className="btn btn-success" >
                                  Edit
                                </button>
                            ) : (
                                <p  className="btn btn-primary" onClick={handleViewEditClick}>
                                    View
                                </p>
                            )}
                        </div>
                    ) : (
                        <button type="submit" className="btn btn-success">
                            Add
                        </button>
                    )}
                </div>
            </div>
        </form>
    </div>
  );
}

export default Book;

                 
