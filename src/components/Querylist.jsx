import { useEffect, useState } from "react";


function Querylist() {

    const [query, setQuery] = useState({}); // tarkista myöhemmin

    useEffect(() => {
        fetchQuery();
    }, []);

    const fetchQuery = () => {
        fetch('http://localhost:8080/queries')
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in fetch: " + response.statusText);

                return response.json();
            })
            .then(data => setQuery(data))
            .catch(err => console.error(err))
    }


}