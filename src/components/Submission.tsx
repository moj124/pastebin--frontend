// import './css/Form.css';
import React, { useState } from "react";
import DtPicker from 'react-calendar-datetime-picker';
import 'react-calendar-datetime-picker/dist/index.css';

interface Submission {
  toggle: boolean;
  setToggle(bool: boolean): void;
}

export function Submission({ toggle, setToggle }: Submission): JSX.Element {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null)
  const handleSubmission = (e: React.FormEvent) => {
    console.log(date)
    e.preventDefault();

    fetch("https://aqueous-hollows-72286.herokuapp.com/pastes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        message: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmission}>
        <div id='titlebar'>
          <input
            id="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          ></input>
          <DtPicker 
            onChange={setDate}
            withTime
          />
        </div> 
        <textarea
          id="message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        ></textarea>
        
        <button onClick={() => setToggle(!toggle)}>Publish</button>
      </form>
    </>
  );
}
