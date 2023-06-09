import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import axios from "axios";
import { Select, Modal, Button, Row, Col } from "antd";

export default function Index() {
  const [listOfData, setListOfData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [displayInfo, setDisplayInfo] = useState(false);
  const [dataDetail, setDataDetail] = useState();
  const [result, setResult] = useState();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const redirectToHome = () => {
    navigate(`/*`);
  };

  const getListOfData = async () => {
    await axios.get(`http://localhost:8000/patient`, {}).then((res) => {
      setListOfData(res.data.content);
      const convertData = res.data.content.map((item) => ({
        value: item.patientId,
        label: item.fullName,
      }));
      setDataFilter(convertData);
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getDataById = async () => {
    await axios
      .get(`http://localhost:8000/patient/${selectedItemId}`, {})
      .then((res) => {
        setDisplayInfo(true);
        setDataDetail(res.data);
      });
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
    setSelectedItemId(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const predict = () => {
    const {
      patientId,
      firstName,
      lastName,
      fullName,
      cpName,
      fbsName,
      exangName,
      restecgName,
      sex,
      target,
      targetName,
      ...newData
    } = dataDetail;
    newData.sex = 1;
    axios
      .post(`http://localhost:8000/patient/forecast`, newData, {})
      .then((res) => {
        setResult(res.data);
        showModal();
      });
  };

  const lamTronSo = (value) => {
    return value.toFixed(2)
  }

  const converrtTextDauNguc = (value) => {
    if (value === 1) {
      return "Đau thắt ngực điển hình";
    } else if (value === 2) {
      return "Đau thắt ngực không điển hình";
    } else if (value === 3) {
      return "Không đau thắt ngực";
    } else if (value === 4) {
      return "Không có triệu chứng";
    } else return "Không có triệu chứng";
  };

  const converrtTextDuongHuyet = (value) => {
    if (value === 0) {
      return "Nhỏ hơn 120 mg/Dl";
    } else if (value === 1) {
      return "Lớn hơn 120 mg/Dl";
    } else return "Nhỏ hơn 120 mg/Dl";
  };

  const converrtTextDienTamDo = (value) => {
    if (value === 0) {
      return "Bình thường";
    } else if (value === 1) {
      return "Sóng ST-T bất thường";
    } else if (value === 2) {
      return "Phì đại tâm thất trái";
    } else return "Bình thường";
  };

  const converrtTextDauThatNguc = (value) => {
    if (value === 0) {
      return "Không";
    } else if (value === 1) {
      return "Có";
    } else return "Không";
  };

  const converrtTextDoDoc = (value) => {
    if (value === 1) {
      return "Tăng dần";
    } else if (value === 2) {
      return "Không đổi";
    } else if (value === 3) {
      return "Giảm dần";
    } else return "Không đổi";
  };

  const converrtTextRoiLoanMau = (value) => {
    if (value === 0) {
      return "Bình thường";
    } else if (value === 1) {
      return "Khiếm khuyết cố định";
    } else if (value === 2) {
      return "Khiếm khuyết có thể đảo ngược";
    } else return "Bình thường";
  };

  useEffect(() => {
    getListOfData();
  }, []);

  return (
    <div className="container">
      <img className="bg-image" src={require("../../assest/bg.png")} alt="" />
      <div className="title">CHUẨN ĐOÁN BỆNH</div>
      {displayInfo && (
        <div className="user-info">
          <div className="content">
            <div className="detail">
              <div className="title-detail">THÔNG TIN CÁ NHÂN</div>
              <div className="infomation">
                <div className="items">
                  <img src={require("../../assest/user-icon.png")} alt="" />
                  Họ và tên:{" "}
                  <span className="description">{dataDetail.fullName}</span>
                </div>
                <div className="items">
                  <img src={require("../../assest/gender-icon.png")} alt="" />
                  Giới tính:{" "}
                  <span className="description">{dataDetail.sex}</span>
                </div>
                <div className="items">
                  <img src={require("../../assest/age-icon.png")} alt="" />
                  Tuổi: <span className="description">{dataDetail.age}</span>
                </div>
              </div>
            </div>
            <div className="detail">
              <div className="title-detail">THÔNG TIN BỆNH ÁN</div>
              <div className="infomation">
                <div className="items">
                  Loại đau ngực:{" "}
                  <span className="description">
                    {converrtTextDauNguc(dataDetail.cp)}
                  </span>
                </div>
                <div className="items">
                  Huyết áp:{" "}
                  <span className="description">
                    {dataDetail.trestbps} mm/Hg
                  </span>
                </div>
                <div className="items">
                  Mức cholesterol:{" "}
                  <span className="description">{lamTronSo(dataDetail.chol)} mg/dL</span>
                </div>
              </div>
              <div className="infomation">
                <div className="items">
                  Mức đường huyết:{" "}
                  <span className="description">
                    {converrtTextDuongHuyet(dataDetail.fbs)}
                  </span>
                </div>
                <div className="items">
                  Loại bệnh tim:{" "}
                  <span className="description">
                    {converrtTextRoiLoanMau(dataDetail.thal)}
                  </span>
                </div>
                <div className="items">
                  Đau thắt ngực:{" "}
                  <span className="description">
                    {converrtTextDauThatNguc(dataDetail.exang)}
                  </span>
                </div>
              </div>
              <div className="infomation">
                <div className="items">
                  Điện tâm đồ:{" "}
                  <span className="description">
                    {converrtTextDienTamDo(dataDetail.restecg)}
                  </span>
                </div>
                <div className="items">
                  Số lượng mạch chính:{" "}
                  <span className="description">{dataDetail.ca}</span>
                </div>
                <div className="items">
                  Nhịp tim:{" "}
                  <span className="description">{dataDetail.thalach}</span>
                </div>
                <div className="items"></div>
              </div>
              <div className="infomation">
                <div className="items">
                  Độ dốc của phần giảm ST:{" "}
                  <span className="description">
                    {converrtTextDoDoc(dataDetail.slope)}
                  </span>
                </div>
                <div className="items">
                  Giá trị giảm ST:{" "}
                  <span className="description">{dataDetail.oldpeak}</span>
                </div>
                <div className="items"></div>
                <div className="items"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {displayInfo && (
        <div className="footer">
          <div className="predict-button confirm-button" onClick={predict}>
            Chuẩn đoán
          </div>
        </div>
      )}

      <div className="input-info">
        <div className="select-row">
          <Select
            className="custom-select"
            showSearch
            placeholder="Chọn bệnh nhân"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={dataFilter}
          />
        </div>
        <div className="confirm-button" onClick={getDataById}>
          Xác nhận
        </div>
      </div>

      <div className="return-button" onClick={redirectToHome}>
        {" "}
        {"<"} Trở lại
      </div>

      <Modal
        title="Kết quả chuẩn đoán"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <div style={{ fontSize: "20px" }}>{result}</div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleCancel} style={{ marginRight: "10px" }}>
            Thoát
          </Button>
        </div>
      </Modal>
    </div>
  );
}
