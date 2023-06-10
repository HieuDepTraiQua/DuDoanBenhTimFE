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
  Space,
} from "antd";

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

  const navigate = useNavigate();
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
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

  const handleDelete = () => {
    // axios
    //   .delete(
    //     `http://localhost:1234/api/thuvien/category/${selectedRecord.id}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     toast.success("Xóa thành công!");
    //     getListOfData();
    //   })
    //   .catch((error) => {
    //     toast.error(error.response.data.message);
    //   });
    setIsConfirmDeleteOpen(false);
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

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
      with: 100,
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
      width: 100,
      render: (value) => converrtTextDauNguc(value),

    },
    {
      title: "Huyết áp",
      dataIndex: "trestbps",
      key: "trestbps",
      width: 100,
    },
    {
      title: "Mức cholesterol",
      dataIndex: "chol",
      width: 100,
      key: "chol",
      render: (value) => lamTronSo(value),

    },
    {
      title: "Mức đường huyết",
      width: 100,
      dataIndex: "fbs",
      key: "fbs",
      render: (value) => converrtTextDuongHuyet(value),

    },
    {
      title: "Điện tâm đồ",
      width: 100,
      dataIndex: "restecg",
      key: "restecg",
      render: (value) => converrtTextDienTamDo(value),
    },
    {
      title: "Đau thắt ngực",
      dataIndex: "exang",
      width: 100,
      render: (value) => converrtTextDauThatNguc(value),
      key: "exang",
    },
    {
      title: "Giá trị giảm ST",
      width: 100,
      dataIndex: "oldpeak",
      key: "oldpeak",
    },
    {
      title: "Độ dốc của phần giảm ST",
      dataIndex: "slope",
      width: 100,
      key: "slope",
      render: (value) => converrtTextDoDoc(value),
    },
    {
      title: "Số lượng các mạch chính",
      dataIndex: "ca",
      width: 100,
      key: "ca",
    },
    {
      title: "Loại bệnh tim",
      width: 100,
      dataIndex: "thal",
      key: "thal",
      render: (value) => converrtTextRoiLoanMau(value),
    },
    {
      title: "Nhịp tim",
      width: 100,
      dataIndex: "thalach",
      key: "thalach",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   fixed: "right",
    //   width: 100,
    //   render: (record) => (
    //     <Space size="middle">
    //       <div className="button-action">
    //         <img src={require("../../assest//icon-edit.png")}></img>
    //       </div>
    //       <div className="button-action">
    //         <img src={require("../../assest/icon-delete.png")}></img>
    //       </div>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <div className="container">
      <img className="bg-image" src={require("../../assest/bg.png")} alt="" />
      <div className="title">Quản lý thông tin bệnh nhân</div>
      <div className="table-content">
        <div className="table-data">
          <Table
            columns={columns}
            dataSource={currentData.map((data) => ({ ...data, key: data.id }))}
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
        title="Thêm mới bệnh nhân"
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
            onFinish={handleOk}
            className="modal-input"
          >
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Tên bệnh nhân"
                  required
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: "Trường bắt buộc, không được bỏ trống!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên bệnh nhân" />
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
                  <Input placeholder="Nhập thông số" />
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
                  <Input placeholder="Nhập thông số" />
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
                  <Input placeholder="Nhập thông số" />
                </Form.Item>
              </Col>
              <Col span={12}>
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
                  <Input placeholder="Nhập giới tính" />
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
                  <Input placeholder="Nhập thông số" />
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
                  <Input placeholder="Nhập thông số" />
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
                <Form.Item
                  label="Loại bệnh tim"
                  required
                  name="thal"
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
        <div className="add-button" onClick={showModal}>
          Thêm mới
        </div>
      </div>
      <div className="return-button" onClick={redirectToHome}>
        {" "}
        {"<"} Trở lại
      </div>
    </div>
  );
}
