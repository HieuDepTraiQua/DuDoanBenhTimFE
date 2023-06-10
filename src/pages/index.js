import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "../App.scss";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  const redirectToCnn = () => {
    navigate(`/cnn`);
  }

  useEffect(() => {}, []);

  return (
    <div className="container">
      <img
        className="bg-image"
        src={require("../assest/bg.png")}
        alt=""
      />
      <div className="title">CHUẨN ĐOÁN BỆNH TIM</div>
      <div className="item-list">
        <div className="content-items">
          <div className="item">
            <div className="item-title">Sử dụng</div>
            <div className="item-title-2">KNN</div>
            <div className="line"></div>
            <img className="item-icon" src={require("../assest/knn.png")} alt="" />
            <div className="item-button" onClick={redirectToCnn}>Chọn</div>
          </div>
        </div>
      </div>
    </div>
  );
}
