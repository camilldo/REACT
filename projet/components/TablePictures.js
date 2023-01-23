import {Image, Layout, Card, Button, Space, Drawer} from "antd";
import {InfoCircleFilled, YoutubeFilled} from "@ant-design/icons"
import Toolbar from "./Toolbar";
import React, {useState} from "react";
const { Meta } = Card;


const TablePictures = ({images, error}) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const handleFavoriteClick = () => {
        setIsFavorited(!isFavorited);
    }

    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const showDrawer = (index) => {
        setOpen(true);
        setCurrentIndex(index);
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

    // console.log(images)
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
                            <Meta title={images[index].url.includes(".youtube.com") ?
                                <><a href={images[currentIndex].url} target="_blank" rel="noopener noreferrer"><YoutubeFilled style={{color:'red'}} /></a> {images[index].title} </>
                                : images[index].title} />
                            <div className="info-card">
                                <div>
                                    <Button onClick={handleFavoriteClick}>
                                        {isFavorited ? "Remove from favorites" : "Add to favorites"}
                                    </Button>
                                </div>
                                <Button type="primary" onClick={() => showDrawer(index)}>
                                    <InfoCircleFilled />
                                </Button>
                            </div>
                            <Drawer key={{index}} title="Informations" placement="right" onClose={onClose} open={open} maskStyle={{ opacity: 0.2 }}>
                                <div className={"drawer-div"}>
                                    <p className="black-text">Titre : {images[currentIndex].title}</p>
                                    <p className="black-text">Date : {images[currentIndex].date}</p>
                                    <p className="black-text">Description : {images[currentIndex].explanation}</p>
                                    <p className="black-text" style={{maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                        Lien : <a href={images[currentIndex].url} target="_blank" rel="noopener noreferrer">{images[currentIndex].url}</a>
                                    </p>
                                </div>
                            </Drawer>
                        </Card>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
export default TablePictures;
