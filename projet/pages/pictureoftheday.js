import PictureOfTheDay from "../components/PictureOfTheDay";
const pictureOfTheDay = ({image, error}) => {
    return <PictureOfTheDay image={image} error={error}/>
}

export async function getStaticProps(context){
    return getAlbum()
        .then(image => {
            console.log(image)
            if (image.props.image.error === undefined) {
                console.log("image trouvé")
                return image;
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

export async function getAlbum(){
    try{
        const data = await fetch(`https://api.nasa.gov/planetary/apod?api_key=roE59htYbm7V2FSCNEULi8Ne7pqsJZIXDh2FRioQ`);
        console.log("je passe la")
        const image = await data.json();
        console.log("image")
        console.log(image)
        return{
            props: {
                image: image,
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

export default pictureOfTheDay;