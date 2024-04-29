import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";

function Answers() {

    const location = useLocation();
    const { from } = location.state;
    const [query, setQuery] = useState([]);

    useEffect(() => {
        setQuery(from);
    }, []);

    return (
        <>
            <Link to='/'><button>Back to queries</button></Link>

            {query.questions && query.questions.length > 0 ? (
                <div>
                    <h1>{query.name}</h1>

                    <p>{query.desc}</p>

                    <table className="center">
                        <tbody>
                            {query.questions.map((question) => (
                                <React.Fragment key={question.questionid}>
                                    <tr>
                                        <td className="myTD">{question.questionText}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <ul className="myUL">
                                                {question.answers.map(answer => (
                                                    <li key={answer.answerid}>
                                                        {answer.answerText}</li>
                                                ))}
                                            </ul>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Ei vastauksia saatavilla!</p>

            )}
        </>
    )
}

export default Answers;