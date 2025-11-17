import { useState } from "react";
import { Table, Button, Modal, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdBlock } from "react-icons/md";

import { IoIosWarning } from "react-icons/io";

const Users = ({ dashboardHome }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  // -------------------------
  // Dummy Static Data (UI ONLY)
  // -------------------------
  const dummyUsers = [
    {
      _id: "1",
      name: "John Doe",
      img: "https://i.pravatar.cc/150?img=1",
      phone: "01234567890",
      email: "john@example.com",
      createdAt: "2024-04-10",
      block: false,
    },
    {
      _id: "2",
      name: "Sarah Khan",
      img: "https://i.pravatar.cc/150?img=2",
      phone: "01712345678",
      email: "sarah@example.com",
      createdAt: "2024-04-14",
      block: true,
    },
  ];

  const transformedData = dummyUsers.map((user) => ({
    key: user._id,
    image: user.img,
    userName: user.name,
    contactNumber: user.phone || "N/A",
    email: user.email,
    joined: user.createdAt,
    status: user.block ? "Blocked" : "Active",
    userData: user,
  }));

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <img
            src={record.image}
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="text-gray-900 font-medium">{text}</span>
        </div>
      ),
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Joined",
      dataIndex: "joined",
      key: "joined",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <div
          className={`badge ${
            text === "Active" ? "bg-green-500" : "bg-red-500"
          } text-white py-1 px-3 rounded w-[100px] flex items-center justify-center`}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            icon={<FaUserCircle />}
            className="bg-blue-800 text-white"
            onClick={() => handleViewProfile(record)}
          />
          <Button
            type="primary"
            icon={<MdBlock />}
            className={
              selectedUser?.key === record.key
                ? "bg-blue-500 text-white"
                : "bg-red-500 text-white"
            }
            onClick={() => openStatusModal(record)}
          />
        </div>
      ),
    },
  ];

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const openStatusModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalVisible(true);
  };

  const handleStatusToggle = () => {
    Modal.success({
      title: "Status Changed (UI Only)",
      content: "This is a frontend-only design, no backend updated.",
    });
    setIsDeleteModalVisible(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mb-20">
      {!dashboardHome && (
        <h1
          className="text-xl font-semibold cursor-pointer mt-5"
          onClick={() => navigate(-1)}
        >
          ← Users
        </h1>
      )}

      <Table
        columns={columns}
        dataSource={transformedData}
        pagination={{
          position: ["bottomCenter"],
          current: currentPage,
          pageSize: 10,
          total: dummyUsers.length,
          onChange: handlePageChange,
          showSizeChanger: false,
        }}
        className="mt-5"
      />

      {/* ---------------- Profile Modal ---------------- */}
      {selectedUser && (
        <Modal
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          centered
          width={450}
        >
          <div className="flex flex-col items-center text-center">
            <Image
              src={selectedUser.image}
              className="w-32 h-32 rounded-full mb-4 object-cover"
              width={100}
              height={100}
            />
            <h2 className="text-xl font-semibold">{selectedUser.userName}</h2>
            <p className="text-gray-600">{selectedUser.contactNumber}</p>
            <p className="text-gray-600">{selectedUser.email}</p>
            <p className="text-gray-600">{selectedUser.status}</p>
          </div>
        </Modal>
      )}

      {/* ---------------- Block/Unblock Modal ---------------- */}
      <Modal
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onOk={handleStatusToggle}
        okText={
          selectedUser?.status === "Active" ? "Yes, block" : "Yes, unblock"
        }
        cancelText="Cancel"
        centered
        okButtonProps={{
          style: { backgroundColor: "red", borderColor: "red" },
        }}
        cancelButtonProps={{
          style: {
            backgroundColor: "blue",
            borderColor: "blue",
            color: "white",
          },
        }}
      >
        <div
          className="text-lg bg-no-repeat bg-left-top bg-contain h-[200px]"
          // style={{
          //   backgroundImage: `url(${deleteUser})`,
          // }}
        >
          <div className="flex justify-center items-end">
            <IoIosWarning className="text-7xl text-yellow-400" />
          </div>
          <div className="font-bold text-5xl text-center">Warning</div>
          <div className="p-5 text-center text-red-700">
            Are you sure you want to{" "}
            {selectedUser?.status === "Active" ? "block" : "unblock"} this user?
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Users;
