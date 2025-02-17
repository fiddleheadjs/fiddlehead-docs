import './AddUser.less';
import {useState} from 'fiddlehead';
import { v4 as uuid } from 'uuid';
import {Button} from '../../components/button/Button';

export let AddUser = ({ setGameData }) => {
    let [draftUserName, setDraftUserName] = useState('');

    let userName = draftUserName.trim();

    let isValid = userName !== '';

    let onSubmit = (event) => {
        event.preventDefault();
        if (!isValid) {
            return;
        }
        setDraftUserName('');
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
                <input type="text" placeholder="your name" value={draftUserName} onInput={ev => setDraftUserName(ev.target.value)} />
            </div>
            {isValid && (
                <Button type="submit">Join {'>>'}</Button>
            )}
        </form>
    );
};
