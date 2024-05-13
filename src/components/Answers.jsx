import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import _ from "lodash";
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';

function Answers() {

    const location = useLocation();
    const { from } = location.state;
    const [query, setQuery] = useState([]);

    useEffect(() => {
        setQuery(from);
    }, []);

    const generateChartDataForQuestion = (question) => {
        const answers = question.answers.map(answer => answer.answerText);

        const groupByAnswer = _.groupBy(answers);
        const choiceSum = _.mapValues(groupByAnswer, group => group.length);

        return Object.keys(choiceSum).map(answerText => ({
            name: answerText,
            value: choiceSum[answerText]
        }));
    }

    const colors = ['purple', 'blue', 'violet', 'green', 'blue', 'yellow']; // värejä voi muutella sitten


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
                                                : <PieChart width={300} height={300}>
                                                        <Pie
                                                            data={generateChartDataForQuestion(question)}
                                                            dataKey="value"
                                                            nameKey="name"
                                                            cx="50%"
                                                            cy="50%"
                                                            outerRadius={80}
                                                            label
                                                            >
                                                         {generateChartDataForQuestion(question).map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                                            ))}

                                                    </Pie>
                                                        <Tooltip />
                                                        <Legend />
                                                    </PieChart>
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