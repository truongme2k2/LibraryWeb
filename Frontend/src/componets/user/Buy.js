import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';


const Buy=()=> {
    const params = useParams("");
    const id = params.id;
    const userId = localStorage.getItem('userId');
    const [quantity, setQuantity] = useState(0);

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

    const submit =async (e)=>{
        const buyData = {
            book: book.id,
            user: userId,
            title: book.title,
            quantity: quantity,
        };
        e.preventDefault();
        if (window.confirm("Bạn chắc chắn muốn đặt hàng ?")) {
            axios.post(`http://localhost:8080/buy/insert`, buyData)
            .then((response) => {
                console.log(response.data);
                window.location.href = `/cart/${userId}`;
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/buy/${id}`)
        .then((response) => setBook(response.data))
        .catch((err) => console.log(err))
    }, []);
    
  return (
    <div>
        <form className="container" onSubmit={(e)=> submit(e)}>
            <div className="row">
                <div className="col-lg-8 col-md-6">
                    <div className="row">
                        <div className="col">
                            <label>Tên sách</label>
                            <input disabled class="form-control"
                            type="text"
                            id="title"
                            value={book.title ||""}
                            
                            />
                        </div>
                        <div className="col">
                            <label>Tác giả</label>
                            <input disabled class="form-control"
                            type="text"
                            id="author"
                            value={book.author ||""}
                            
                            />
                        </div>
                    </div>
                    <div class="description">
                        <label>Mô tả</label>
                        <input disabled class="form-control"
                            type="text"
                            id="description"
                            value={book.description ||""}
                            
                        />
                    </div>
                    <div className="row">
                        <div className="col">
                            <label>Ngày sản xuất</label>
                            <input disabled class="form-control"
                            type="date"
                            id="date"
                            value={book.date ||""}
                           
                            />
                        </div>
                        <div className="col">
                            <label>Số trang</label>
                            <input disabled class="form-control"                
                            type="number"
                            id="page"
                            value={book.page ||""}
                            
                            />
                        </div>
                    </div>
                    <div className="col input-group mb-3 category">
                        <label class="input-group-text" for="inputGroupSelect01">Thể loại</label>
                        <select  value={book.category || ""}  id="category" class="custom-select col" disabled>
                            <option value="">-- Chọn loại sách --</option>
                            <option value="Tiểu thuyết">Tiểu thuyết</option>
                            <option value="Thơ">Thơ</option>
                            <option value="Truyện tranh">Truyện tranh</option>
                        </select>
                    </div>
                    <div className="col">
                        <label>Số lượng</label>
                        <input 
                            class="form-control"               
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            min="0"
                        />
                    </div>
                </div>
                <div className=" row col-md-6  col-lg-4">
                    <img class="col"
                        src={`http://localhost:8080/FileUpload/files/${book.book_cover}`}
                        alt="Book Cover"
                    />
                </div>
            </div>
            <div className=" footer ">
                <div className="row">
                    <button type="submit" className="btn btn-success" disabled={!localStorage.getItem("accessUser")|| quantity <= 0}>
                        Đặt mua
                    </button>
                </div>
            </div>
        </form>
    </div>
  );
}

export default Buy;
