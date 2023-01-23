import Toolbar from './Toolbar';
import Link from "next/link";
import {Card, Col, Layout, Row} from 'antd';
import pictureoftheday from "../pages/pictureoftheday";

import React, { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "../config/firebase";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            console.log(user)
            if (user) {
                const docSnap = await getDoc(doc(db, "users", user.uid));
                console.log(docSnap);
                console.log("affichage Docsnap")
                if (docSnap.exists()) {
                    setUser({...docSnap.data(), id : user.uid});
                } // else message.warning("User not found");
            }
        });
        return () => setUser(null);
    }, []);

    return (
        <Layout>
            <div className="app bg" style={{overflowX:"hidden", minHeight:"100vh", maxHeight:"100%",backgroundSize: "cover",backgroundRepeat:"no-repeat"}}>
                <Toolbar user={user}/>
                <div>
                    <div style={{textAlign: 'center', marginTop: '50px'}}>
                        <p style={{color: 'white', fontSize: '24px'}}>Welcome to the Space Of the Day page! Here you can explore
                            the latest and greatest in space exploration and technology.</p>
                    </div>
                    <div className="page-links">
                        <Row style={{padding: 32}} gutter={16} justify="center" align="middle">
                            <Col
                                xs={24}
                                sm={12}
                                md={8}
                                lg={6}
                                style={{marginBottom: 16}}
                            >
                                <Link href="/pictureoftheday">
                                    <Card hoverable cover={<img alt="Page 1" src="./assets/imageTest.jpg"/>}>
                                        <Card.Meta style={{textAlign: "center"}} title="Image du Jour"/>
                                    </Card>
                                </Link>
                            </Col>
                            <Col
                                xs={24}
                                sm={12}
                                md={8}
                                lg={6}
                                style={{marginBottom: 16}}
                            >
                                <Link href="/">
                                    <Card hoverable cover={<img alt="Page 2" src="./assets/imageTest.jpg"/>}>
                                        <Card.Meta style={{textAlign: "center"}} title="Images Aléatoires"/>
                                    </Card>
                                </Link>
                            </Col>
                            <Col
                                xs={24}
                                sm={12}
                                md={8}
                                lg={6}
                                style={{marginBottom: 16}}
                            >
                                <Link href="/">
                                    <Card hoverable cover={<img alt="Page 3" src="./assets/imageTest.jpg"/>}>
                                        <Card.Meta style={{textAlign: "center"}} title="Images Favorites"/>
                                    </Card>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default App;