import {Image, Layout, Card, Button, Space, Drawer} from "antd";
import {InfoCircleFilled, YoutubeFilled} from "@ant-design/icons"
import Toolbar from "./Toolbar";
import React, {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {arrayRemove, arrayUnion, doc, getDoc, getFirestore, setDoc} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../config/firebase";
const { Meta } = Card;

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const Pictures = ({ picture, user }) => {

    const [isFavorite, setIsFavorite] = useState(null);

    console.log(picture)
    const handleFavoriteClick = async () => {
        setIsFavorite(!isFavorite);
        if (!isFavorite) {
            await setDoc(
                doc(db, "users", user.id),
                {
                    favorites: arrayUnion(picture),
                },
                {merge: true}
            );
        } else {
            await setDoc(
                doc(db, "users", user.id),
                {
                    favorites: arrayRemove(picture),
                },
                {merge: true}
            );
        }
    };

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const filterLink = (url) => {
        if (url.includes(".youtube.com")) {
            // Replace the URL with the thumbnail link
            const videoId = url.split("embed/")[1];
            const videoId2 = videoId.split("?")[0];
            // Construct the thumbnail URL
            return `https://img.youtube.com/vi/${videoId2}/hqdefault.jpg`;
        } else {
            return url;
        }
    }

    return (
        <Card
              className="test"
              hoverable
              style={{width : 400, margin : "1%"}}
              cover={<Image src={filterLink(picture.url)} style={{minHeight:"30vh",maxHeight:"30vh", objectFit: "cover"}}/>}
        >
            <Meta title={picture.url.includes(".youtube.com") ?
                <><a href={picture.url} target="_blank" rel="noopener noreferrer"><YoutubeFilled style={{color:'red'}} /> {picture.title}</a></>
                : picture.title} />
            <div className="info-card">
                <div>
                    <Button onClick={handleFavoriteClick}>
                        {isFavorite ? "Remove from favorites" : "Add to favorites"}
                    </Button>
                </div>
                <Button type="primary" onClick={() => showDrawer()}>
                    <InfoCircleFilled />
                </Button>
            </div>
            <Drawer title="Informations" placement="right" onClose={onClose} open={open} maskStyle={{ opacity: 0.2 }}>
                <div className={"drawer-div"}>
                    <p className="black-text">Titre : {picture.title}</p>
                    <p className="black-text">Date : {picture.date}</p>
                    <p className="black-text">Description : {picture.explanation}</p>
                    <p className="black-text" style={{maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        Lien : <a href={picture.url} target="_blank" rel="noopener noreferrer">{picture.url}</a>
                    </p>
                </div>
            </Drawer>
        </Card>
    );

}

export default Pictures;