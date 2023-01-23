import {Image, Layout, Card, Button} from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import Toolbar from "./Toolbar";
import React from "react";
import { useState } from "react";
const { Meta } = Card;


const PictureOfTheDay = ({image, error}) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const handleFavoriteClick = () => {
        setIsFavorited(!isFavorited);
    }
    return (
        <Layout>
            <div className="bg" style={{overflowX:"hidden"}}>
                <Toolbar/>
                <div className="card_container">
                    <Card className="test"
                          hoverable
                          style={{
                              borderRadius: "1em",
                              padding: "1em",
                              display: "flex",
                              flexDirection: "column",
                              margin: "50px",
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