import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client </h2>

    <input id="jwt-token" placeholder="JSON Web Token" />
    <button id="btn-connect">Conected</button>
    <br/>


    <span id="server-status">Offline</span>

    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input placeholder="message" id="message-input">
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>

  </div>
`

const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token');
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect');

btnConnect?.addEventListener('click', () => {
  const token = jwtToken?.value?.trim() ?? ''; 

  if (token.length <= 0) {
    alert('Enter a valid JWT');
    return;
  }

  connectToServer(token);
});

//connectToServer();
