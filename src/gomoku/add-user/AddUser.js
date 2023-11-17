import './AddUser.less';
import {useState} from 'fiddlehead';
import { v4 as uuid } from 'uuid';
import {Button} from '../../components/button/Button';

export let AddUser = ({ setGameData }) => {
    let [userName, setUserName] = useState('');

    let onSubmit = (event) => {
        event.preventDefault();
        if (userName === '') {
            return;
        }
        setUserName('');
        let userId = uuid();
        localStorage.setItem('userId', userId);
        fetch(`/gomoku/add-user?userId=${userId}&userName=${userName}`).then(res => res.json()).then((data) => {
            setGameData(data);
        });
    };

    return (
        <form class="AddUser" onSubmit={onSubmit}>
            <h3>Play Gomoku</h3>
            <div>Please enter your name:</div>
            <div>
                <input type="text" placeholder="your name" value={userName} onInput={ev => setUserName(ev.target.value)} />
            </div>
            <Button type="submit" disabled={userName === ''}>{'Join >>'}</Button>
        </form>
    );
};
