import { useEffect, useState } from "react";
import Query from "./Query";
import { Link } from "react-router-dom";

function Queries() {
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        fetchQueries();
    }, []);

    const fetchQueries = () => {
        fetch('http://localhost:8080/querys')
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in fetch: " + response.statusText);

                return response.json();
            })
            .then(data => setQueries(data))
            .catch(err => console.error(err))
    }

    return (
        <>
            <h1>Queries</h1>

            <table>
                <tbody>
                    <tr>
                        <th>Query Name</th>
                    </tr>
                    {
                        queries.map((query) =>
                        <tr key={query.queryid}>
                            <td>{query.name}</td>
                            <td><Link to='/Query' state={{from: query}}>Vastaa</Link></td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    );
}

export default Queries;