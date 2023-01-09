import fetch from "node-fetch"

export default async function handler(req,res){
    const data = await fetch("https://api.deezer.com/album/${reg.body.id}");
    const album = await data.json();
    res.json(album);

}