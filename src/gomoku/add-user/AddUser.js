import './AddUser.less';
import {useState} from 'fiddlehead';
import { v4 as uuid } from 'uuid';
import {Button} from '../../components/button/Button';
import {sendPost} from '../utils';

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
        sendPost('add-user', {userId, userName}, setGameData);
    };

    return (
        <form class="AddUser" onSubmit={onSubmit}>
            <h3>Play Gomoku</h3>
            <div>Please enter your name</div>
            <div>
                <input
                    type="text"
                    value={draftUserName}
                    onInput={event => {
                        setDraftUserName(event.target.value);
                    }}
                />
            </div>
            <Button type="submit" disabled={!isValid}>
                <span>Join in</span>
                {' '}
                <svg viewBox="0 -960 960 960" height="1em">
                    <path fill="currentColor" d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
                </svg>
            </Button>
        </form>
    );
};
