import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import _ from "lodash";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

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
                                        {question.questionType == "TEXT"
                                        ? <ul className="myUL">
                                                {question.answers.map(answer => (
                                                    <li key={answer.answerid}>
                                                        {answer.answerText}</li>
                                                ))}
                                            </ul>
                                        :  <ResponsiveContainer width={300} height={300}>
                                        <PieChart>
                                            <Pie
                                                data={question.answers}
                                                dataKey="answerid"
                                                nameKey="answerText"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                fill="#8884d8"
                                                label
                                            />
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                            }
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