import './AddTable.less';
import {useState} from 'fiddlehead';
import {Button} from '../../components/button/Button';

export let AddTable = ({ myself, setGameData }) => {
    let [draftTableCode, setDraftTableCode] = useState('');

    let tableCode = draftTableCode.trim();

    let isValid = tableCode !== '';

    let onSubmit = (event) => {
        console.log({isValid, tableCode});
        event.preventDefault();
        if (!isValid) {
            return;
        }
        setDraftTableCode('');
        fetch(`/gomoku/add-table?userId=${myself.id}&tableCode=${tableCode}`).then(res => res.json()).then((data) => {
            setGameData(data);
        });
    };

    return (
        <form class="AddTable" onSubmit={onSubmit}>
            <div>
                <input type="text" placeholder="table code" value={draftTableCode} onInput={ev => setDraftTableCode(ev.target.value)} />
            </div>
            {isValid && (
                <Button type="submit">Add table</Button>
            )}
        </form>
    );
};
