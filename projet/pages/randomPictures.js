import TablePictures from "../components/TablePictures";
const randomPictures = ({images, error}) => {
    return <TablePictures images={images} error={error}/>
}

export async function getStaticProps(context){
    return getImages()
        .then(images => {
            if (images.props.error === undefined) {
                return images;
            } else {
                console.log("Rien trouvé")
                return {
                    props:{
                        error: {
                            code:404,
                            message:"Aucune image trouvé, veuillez réactualiser la page !"
                        }
                    }
                }
            }
        });
}

export async function getImages(){
    try{
        const data = await fetch(`https://api.nasa.gov/planetary/apod?api_key=roE59htYbm7V2FSCNEULi8Ne7pqsJZIXDh2FRioQ&count=9`);
        const images = await data.json();
        return{
            props: {
                images: images,
            }
        }
    }
    catch (error) {
        return{
            props: {
                error: error
            }
        }
    }
}

export default randomPictures;