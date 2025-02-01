import React from "react";
import { Button, Col, Divider, Input, Popconfirm, Row } from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Header.scss";

const { Search } = Input;

function Header({ addNewPath, hasSelected, handleSearch }) {
  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate("/" + addNewPath);
  };
  return (
    <>
      <Row className="header-row">
        <Col>
          <Search
            placeholder="Search"
            onSearch={handleSearch}
            allowClear
            className="header-search"
          />
        </Col>
        <Col flex="auto" className="header-actions">
          <Button
            icon={<PlusOutlined />}
            type="primary"
            className="header-button"
            onClick={handleAddNew}
          >
            Add New
          </Button>

          <Button
            icon={<DeleteOutlined />}
            disabled={!hasSelected}
            className="header-button"
          >
            <Popconfirm
              title="Sure to delete?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => {}}
            >
              Delete
            </Popconfirm>
          </Button>
        </Col>
      </Row>
      <Divider />
    </>
  );
}

export default Header;
