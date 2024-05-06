import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

function Query() {

    const location = useLocation();
    const { from } = location.state;

    const navigate = useNavigate();

    const [query, setQuery] = useState([]); // tarkista myöhemmin
    const [answer, setAnswer] = useState([]);
    const [answersList, setAnswersList] = useState([]);
    const [selectedChoice, setSelectedChoice] = useState(null);


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

    const answersListNotNull = () => {
        if (answersList != 0) {
            saveAnswers();
            window.alert("Kiitos vastauksista!")
            navigate('/')
        } else {
            window.alert("Täytä ainakin yksi vastaus!")
        }

    }

    const saveAnswers = () => {
        
        fetch('http://localhost:8080/answers', {
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

    const handleRadioChange = (e, questionid) => {
        setSelectedChoice(e.target.value);
        const newAnswer = { question: { questionid: questionid }, answerText: e.target.value };
        setAnswer(newAnswer);
        setAnswersList(prevAnswersList => [...prevAnswersList, newAnswer]);

       
    };


    return (

        <> 
         <Link to='/'><button>Back to queries</button></Link>

            {query.questions && query.questions.length > 0 ? (
                <div>
                    <h1>{query.name}</h1>

                    <p>{query.desc}</p>

                    <table className="center">
                        <tbody>
                            {query.questions.map((question) =>
                                <tr key={question.questionid}>
                                    <td className="questionForm">{question.questionText}</td>

                                    {question.questionType == "TEXT"
                                    ? <td className="questionForm"><textarea type="text" rows='10' cols='50' onBlur={handleBlur} onChange={e => setAnswer({ ...answer, question: { questionid: question.questionid }, answerText: e.target.value })} /></td>
                                    : <td>{question.choices.map((choice =>
                                        <div className="myDIV" key={choice.choiceId}>
                                            <input type="radio"
                                            value={choice.choiceText} 
                                            onChange={(e) => handleRadioChange(e, question.questionid)}  
                                            checked={selectedChoice === choice.choiceText}
                                           
                                            />
                                        {choice.choiceText}
                                            

                                        </div>

                                    ))} </td>
                                    }
                                    
                                </tr> 
                            )}
                        </tbody>
                    </table>

                    <button onClick={() => answersListNotNull()}>Save answers</button>

                </div>
                                
            ) : (
                <p>Ei kysymyksiä saatavilla.</p>
            )}
        </>

    )

}



export default Query;