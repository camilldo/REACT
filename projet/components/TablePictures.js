import {Image, Layout, Card, Button, Space, Drawer} from "antd";
import {InfoCircleFilled, YoutubeFilled} from "@ant-design/icons"
import Toolbar from "./Toolbar";
import React, {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {doc, getDoc, getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../config/firebase";
import Pictures from "./Pictures";
const { Meta } = Card;

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);


const TablePictures = ({images, error}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const userLog = onAuthStateChanged(auth, async (user) => {
            console.log(user)
            if (user) {
                const docSnap = await getDoc(doc(db, "users", user.uid));
                console.log(docSnap);
                console.log("affichage Docsnap")
                if (docSnap.exists()) {
                    setUser({...docSnap.data(), id : user.uid});
                } // else message.warning("User not found");
            } else {
                setUser(null);
            }
        });
        return () => userLog();
    }, []);

    // console.log(images)
    return (
        <Layout>
            <div className="bg" style={{overflowX:"hidden"}}>
                <Toolbar user={user}/>
                <div className="card_container">
                    {new Array(9).fill(null).map((_, index) => (
                        <Pictures key={{index}} user={user} picture={images[index]}/>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
export default TablePictures;
