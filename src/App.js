import React, {useState} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { duotoneDark } from '@uiw/codemirror-theme-duotone';
import { python } from '@codemirror/lang-python';
import axios from 'axios';



function App() {
  const defaultSnippet = "print('Hello World Python!!')";
  const [code, setCode] = useState(defaultSnippet);
  const [output, setOutput] = useState("");

  const onChange = React.useCallback((value, viewUpdate) => {
    console.log('value:', value);
    setCode(value);
  }, []);

  const onClick = () =>{
    console.log(code);
    var data = code; 

    var config = {
      method: 'post',
      url: 'http://localhost:5000/submit',
      headers: { 
        'Content-Type': 'text/plain'
      },
      withCredentials: false,
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(response.data);
      setOutput(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <>
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