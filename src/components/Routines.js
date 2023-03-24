import { useEffect } from "react";

const allRoutines = async () => {

    

    try {
        const response = await fetch(`${BASE_URL}/routines`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const result = await response.json();
        return result 

    useEffect(() => {

    }, []

    } catch (e) {
        console.log(e);
    }
    return (

    )
}

export default allRoutines;