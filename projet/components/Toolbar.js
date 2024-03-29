import {UserOutlined, HomeOutlined, UserAddOutlined} from "@ant-design/icons";
import { Col, Layout, Row, message } from "antd";
import Link from "next/link";
import React from "react";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase";
import { getAuth, signOut } from "firebase/auth";

const firebaseApp = initializeApp(firebaseConfig);

const Toolbar = ({user}) => {
    const auth = getAuth(firebaseApp);

    const {Header} = Layout;
    console.log("print du user")
    console.log(user);
    return (
        <Header>
            <Row justify="space-between" style={{ color: "white" }}>
                <Col>
                    <Link href="/">
                        <HomeOutlined />
                         Accueil
                    </Link>
                </Col>
                <div style={{ color: '#fff', fontSize: '24px', margin: '0 20px' }}>Space Of the Day</div>
                <Col>
                    {user && user.pseudo !== "" && user.pseudo !== null && user !== {} ?
                    <Link href={{ pathname: '/user', props: { user }}}>
                        {user.pseudo} 
                        <UserOutlined />
                    </Link> :
                    <Link href="/login">
                        <UserAddOutlined />
                    </Link>
                    }
                </Col>
            </Row>
        </Header>
    );
}

export default Toolbar;