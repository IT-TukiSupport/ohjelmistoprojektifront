import { useEffect, useState } from "react";
import { redirect, useLocation } from "react-router-dom";

function Query() {

    const location = useLocation();
    const { from } = location.state;

    const [query, setQuery] = useState([]); // tarkista myöhemmin
    const [answer, setAnswer] = useState([]);
    const [answersList, setAnswersList] = useState([]);


    const handleBlur = () => {
        const isAnswerExists = answersList.some(item => item.question.questionid === answer.question.questionid);

        if (isAnswerExists) {
            setAnswersList(prevAnswersList =>
                prevAnswersList.map(item => {
                    if (item.question.questionid === answer.question.questionid) {
                        return answer;
                    } else {
                        return item;
                    }
                })
            );
        } else {
            setAnswersList(prevAnswersList => [...prevAnswersList, answer]);
        }
    };

    useEffect(() => {
        setQuery(from)
    }, []);

    const saveAnswers = () => {
        fetch('http://localhost:8080/saveanswer', {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(answersList)
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when saving answers: " + response.statusText)

                return response.json();
            })
            .catch(err => console.error(err))
    }


    return (

        <>
            {query.questions && query.questions.length > 0 ? (
                <div>
                    <h1>{query.name}</h1>

                    <p>{query.desc}</p>

                    <table>
                        <tbody>
                            {query.questions.map((question) =>
                                <tr key={question.questionid}>
                                    <td>{question.questionText}</td>
                                    <td><textarea type="text" rows='10' cols='50' onBlur={handleBlur} onChange={e => setAnswer({ ...answer, question: { questionid: question.questionid }, answerText: e.target.value })} /></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Ei kysymyksiä saatavilla.</p>
            )}
            <button onClick={() => saveAnswers()}>save</button>


        </>

    )

}



export default Query;