import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Books(props) {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

 
  const filteredBooks = books.filter((books) =>
    books.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    loadBook();
  },[]);

  const loadBook= async () => {
    const result = await axios.get(`http://localhost:8080/books`);
    setBooks(result.data);
  }

  const confirmDelete = (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa không?")) {
      axios.delete(`http://localhost:8080/book/${id}`)
        .then((response) => {
          if (response.status === 200) {
            setBooks(books.filter((book) => book.id !== id));
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container">
      <div className=" col input-group mb-3 category">
        <label class="input-group-text" for="inputGroupSelect01">Tìm sách</label>
        <input type="text" className="form-control search" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead className="table-primary">
            <tr class="text-center">
              <th>Id</th>
              <th>Tên sách</th>
              <th>Tác giả</th>
              <th>Thể loại</th>
              <th>Ngày xuất bản</th>
              <th>Số trang</th>
              <th>Đã bán</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody className="table-primary">
            {filteredBooks.map((book) => (
                  <tr key={book.id} class="text-center">
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td>{book.date}</td>
                    <td>{book.page}</td>
                    <td>{book.sold}</td>
                    <td >
                      <div>
                        { localStorage.getItem("accessAdmin") ?(
                          <div class="row justify-content-around">
                            <button className="btn btn-success col-4" onClick={() => { navigate(`/books/${book.id}`)}}>Xem</button>
                            <button className="btn btn-danger col-4" onClick={() => confirmDelete(book.id)}>Xóa</button>
                          </div>
                        ):(
                          null
                        )}
                      </div>

                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <div>
          { localStorage.getItem("accessAdmin") ?(
            <div class="row justify-content-around">
              <button className="btn btn-primary" onClick={() => { navigate(`/books/${-1}`) }}>Thêm mới</button>
            </div>
          ):(
            null
          )}
        </div>
      </div>
    </div>
  );
}

export default Books;
