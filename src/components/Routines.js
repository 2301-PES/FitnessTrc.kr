import { useEffect } from "react";

const allRoutines = async () => {

    

    

    useEffect(() => {
        async function fetchMyData() {

        try {
            const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/routines`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            const result = await response.json();
            return result 
        } catch (e) {
            console.log(e);
        }
    }
    }, [])
    
    return (
        <div>Placeholder on Routines</div>
    )
}

export default allRoutines;