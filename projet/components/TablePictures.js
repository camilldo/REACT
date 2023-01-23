import {Image, Layout, Card, Button, Space, Drawer} from "antd";
import {InfoCircleFilled} from "@ant-design/icons"
import Toolbar from "./Toolbar";
import React, {useState} from "react";
const { Meta } = Card;


const TablePictures = ({images, error}) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const handleFavoriteClick = () => {
        setIsFavorited(!isFavorited);
    }

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

    console.log(images)
    return (
        <Layout>
            <div className="bg" style={{overflowX:"hidden"}}>
                <Toolbar/>
                <div className="card_container">
                        {new Array(9).fill(null).map((_, index) => (
                            <Card key={{index}}
                                  className="test"
                                  hoverable
                                  style={{width : 400, margin : "1%"}}
                                  cover={<Image src={filterLink(images[index].url)} style={{minHeight:"30vh",maxHeight:"30vh", objectFit: "cover"}}/>}
                            >
                                <Meta title={images[index].title} />
                                <div className="info-card">
                                    <div>
                                        <Button onClick={handleFavoriteClick}>
                                            {isFavorited ? "Remove from favorites" : "Add to favorites"}
                                        </Button>
                                    </div>
                                    <Button type="primary" onClick={showDrawer}>
                                        <InfoCircleFilled />
                                    </Button>
                                </div>
                                <Drawer key={{index}} title="Basic Drawer" placement="right" onClose={onClose} open={open}>
                                    <p className="black-text">Titre : {images[index].title}</p>
                                    <p className="black-text">Date : {images[index].date}</p>
                                    <p className="black-text">Description : {images[index].explanation}</p>
                                    <p className="black-text">Lien : {images[index].url}</p>
                                </Drawer>
                            </Card>
                        ))}
                </div>
            </div>
        </Layout>
    );
}
export default TablePictures;
