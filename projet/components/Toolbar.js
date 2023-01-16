import {UserOutlined, HomeOutlined, UserAddOutlined} from "@ant-design/icons";
import { Col, Layout, Row, message } from "antd";
import Link from "next/link";
import React from "react";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const firebaseApp = initializeApp(firebaseConfig);

const Toolbar = ({user}) => {
    const auth = getAuth(firebaseApp);
    const logout = async () => {
        signOut(auth)
            .then(() => {
                message.info("Vous êtes bien déconnecté");
            })
            .catch((err) => {
                message.error("Une erreur s'est produite : " + err.message);
            });
    };

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
                    <Link href="/login" onClick={logout}>
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