import React from 'react';
import Toolbar from './Toolbar';
import Link from "next/link";
import {Card, Col, Layout, Row} from 'antd';

const App = () => {
    return (
        <Layout>
            <div className="app">
                <Toolbar/>
                <div>
                    <div className="welcome-message">
                        Welcome to my website!
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
                                <Link href="/">
                                    <Card hoverable cover={<img alt="Page 1" src="./assets/imageTest.jpg"/>}>
                                        <Card.Meta title="Page 1"/>
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
                                        <Card.Meta title="Page 2"/>
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
                                        <Card.Meta title="Page 3"/>
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