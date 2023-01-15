// import React from 'react';
// import { Icon, Button } from 'antd';
// // import '../styles/Toolbar.css';
//
// const Toolbar = () => {
//     return (
//         <div className="toolbar">
//             <div className="toolbar-title">My Toolbar</div>
//             <div className="toolbar-connexion">
//                 <Icon type="login" />
//                 <Button>Connexion</Button>
//             </div>
//             <div className="toolbar-search">
//                 <input type="text" placeholder="Search" />
//             </div>
//         </div>
//     );
// }
// export default Toolbar;
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
                <div style={{ color: '#fff', fontSize: '24px', margin: '0 20px' }}>Space Of the Day</div>
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