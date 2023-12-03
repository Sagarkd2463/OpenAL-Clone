import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import gptLogo from '../src/assets/chatgpt.svg';
import addBtn from '../src/assets/add-30.png';
import msgIcon from '../src/assets/message.svg';

import home from '../src/assets/home.svg';
import save from '../src/assets/bookmark.svg';
import rocket from '../src/assets/rocket.svg';

import sendBtn from '../src/assets/send.svg';
import userIcon from '../src/assets/user-icon.png';
import gptImgLogo from '../src/assets/chatgptLogo.svg';

import { sendMsgToOpenAI } from './openai';

function App() {

  const msgEnd = useRef(null); //a reference hook that returns current value 

  const [input, setInput] = useState(""); //a state hook used to define input state from the user 
  const [messages, setMessages] = useState([ // a state hook for bot
    {
      text: "Hi, I am ChatGPT i.e. (Chat Generative Pre-trained Transformer) a large language model-based chatbot developed by OpenAI and launched on November 30, 2022, that enables users to refine and steer a conversation towards a desired length, format, style, level of detail, and language. Successive prompts and replies, known as prompt engineering, are considered at each conversation stage as a context.",
      isBot: true,
    }
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView(); //a hook that manipulates to the document object model(dom) 
  }, [messages]);

  const handleSend = async () => { 
    //setting initial values of both user & bot 
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      {text, isBot: false}
    ]);

    const response = await sendMsgToOpenAI(text); //setting values by passing async function of sending api request 
    setMessages([
      ...messages,
      {text, isBot: false},
      {text: response, isBot: true}
    ]);
  }

  const handleEnter = async (e) => {  //an event for handling enter key when it is pressed to send input from the user to the async handlesend function
    if(e.key === 'Enter'){
      await handleSend();
    }
  }

  const handleQuery = async (e) => { 
    //targeting values of two queries and sending their requests to the api 
    const text = e.target.value;
    setMessages([
      ...messages,
      {text, isBot: false}
    ]);

    const response = await sendMsgToOpenAI(text);
    setMessages([
      ...messages,
      {text, isBot: false},
      {text: response, isBot: true}
    ]);
  }

  return (
    <div className="App">
      <div className='sideBar'>
        <div className='upperSide'>
          <div className='upperSideTop'>
            <img src={gptLogo} alt='Logo' className='logo' />
            <span className='brand'>ChatGPT</span>
          </div>
          <button className='midBtn' onClick={() => (window.location.reload())}>
            <img src={addBtn} alt='new chat' className='addBtn' />
            New Chat
          </button>
          <div className='upperSideBottom'>
            <button className='query' onClick={handleQuery} value={" What is Programming?"}>
              <img src={msgIcon} alt='Query' className='' />
              What is Programming?
            </button>

            <button className='query' onClick={handleQuery} value={" How to use an API?"}>
              <img src={msgIcon} alt='Query' className='' />
              How to use an API?
            </button>
          </div>
        </div>

        <div className='lowerSide'>
          <div className='listItems'>
            <img src={home} alt='Home' className='listitemsImg' />
            Home
          </div>

          <div className='listItems'>
            <img src={save} alt='Saved' className='listitemsImg' />
            Save
          </div>

          <div className='listItems'>
            <img src={rocket} alt='Upgrade' className='listitemsImg' />
            Upgrade to Pro
          </div>
        </div>
      </div>

      <div className='main'>
        <div className='chats'>
      {/* mapping the messages through each message received with its unique key for both user & chatBot */}
          {messages.map((message, i) => 
            <div key={i} className={message.isBot ?'chat bot':'chat'}>
            <img src={message.isBot ? gptImgLogo : userIcon} className='chatImg' alt='' />
            <p className='txt'>{message.text}</p>
            </div>
          )}

          <div ref={msgEnd}/>
        </div>
        <div className='chatFooter'>
          <div className='inp'>
            <input type='text' value={input} placeholder='Send a message'
              onChange={(e) => { setInput(e.target.value) }}  //setting input value by targeting it to the user 
              onKeyDown={handleEnter}/>
            <button className='send' onClick={handleSend}>
              <img src={sendBtn} alt='send' />
            </button>
          </div>
          <p>ChatGPT may produce inaccurate information about
            people, places or facts. ChatGPT version November 20 Version.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
