import { useEffect, useState } from "react";


function Querylist() {

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


    const saveAnswers = () =>{
        fetch('http://localhost:8080/saveanswer', {
            method: "POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify(answersList)
        })
        .then(response => {
            if(!response.ok)
                throw new Error("Error when saving answers: " + response.statusText)

            return response.json();
        })
        .catch(err => console.error(err))
    }


    return (

        <>
            <h1>{query.length > 0 && query[0].name}</h1>

            <table>
                <tbody>
                    {query.map((queries) =>
                        queries.questions.map((question) =>
                            <tr key={question.questionid}>
                                <td>{question.questionText}</td>
                                <td><input type="text" onBlur={handleBlur} onChange={e => setAnswer({...answer, question: {questionid: question.questionid}, answerText: e.target.value})}/></td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
            <button onClick={() => saveAnswers()}>save</button>
            

        </>

    )

}



export default Querylist;