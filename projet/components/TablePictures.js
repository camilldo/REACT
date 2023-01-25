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


const TablePictures = () => {

    const [images,setImages] = useState(null);
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

    useEffect(() => {
        try {
            console.log("test")
            fetch(`https://api.nasa.gov/planetary/apod?api_key=roE59htYbm7V2FSCNEULi8Ne7pqsJZIXDh2FRioQ&count=24`)
                .then(res => res.json())
                .then(
                    async (result) => {
                        console.log(result)
                        setImages(result)
                    },
                )
        } catch (error) {
            console.log(error);
        }
    }, [])

    // console.log(images)
    return (
        <Layout>
            <div className="bg" style={{overflowX:"hidden"}}>
                <Toolbar user={user}/>
                <div className="card_container">
                    { images ?
                    new Array(images.length).fill(null).map((_, index) => (
                        <Pictures key={{index}} user={user} picture={images[index]}/>
                    ))
                        :
                        null
                    }
                </div>
            </div>
        </Layout>
    );
}
export default TablePictures;
