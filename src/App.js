import logo from './logo.svg';
import './App.css';
import { useState } from "react";


//import the web3js module
import { Web3 } from "web3";

//import the contract address and ABI

const ADDRESS = "0xE4BFbb41dCB3646648CDaeb43E518db2477a5458";
const ABI = [{"inputs":[{"internalType":"uint256","name":"startingPoint","type":"uint256"},{"internalType":"string","name":"startingMessage","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"decreaseNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"increaseNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"message","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newMessage","type":"string"}],"name":"setMessage","outputs":[],"stateMutability":"nonpayable","type":"function"}]

function App() {
  const [number, setNumber] = useState("none");
  const [currentMessage, setCurrentMessage] = useState("none");
  const [newMessage, setNewMessage] = useState("");

  //initializing the web3 object from the injected provider
  const web3 = new Web3(window.ethereum);

  //initializing the contract ABI and ADDRESS
  const myContract = new web3.eth.Contract(ABI,ADDRESS);

  // interacting with the reading functions
  // number
  async function getNumber(){
    const result = await myContract.methods.getNumber().call();
    setNumber(result.toString());
  }

    // message
  async function getMessage() {
    const message = await myContract.methods.message().call();
    setCurrentMessage(message);
  }

  // writing functions
  // number
  // increasing the number
  async function increaseNumber() {

    // connecting the account i.e wallet
    const accountsConnected = await web3.eth.requestAccounts();

    // the increasing function
    const tx = await myContract.methods.increaseNumber().send({from : accountsConnected[0] });

    getNumber();
  }
  // decreasing the number
  async function decreaseNumber(){

    //confirm or connect your account i.e wallet
    const accountsPresent = await web3.eth.requestAccounts();

    //the decreasing function
    const transact = await myContract.methods.decreaseNumber().send({ from: accountsPresent [0]});

    getNumber();
  }
     // message
     async function updateMessage(){
      const connectedAccounts = await web3.eth.requestAccounts();

      const Transaction = await myContract.methods.setMessage(newMessage).send({from:connectedAccounts[0]})

      getMessage();
     }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={getNumber}> Get number</button>
        <br />
        <button onClick={increaseNumber}>Increase Number</button>
        <br />
        <button onClick={decreaseNumber}>Decrease Number</button>
        <br />
        <p>Number: {number}</p>
        <br />
        <button onClick={getMessage}> Get message </button>
        <br/>
        <p>Message: {currentMessage} </p>
        <input
         type="text"
         value={newMessage}
         onChange= {(e) => setNewMessage (e.target.value)}
         placeholder= "Enter new Message"
        />
        <br />
        <button onClick={updateMessage}> Update Message</button>
        <br />
      </header>
    </div>
  );
}

export default App;
