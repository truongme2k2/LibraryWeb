import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function Home(props) {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios.get(`http://localhost:8080/user`)
      .then((response) => setBooks(response.data))
      .catch((err) => console.log(err));
  }, []);


  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="input-group mb-3 category">
        <label className="input-group-text" htmlFor="inputGroupSelect01">Tìm sách</label>
        <input
          type="text"
          className="form-control search"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="row">
        {filteredBooks.map((book) => (
          <div className="col-md-3 mb-2 " key={book.id}>
            <div className="card">
              <div class="card-container">
                <img class="card-img"
                  src={`http://localhost:8080/FileUpload/files/${book.book_cover}`}
                  alt="Book Cover"
                />
              </div>
              <div className="card-body row">
                <h6 className="card-title">{book.title}</h6>
                <p className="card-text"> {book.author}</p>
                <button
                  className="btn btn-success"
                  onClick={() => {navigate(`/buy/${book.id}`)}}
                >
                  Đặt mua
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row justify-content-center footer">
        <button className="btn btn-primary col-6" onClick={() => {navigate(`/cart/${userId}`)}}>
          Xem danh sách đã đặt mua
        </button>
      </div>
    </div>
  );
}

export default Home;
