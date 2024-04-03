import { useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([]);

  const fetchQuestion = () => {
    fetch('localhost8080/api/queries/1/questions')
    .then(response => {
      if (!response.ok)
        throw new Error("Error in fetch: " + response.statusText);

        return response.json();

  })
  .then(data => setData(data._embedded.questions))
  .catch(err => console.error(err))

}



}

export default App
