import {useState} from 'fiddlehead';
import { v4 as uuid } from 'uuid';

export let AddUser = ({ onDone }) => {
    let [userName, setUserName] = useState('');

    let onSubmit = (event) => {
        event.preventDefault();
        if (userName === '') {
            return;
        }
        let userId = uuid();
        sessionStorage.setItem('userId', userId);
        fetch(`/gomoku/add-user?userId=${userId}&userName=${userName}`).then(() => {
            onDone();
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <input placeholder="Enter your name" value={userName} onChange={ev => setUserName(ev.target.value)} />
            <button type="submit" disabled={userName === ''}>Add</button>
        </form>
    );
};
