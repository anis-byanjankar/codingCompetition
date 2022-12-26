import React, {useState} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { duotoneDark } from '@uiw/codemirror-theme-duotone';
import { python } from '@codemirror/lang-python';
import axios from 'axios';
import raw from './questions/q1001.py';


function App() {
  const [defaultSnippet,setSnippet] = useState("print('Hello World Python!!')\nprint('1234')\nfor x in range(10):\n\tprint(x)");
  
  const [code, setCode] = useState(defaultSnippet);
  const [output, setOutput] = useState("");

  const [participantCode, setParticipantCode] = useState("");
  const handleInput = event => {
    setParticipantCode(event.target.value);
  };
  
  fetch(raw)
  .then(r => r.text())
  .then(text => {
    console.log('text decoded:', text);
    setSnippet(text)
  });

  const onChange = React.useCallback((value, viewUpdate) => {
    console.log('value:', value);
    setCode(value);
  }, []);

  const onClick = () =>{
    console.log(code);
    var data = code; 

    var config = {
      method: 'post',
      url: 'http://dev.anishbyanjankar.com.np:5000/submit',
      headers: { 
        'Content-Type': 'text/plain',
        'Submission-Code': participantCode,
        'Question-Code': '1001'
      },
      withCredentials: false,
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(response.data);
      setOutput(JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <>
    {/* Make this input required from frontend.*/}
    <input onChange={handleInput} placeholder="Participant Code"/>
    <CodeMirror
      value={defaultSnippet}
      height="200px"
      theme={duotoneDark}
      extensions={[python()]}
      onChange={onChange}
    />
    <button onClick={onClick}>Submit</button>
    <div>
      {output}
    </div>
    </>
  );
}
export default App;