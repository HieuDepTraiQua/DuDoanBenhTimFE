import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "../App.scss";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  const redirectToPredict = () => {
    navigate(`/predict`);
  }

  const redirectToPatient = () => {
    navigate(`/patient`);
  }

  useEffect(() => {}, []);

  return (
    <div className="container">
      <img
        className="bg-image"
        src={require("../assest/bg.png")}
        alt=""
      />
      <div className="title">HEALTH CARE</div>
      <div className="item-list">
        <div className="content-items">
          <div className="item">
            <div className="item-title">Thông tin</div>
            <div className="item-title-2">Bệnh nhân</div>
            <div className="line"></div>
            <img className="item-icon" src={require("../assest/b.png")} alt="" />
            <div className="item-button" onClick={redirectToPatient}>Chọn</div>
          </div>
        </div>
        <div className="content-items">
          <div className="item">
            <div className="item-title">Chuẩn đoán</div>
            <div className="item-title-2">Bệnh</div>
            <div className="line"></div>
            <img className="item-icon" src={require("../assest/p.png")} alt="" />
            <div className="item-button" onClick={redirectToPredict}>Chọn</div>
          </div>
        </div>
      </div>
    </div>
  );
}
