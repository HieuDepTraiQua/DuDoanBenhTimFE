import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  Pagination,
  Button,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Select,
  Space,
} from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Index() {
  const [listOfData, setListOfData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myForm] = Form.useForm();
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = listOfData.slice(startIndex, endIndex);
  const [isUpdate, setIsUpdate] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [selectedId, setSelectedId] = useState("");

  // const [selectedOptionDauNguc, setSelectedOptionDaunguc] = useState("");
  // const [selectedOptionDuongHuyet, setSelectedOptionDuongHuyet] = useState("");
  // const [selectedOptionDienTamDo, setSelectedOptionDientamDo] = useState("");
  // const [selectedOptionDauthatNguc, setSelectedOptionDauThatNguc] = useState("");
  // const [selectedOptionDoDoc, setSelectedOptionDoDoc] = useState("");
  // const [selectedOptionRoiLoanMau, setSelectedOptionRoiLoanMau] = useState("");
  const navigate = useNavigate();

  const listDauNguc = [
    {
      value: "1",
      label: "Đau thắt ngực điển hình",
    },
    {
      value: "2",
      label: "Đau thắt ngực không điển hình",
    },
    {
      value: "3",
      label: "Không đau thắt ngực",
    },
    {
      value: "4",
      label: "Không có triệu chứng",
    },
  ];
  const listDuongHuyet = [
    {
      value: "0",
      label: "Nhỏ hơn 120 mg/Dl",
    },
    {
      value: "1",
      label: "Lớn hơn 120 mg/Dl",
    },
  ];
  const listDienTamDo = [
    {
      value: "0",
      label: "Bình thường",
    },
    {
      value: "1",
      label: "Sóng ST-T bất thường",
    },
    {
      value: "2",
      label: "Phì đại tâm thất trái",
    },
  ];
  const listDauThatnguc = [
    {
      value: "0",
      label: "Không",
    },
    {
      value: "1",
      label: "Có",
    },
  ];
  const listDoDoc = [
    {
      value: "3",
      label: "Giảm dần",
    },
    {
      value: "1",
      label: "Tăng dần",
    },
    {
      value: "2",
      label: "Không đổi",
    },
  ];
  const listLoaiMau = [
    {
      value: "0",
      label: "Bình thường",
    },
    {
      value: "1",
      label: "Khiếm khuyết cố định",
    },
    {
      value: "2",
      label: "Khiếm khuyết có thể đảo ngược",
    },
  ];
  const listGender = [
    {
      value: "0",
      label: "Nữ",
    },
    {
      value: "1",
      label: "Nam",
    },
  ];

  const redirectToHome = () => {
    navigate(`/*`);
  };

  const getListOfData = async () => {
    await axios.get(`http://localhost:8000/patient`, {}).then((res) => {
      setListOfData(res.data.content);
    });
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const showModal = (type) => {
    setIsModalOpen(true);
    if (type === "update") {
      setTitleModal("Cập nhật thông tin bệnh nhân");
      setIsUpdate(true);
    } else if (type === "create") {
      setTitleModal("Thêm mới thông tin bệnh nhân");
      myForm.resetFields();
      setIsUpdate(false);
    }
  };

  const handleSubmit = (value) => {
    setIsModalOpen(false);
    if (isUpdate){
      const gender = value.sex;
      if (gender === "Nam"){
        value.sex = 1;
      } else if (gender === "Nữ"){
        value.sex = 0;
      }
      axios
      .put(`http://localhost:8000/patient/${selectedId}`, value, {})
      .then((res) => {
        getListOfData();
        toast.success("Cập nhật thành công!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    } else {
      axios
      .post(`http://localhost:8000/patient`, value, {})
      .then((res) => {
        getListOfData();
        toast.success("Thêm mới thành công!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    }
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDeleteConfirm = (record) => {
    setSelectedRecord(record);
    setIsConfirmDeleteOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsConfirmDeleteOpen(false);
  };

  const handleEdit = (record) => {
    myForm.setFieldsValue({
      firstName: record.firstName,
      lastName: record.lastName,
      sex: record.sex,
      age: record.age,
      cp: record.cp,
      trestbps: record.trestbps,
      chol: record.chol,
      fbs: record.fbs,
      restecg: record.restecg,
      thalach: record.thalach,
      exang: record.exang,
      oldpeak: record.oldpeak,
      slope: record.slope,
      ca: record.ca,
      thal: record.thal,
    });
    setSelectedId(record.patientId);
    showModal("update");
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/patient/${selectedRecord.patientId}`, {})
      .then((res) => {
        toast.success("Xóa thành công!");
        getListOfData();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    setIsConfirmDeleteOpen(false);
  };

  const lamTronSo = (value) => {
    return value.toFixed(2);
  };

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

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
      with: 200,
      fixed: "left",
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      key: "age",
      with: 100,
      fixed: "left",
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      key: "sex",
      fixed: "left",
      width: 100,
    },
    {
      title: "Loại đau ngực",
      dataIndex: "cp",
      key: "cp",
      render: (value) => converrtTextDauNguc(value),
    },
    {
      title: "Huyết áp",
      dataIndex: "trestbps",
      key: "trestbps",
    },
    {
      title: "Mức cholesterol",
      dataIndex: "chol",
      key: "chol",
      render: (value) => lamTronSo(value),
    },
    {
      title: "Mức đường huyết",
      dataIndex: "fbs",
      key: "fbs",
      render: (value) => converrtTextDuongHuyet(value),
    },
    {
      title: "Điện tâm đồ",
      dataIndex: "restecg",
      key: "restecg",
      render: (value) => converrtTextDienTamDo(value),
    },
    {
      title: "Đau thắt ngực",
      dataIndex: "exang",
      render: (value) => converrtTextDauThatNguc(value),
      key: "exang",
    },
    {
      title: "Giá trị giảm ST",
      dataIndex: "oldpeak",
      key: "oldpeak",
    },
    {
      title: "Độ dốc của phần giảm ST",
      dataIndex: "slope",
      key: "slope",
      render: (value) => converrtTextDoDoc(value),
    },
    {
      title: "Số lượng các mạch chính",
      dataIndex: "ca",
      key: "ca",
    },
    {
      title: "Rối loạn máu",
      dataIndex: "thal",
      key: "thal",
      render: (value) => converrtTextRoiLoanMau(value),
    },
    {
      title: "Nhịp tim",
      dataIndex: "thalach",
      key: "thalach",
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (record) => (
        <Space size="middle">
          <div className="button-action" onClick={() => handleEdit(record)}>
            <img src={require("../../assest//icon-edit.png")}></img>
          </div>
          <div
            className="button-action"
            onClick={() => showDeleteConfirm(record)}
          >
            <img src={require("../../assest/icon-delete.png")}></img>
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <img className="bg-image" src={require("../../assest/bg.png")} alt="" />
      <div className="title">Quản lý thông tin bệnh nhân</div>
      <div className="table-content">
        <div className="table-data">
          <Table
            columns={columns}
            dataSource={currentData.map((data) => ({
              ...data,
              key: data.patientId,
            }))}
            scroll={{
              x: 1300,
            }}
            pagination={false}
            style={{ marginBottom: "20px" }}
          />
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={listOfData.length}
            onChange={handlePageChange}
            pagination={{
              position: ["bottomRight"],
            }}
          />
        </div>
      </div>

      <Modal
        title={titleModal}
        open={isModalOpen}
        onCancel={handleCancel}
        width={800}
        footer={null}
      >
        <div className="modal-create">
          <Form
            layout="vertical"
            id="myForm"
            form={myForm}
            onFinish={handleSubmit}
            className="modal-input"
          >
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Họ"
                  required
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Trường bắt buộc, không được bỏ trống!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập họ của bệnh nhân" />
                </Form.Item>
                <Form.Item
                  label="Tuổi"
                  required
                  name="age"
                  rules={[
                    {
                      required: true,
                      message: "Trường bắt buộc, không được bỏ trống!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tuổi" />
                </Form.Item>
                <Form.Item
                  label="Loại đau ngực"
                  required
                  name="cp"
                  rules={[
                    {
                      required: true,
                      message: "Trường bắt buộc, không được bỏ trống!",
                    },
                  ]}
                >
                  <Select options={listDauNguc} placeholder="Nhập dữ liệu" />
                </Form.Item>
                <Form.Item
                  label="Huyết áp"
                  required
                  name="trestbps"
                  rules={[
                    {
                      required: true,
                      message: "Trường bắt buộc, không được bỏ trống!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập thông số" />
                </Form.Item>
                <Form.Item
                  label="Mức cholesterol"
                  required
                  name="chol"
                  rules={[
                    {
                      required: true,
                      message: "Trường bắt buộc, không được bỏ trống!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập thông số" />
                </Form.Item>
                <Form.Item
                  label="Mức đường huyết "
                  required
                  name="fbs"
                  rules={[
                    {
                      required: true,
                      message: "Trường bắt buộc, không được bỏ trống!",
                    },
                  ]}
                >
                  <Select options={listDuongHuyet} placeholder="Nhập dữ liệu" />
                </Form.Item>
                <Form.Item
                  label="Điện tâm đồ"
                  required
                  name="restecg"
                  rules={[
                    {
                      required: true,
                      message: "Trường bắt buộc, không được bỏ trống!",
                    },
                  ]}
                >
                  <Select options={listDienTamDo} placeholder="Nhập dữ liệu" />
                </Form.Item>
                <Form.Item
                  label="Rối loạn máu"
                  required
                  name="thal"
                  rules={[
                    {
                      required: true,
                      message: "Trường bắt buộc, không được bỏ trống!",
                    },
                  ]}
                >
                  <Select options={listLoaiMau} placeholder="Nhập dữ liệu" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Tên"
                  required
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Trường bắt buộc, không được bỏ trống!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên của bệnh nhân" />
                </Form.Item>
                <Form.Item
                  label="Giới tính"
                  required
                  name="sex"
                  rules={[
                    {
                      required: true,
                      message: "Trường bắt buộc, không được bỏ trống!",
                    },
                  ]}
                >
                  <Select options={listGender} placeholder="Nhập dữ liệu" />
                </Form.Item>
                <Form.Item
                  label="Tần số tim tối đa"
                  required
                  name="thalach"
                  rules={[
                    {
                      required: true,
                      message: "Trường bắt buộc, không được bỏ trống!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập thông số" />
                </Form.Item>
                <Form.Item
                  label="Đau thắt ngực"
                  required
                  name="exang"
                  rules={[
                    {
                      required: true,
                      message: "Trường bắt buộc, không được bỏ trống!",
                    },
                  ]}
                >
                  <Select
                    options={listDauThatnguc}
                    placeholder="Nhập dữ liệu"
                  />
                </Form.Item>
                <Form.Item
                  label="Giá trị giảm ST"
                  required
                  name="oldpeak"
                  rules={[
                    {
                      required: true,
                      message: "Trường bắt buộc, không được bỏ trống!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập thông số" />
                </Form.Item>
                <Form.Item
                  label="Độ dốc của phần giảm ST"
                  required
                  name="slope"
                  rules={[
                    {
                      required: true,
                      message: "Trường bắt buộc, không được bỏ trống!",
                    },
                  ]}
                >
                  <Select options={listDoDoc} placeholder="Nhập dữ liệu" />
                </Form.Item>
                <Form.Item
                  label="Số lượng các mạch chính"
                  required
                  name="ca"
                  rules={[
                    {
                      required: true,
                      message: "Trường bắt buộc, không được bỏ trống!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập thông số" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button onClick={handleCancel} style={{ marginRight: "10px" }}>
                Thoát
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="button-custom"
              >
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      <Modal
        title="Xác nhận"
        open={isConfirmDeleteOpen}
        onOk={handleDelete}
        onCancel={handleDeleteCancel}
      >
        Bạn có chắc vẫn muốn xóa bản ghi này?
      </Modal>

      <div className="header">
        <div className="add-button" onClick={() => showModal("create")}>
          Thêm mới
        </div>
      </div>
      <div className="return-button" onClick={redirectToHome}>
        {" "}
        {"<"} Trở lại
      </div>

      <ToastContainer />
    </div>
  );
}
