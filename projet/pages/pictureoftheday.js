import PictureOfTheDay from "../components/PictureOfTheDay";
const pictureOfTheDay = ({image, error}) => {
    return <PictureOfTheDay image={image} error={error}/>
}

export async function getStaticProps(context){
    return getImage()
        .then(image => {
            if (image.props.error === undefined) {
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

export async function getImage(){
    try{
        const data = await fetch(`https://api.nasa.gov/planetary/apod?api_key=roE59htYbm7V2FSCNEULi8Ne7pqsJZIXDh2FRioQ`);
        const image = await data.json();
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