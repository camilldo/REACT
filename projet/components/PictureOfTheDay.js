import {Image, Layout} from "antd";
import Toolbar from "./Toolbar";
import React from "react";


const PictureOfTheDay = ({image, error}) => {
    console.log(image)
    return (
        <Layout>
            <div className="bg" style={{overflowY:"hidden",overflowX:"hidden",backgroundSize: "cover",minHeight:"100vh", maxHeight:"100%"}}>
                <Toolbar/>
                <Image
                    width={200}
                    src={image.url}
                />
            </div>
        </Layout>

    );
}
export default PictureOfTheDay;