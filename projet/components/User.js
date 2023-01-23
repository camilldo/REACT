import Link from "next/link";
import React, {useEffect, useState} from "react";
import {
    Layout,
    Row,
    Col,
    message,
} from "antd";

import {
    HomeOutlined,
    UserOutlined,
    UserAddOutlined
} from "@ant-design/icons";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import Toolbar from "./Toolbar";
import {doc, getDoc, getFirestore} from "firebase/firestore";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const User = () => {
    const auth = getAuth(firebaseApp);

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
        <Layout>
            <div style={{overflowX:"hidden", minHeight:"100vh", maxHeight:"100%",backgroundSize: "cover", backgroundImage: "url('./assets/background.jpg')",backgroundRepeat:"no-repeat"}}>
                <Toolbar user={user}/>
                <div style={{backgroundColor: "gray", width: "75%", borderRadius: "10px", marginLeft: "1%"}}>
                    <h1>{user ?
                        <div>
                            <div style={{width: "15%", paddingTop: "15%", backgroundColor: "white", backgroundImage: "url('./assets/astro_icon.jpg')", backgroundSize: "contain", borderRadius: "50%"}}></div>
                            <ul>
                                <li>
                                    <h2 style={{display: "inline-block"}}>Pseudo  :  </h2>{user.pseudo}
                                </li>
                                <li>
                                    {user.email}
                                </li>
                            </ul>
                        </div>
                        :
                        <p>test</p>
                    }</h1>
                </div>
            </div>
        </Layout>
    );
};

export default User;
