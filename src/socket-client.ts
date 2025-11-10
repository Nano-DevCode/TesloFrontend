import {Manager, Socket} from 'socket.io-client';

let socket: Socket;

export const connectToServer = (token: string) => {
    const manager = new Manager('https://teslobackend-lmd4.onrender.com//socket.io/socket.io.js',{
        extraHeaders: {
            hola: 'mundo', 
            authentication: token
        }
    });

    socket?.removeAllListeners();
    socket = manager.socket('/');
    
    addListeners();

}

const addListeners = () => {

    const serverStatusLabel = document.querySelector('#server-status')!;
    const clientUl = document.querySelector('#clients-ul')!;

    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    
    const messagesUl = document.querySelector('#messages-ul')!;

    socket.on('connect', () => {
        serverStatusLabel.innerHTML = "Connected"
    });
    socket.on('disconnect', ()=>{
        serverStatusLabel.innerHTML = "Disconnected"
    });

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHTML = '';
        clients.forEach(clientId => {
            clientsHTML += `
            <li>${clientId}</li>
            `;
        });

        clientUl.innerHTML = clientsHTML;
    });

    messageForm.addEventListener('submit',(event)=>{
        event.preventDefault();
        if(messageInput.value.trim().length <= 0) return;

        socket.emit('message-from-client',{id: 'YO!!', message: messageInput.value});

        messageInput.value="";
        
    });

    socket.on('message-from-server', (payload: {fullName: string, message:string})=>{
        
        const newMessage = `
        <li>
            <strong>${payload.fullName} </strong>
            <span>${payload.message} </span>
        </li>
        `

        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append(li);
        

    });
}