import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Answers() {

    const location = useLocation();
    const { from } = location.state;
    const [query, setQuery] = useState([]);

  useEffect(() => {
        setQuery(from);
    }, []); 

   return (
    <>
    {query.questions && query.questions.length > 0 ? (
            <div>
            <h1>{query.name}</h1>
            
            <table className="center">
                <tbody>
                    {query.questions.map((question) => (
                        <>
                            <tr key={question.questionid}>
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
                        </>
                    ))}
                </tbody>
            </table>
            </div>
    ) : ( 
        <p>Ei vastauksia saatavilla!</p>
        
    )}
             <Link to='/'><button>Back to queries</button></Link>

    </>
)
}

export default Answers;