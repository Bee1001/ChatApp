import React from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Conversation from './components/Conversation/Conversation';
import ChatInfo from './components/ChatInfo/ChatInfo';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import './App.scss';

import { io } from 'socket.io-client';

export const socket = io('http://localhost:8080');

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    
                    <Route>
                        <Sidebar/>
                        <Route path='/chat/:roomId'>
                            <Conversation/>
                            <ChatInfo/>
                        </Route>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
