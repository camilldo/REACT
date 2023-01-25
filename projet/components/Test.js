import React, { useEffect } from "react";

const Test = () => {
    useEffect(() => {
        try {
            fetch(`https://api.nasa.gov/planetary/apod?api_key=roE59htYbm7V2FSCNEULi8Ne7pqsJZIXDh2FRioQ&count=2`)
                .then(res => res.json())
                .then(
                    async (result) => {
                        console.log(result)
                    },
                )
        } catch (error) {
            console.log(error);
        }
    }, [])

}
export default Test;