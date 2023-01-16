// import React from 'react';
// import Toolbar from './Toolbar';
//
// const App = () => {
//     return (
//         <div className="app">
//             <Toolbar />
//         </div>
//     );
// }
//
// export default App;

import React from 'react';
import Toolbar from './Toolbar';
import Link from "next/link";
import {Card, Col, Layout, Row} from 'antd';
import pictureoftheday from "../pages/pictureoftheday";

const App = () => {
    return (
        <Layout>
            <div className="app bg" style={{overflowX:"hidden", minHeight:"100vh", maxHeight:"100%",backgroundSize: "cover",backgroundRepeat:"no-repeat"}}>
                <Toolbar/>
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