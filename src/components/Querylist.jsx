import { useEffect, useState } from "react";


function Querylist() {

    const [query, setQuery] = useState([]); // tarkista myöhemmin

    useEffect(() => {
        fetchQuery();
    }, []);

    const fetchQuery = () => {
        fetch('http://localhost8080/api/queries/1/questions')
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in fetch: " + response.statusText);

                return response.json();
            })
            .then(data => setQuery(data._embedded.questions))
            .catch(err => console.error(err))
    }

    return (

    <>
        <h1>Questions</h1>

        <table>
            <tbody>
                {query.map((query) => 
                <tr key={query.id}> 
                    <td> {query.question} </td>
                </tr>
                
                )}
            </tbody>
        </table>
    
    </>
    
        )
   
    }



export default Querylist;