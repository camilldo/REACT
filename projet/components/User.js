import Link from "next/link";
import React, {useEffect, useState} from "react";
import {
    Layout,
    Row,
    Col,
    message, Image, Button,
} from "antd";

import astro_icon from "/public/assets/astro_icon.jpg"

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
import Pictures from "./Pictures";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const User = () => {
    const auth = getAuth(firebaseApp);

    const [user, setUser] = useState(null);

    const logout = async () => {
        signOut(auth)
            .then(() => {
                message.info("Vous êtes bien déconnecté");
            })
            .catch((err) => {
                message.error("Une erreur s'est produite : " + err.message);
            });
    };

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

    const {Header} = Layout;
    console.log("print du user")
    console.log(user);
    return (
        <Layout>
            <div className="app bg" style={{overflowX:"hidden", minHeight:"100vh", maxHeight:"100%",backgroundSize: "cover",backgroundRepeat:"no-repeat"}}>
                <Toolbar user={user}/>
                <div style={{backgroundColor: "#404040", width: "95%", borderRadius: "10px", marginLeft: "2.5%"}}>
                    <h1>{user ?
                        <div>
                            <div style={{width: "100%", height: "265px", backgroundImage: "url(./assets/background.jpg)", borderTopRightRadius: "10px", borderTopLeftRadius: "10px", backgroundSize: "cover"}}>
                                <img src="../assets/astro_icon.jpg" style={{height: "265px", borderTopRightRadius: "25px", borderBottomRightRadius: "25px", borderTopLeftRadius: "10px"}}/>
                            </div>
                            <ul style={{listStyleType: "none"}}>
                                <li>
                                    <h3 style={{display: "inline-block", borderTop: "none"}}>Pseudo  :  </h3>{user.pseudo}
                                </li>
                                <li>
                                    <h3 style={{display: "inline-block", borderTop: "none"}}>Email  :  </h3>{user.email}
                                </li>
                            </ul>
                            <div style={{display: "flex", justifyContent: "flex-end"}}>
                                <Link href="/login" style={{marginBottom: "0.4%", marginRight: "0.4%"}}>
                                    <Button onClick={logout}>Déconnexion</Button>
                                </Link>
                            </div>
                        </div>
                        :
                        <p>Vous devez vous connecter</p>
                    }</h1>
                </div>
                <div style={{backgroundColor: "#404040", width: "95%", borderRadius: "10px", marginLeft: "2.5%"}}>
                    <ul style={{listStyleType: "none"}}>
                        <li>
                            <br/>
                            <h1 style={{marginTop: "1%"}}>VOS FAVORIS</h1>
                            {user && user.favorites ?
                                <div className="card_container">
                                    {Array.from({ length: user.favorites.length }).map((_, index) => (
                                        <Pictures key={{index}} user={user} picture={user.favorites[index]}/>
                                    ))}
                                </div>
                                :
                                "Vous n'avez aucun Favoris"
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </Layout>
    );
};

export default User;
