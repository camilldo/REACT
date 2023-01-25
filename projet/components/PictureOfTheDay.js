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

const PictureOfTheDay = () => {

    const [image, setImage] = useState(null);
    const [user, setUser] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);
    let data;

    useEffect(() => {
        let userLog;
        try {
            console.log("test")
            fetch(`https://api.nasa.gov/planetary/apod?api_key=roE59htYbm7V2FSCNEULi8Ne7pqsJZIXDh2FRioQ`)
                .then(res => res.json())
                .then(
                    async (result) => {
                        data = result;
                        console.log(result)
                        setImage(result)
                    },
                )
        } catch (error) {
            console.log(error);
        }

        userLog = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docSnap = await getDoc(doc(db, "users", user.uid));
                if (docSnap.exists()) {
                    const favorites = docSnap.get("favorites");
                    if (favorites) {
                        if(data){
                            const isFav = favorites.find(fav => fav.url === data.url);
                            setIsFavorited(!!isFav);
                        }
                    }
                    setUser({...docSnap.data(), id : user.uid});
                    console.log("Affichage du User 1");
                    console.log(user);
                    console.log(image);
                } // else message.warning("User not found");
            } else {
                setUser(null);
            }
        });
        return () => userLog();
    }, []);

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
                {image && image.url ?
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
                    :
                    null
                }
            </div>
        </Layout>
    );
}
export default PictureOfTheDay;