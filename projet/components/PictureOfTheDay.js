import {Image, Layout, Card, Button, message} from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import Toolbar from "./Toolbar";
import React, {useEffect} from "react";
import { useState } from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {doc, setDoc, getDoc, getFirestore, arrayUnion, arrayRemove} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../config/firebase";
const { Meta } = Card;

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const PictureOfTheDay = ({image, error}) => {

    const [user, setUser] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        const userLog = onAuthStateChanged(auth, async (user) => {
            console.log(user)
            if (user) {
                const docSnap = await getDoc(doc(db, "users", user.uid));
                console.log(docSnap);
                console.log("affichage Docsnap")
                if (docSnap.exists()) {
                    const favorites = docSnap.get("favorites");
                    if (favorites) {
                        const isFav = favorites.find(fav => fav.url === image.url);
                        setIsFavorited(!!isFav);
                    }
                    setUser({...docSnap.data(), id : user.uid});
                } // else message.warning("User not found");
            } else {
                setUser(null);
            }
        });
        return () => userLog();
    }, []);

    console.log(user);

    const handleFavoriteClick = async () => {
        if (!user) {
            message.warning("Vous devez être connecté pour ajouter un favori");
            return;
        }
        setIsFavorited(!isFavorited);
        if (!isFavorited) {
            await setDoc(
                doc(db, "users", user.id),
                {
                    favorites: arrayUnion(image),
                },
                { merge: true }
            );
        } else {
            await setDoc(
                doc(db, "users", user.id),
                {
                    favorites: arrayRemove(image),
                },
                { merge: true }
            );
        }
    };

    return (
        <Layout>
            <div className="bg" style={{overflowX:"hidden"}}>
                <Toolbar user={user}/>
                <div className="card_container">
                    <Card className="test"
                          hoverable
                          style={{
                              borderRadius: "1em",
                              padding: "1em",
                              display: "flex",
                              flexDirection: "column",
                              width: "50%"
                          }}
                          cover={<Image src={image.url} style={{maxHeight:"50vh", objectFit: "cover"}}/>}

                    >
                        <Meta title={image.title} description={image.explanation} />
                        <Button onClick={handleFavoriteClick} style={{marginTop: "1em"}}>
                            {isFavorited ? "Remove from favorites" : "Add to favorites"}
                        </Button>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
export default PictureOfTheDay;