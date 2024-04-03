import { useEffect, useState } from "react";


function Querylist() {

    const [query, setQuery] = useState([]); // tarkista myöhemmin

    useEffect(() => {
        fetchQuery();
    }, []);

    const fetchQuery = () => {
        fetch('http://localhost:8080/querys')
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in fetch: " + response.statusText);

                return response.json();
            })
            .then(data => setQuery(data))
            .catch(err => console.error(err))
    }

    return (

        <>
            <h1>{query[0].name}</h1>

            <table>
                <tbody>
                    {query.map((queries) =>
                        queries.questions.map((question) =>
                            <tr key={question.id}>
                                <td>{question.question}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>

        </>

    )

}



export default Querylist;