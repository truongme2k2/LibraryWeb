import React, { useEffect, useState } from "react";
import axios from 'axios';

function BuyAdmin(props) {
  const [booksbuy, setBooksbuy] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleRows1, setVisibleRows1] = useState(0);
  const [visibleRows2, setVisibleRows2] = useState(8);

  const [value, setValue] = useState(1);

 
  useEffect(() => {
    axios.get("http://localhost:8080/buyadmin")
      .then((response) => setBooksbuy(response.data))
      .catch((err) => console.log(err));
  }, []);


  const filteredBooks = booksbuy.filter((bookbuy) =>
    bookbuy.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const confirmUpdate = (id) => {
    if (window.confirm("Bạn chắc chắn muốn cập nhật không?")) {
      axios.put(`http://localhost:8080/buyadmin/${id}`, booksbuy )
        .then((response) => {
          console.log(response.data);
          window.location.href = '/buyadmin';
        })
        .catch((err) => console.log(err));
    }
  };


  const showMoreRows2 = () => {
    setValue(value + 1);
    setVisibleRows1(visibleRows1 + 8);
    setVisibleRows2(visibleRows2 + 8);
  };
  const showMoreRows1 = () => {
    setValue(value - 1);
    setVisibleRows1(visibleRows1 - 8);
    setVisibleRows2(visibleRows2 - 8);
  };

  const rowCount = booksbuy.length;

  return (
    <div className="container">
      <div className=" col input-group mb-3 category">
        <label class="input-group-text" for="inputGroupSelect01">Tìm sách</label>
        <input type="text" className="form-control search" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead className="table-primary ">
            <tr class="text-center">
              <th>Id</th>
              <th>Người đặt</th>
              <th>Tên sách</th>
              <th>Số lượng</th>
              <th>Đánh giá</th>
              <th>Bình luận</th>
              <th>Đã giao</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody className="table-primary ">
            {filteredBooks.slice(visibleRows1, visibleRows2).map((bookbuy) => (
              <tr key={bookbuy.id} class="text-center">
                <td>{bookbuy.id}</td>
                <td>{bookbuy.user}</td>
                <td>{bookbuy.title}</td>
                <td class="text-center">{bookbuy.quantity}</td>
                <td>{bookbuy.assess}</td>
                <td>{bookbuy.cmt}</td>
                <td class="text-center"><input type="checkbox" checked= {bookbuy.sold_out} class="checkbox form-check-input text-center"/></td>
                <td>
                  {bookbuy.sold_out ? (
                    <button className="btn btn-secondary col-8" disabled>Đã giao hàng</button>
                  ) 
                    :<button className="btn btn-success col-8" onClick={() => confirmUpdate(bookbuy.id)} disabled={!localStorage.getItem("accessAdmin")}>Xác nhận giao hàng</button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table> 
      </div>
      <div className=" text-center">
        <div className="btn-group " role="group" aria-label="Basic example">
          <button className="btn btn-primary" onClick={showMoreRows1} disabled={visibleRows1===0} >
            -
          </button>
          <button className="btn btn-primary" disabled>
            {value}
          </button>
          <button className="btn btn-primary" onClick={showMoreRows2} disabled={visibleRows2 >=rowCount}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyAdmin;
