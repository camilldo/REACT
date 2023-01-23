import fetch from "node-fetch"

export default async function handler() {
    try {
        const data = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY");
        const image = await data.json();
        return {
            props:{
                image: image
            }
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
}