import React, { useEffect, useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './Cart.css'

function Cart(props) {
  const userId = localStorage.getItem('userId');
  const [buy, setBuys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showReview, setShowReview] = useState(false); 
  const [selectedId, setSelectedId] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [assess, setAssess] = useState(0); 
  const [comment, setComment] = useState("");


  useEffect(() => {
    axios.get(`http://localhost:8080/cart/${userId}`)
      .then((response) => setBuys(response.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredBooks = buy.filter((buy) =>
    buy.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const confirmDelete = (id) => {
    if (window.confirm("Bạn chắc chắn muốn hủy đơn hàng không?")) {
      axios.delete(`http://localhost:8080/cart/delete/${id}`)
        .then((response) => {
          if (response.status === 200) {
            setBuys(buy.filter((buy) => buy.id !== id));
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleReviewSubmit = () => {
    const buy = {
      assess: assess,
      cmt:comment,
    };
    if (window.confirm("Bạn chắc chắn muốn đánh giá sản phẩm này ?")) {
      axios.post(`http://localhost:8080/assess/${selectedId}`, buy)
        .then((response) => {
          console.log(response.data);
          window.location.href = `/cart/${userId}`;
        })
        .catch((err) => console.log(err));
    }
  };
  
  const handleStarClick = (rating) => {
    setAssess(rating);
    if (rating === selectedRating) {
      setSelectedRating(0); 
    } else {
      setSelectedRating(rating);
    }
  };
  
  const handleCancelReview = () => {
    setShowReview(false);
    setSelectedRating(0); 
    setComment("")
  };

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
        <table className="table table-striped table-bordered">
          <thead class="table-primary">
            <tr class="text-center">
              <th >Tên sách</th>
              <th>Số lượng</th>
              <th>Đánh giá</th>
              <th>Bình luận</th>
              <th>Đã giao</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody class="table-primary">
            {filteredBooks.map((buy) => (
              <tr key={buy.id} class="text-center">
                <td >{buy.title}</td>
                <td >{buy.quantity}</td>
                <td >{buy.assess}</td>
                <td >{buy.cmt}</td>
                <td ><input  type="checkbox" checked= {buy.sold_out} class="form-check-input  checkbox"/></td>
                <td>
                  <div >
                    {buy.sold_out ? (
                      <button className="btn btn-success col-8"
                              onClick={() => { setSelectedId(buy.id);
                                        setShowReview(true);
                      }}>
                      Đánh giá</button>
                    ) 
                      :<button className="btn btn-danger col-8" onClick={() => confirmDelete(buy.id)} >Hủy đặt mua</button>
                    }
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table> 
        {showReview && (
          <div className="review-modal">
            <div class="row">
              <p>Bạn đánh giá cuốn sách này như thế nào?</p>
            </div>
            <div class="list-icon">
              {Array.from({ length: 5 }, (_, index) => (
                <FontAwesomeIcon
                  className={`icon ${index < selectedRating ? 'yellow' : ''}`}
                  key={index}
                  icon={faStar}
                  onClick={() => handleStarClick(index + 1)}
                />
              ))}
            </div>
            <div class="margin-bot">
              <input
                type="text"
                id="cmt"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                class="form-control"
              />
            </div>
            <div class="row justify-content-around">
              <button className="btn btn-success col-4" onClick={() => handleReviewSubmit()}>Submit</button>
              <button className="btn btn-danger col-4" onClick={() => handleCancelReview()}>Cancel</button>
            </div>
          </div>
        )}  
      </div> 
    </div>
  );
}

export default Cart;
