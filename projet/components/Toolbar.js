import { UserOutlined } from "@ant-design/icons";
import { Col, Layout, Row } from "antd";
import Link from "next/link";
import React from "react";

const Toolbar = () => {
    const {Header} = Layout;
    return (
        <Header>
            <Row justify="space-between" style={{ color: "white" }}>
                <Col>
                    <Link href="/">Accueil</Link>
                </Col>
                <Col>
                    <Link href="/dashboard">
                        <UserOutlined />
                    </Link>
                </Col>
            </Row>
        </Header>
    );
}
export default Toolbar;
