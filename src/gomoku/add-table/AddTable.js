import './AddTable.less';
import {useState} from 'fiddlehead';
import {Button} from '../../components/button/Button';
import {sendPost} from '../utils';

export let AddTable = ({ myself, setGameData }) => {
    let [draftTableCode, setDraftTableCode] = useState('');

    let [moveDuration, setMoveDuration] = useState(8);

    let tableCode = draftTableCode.trim();

    let isValid = tableCode !== '' && moveDuration > 0;

    let onSubmit = (event) => {
        event.preventDefault();
        if (!isValid) {
            return;
        }
        setDraftTableCode('');
        let userId = myself.id;
        sendPost('add-table', {userId, tableCode, moveDuration}, setGameData);
    };

    return (
        <form class="AddTable" onSubmit={onSubmit}>
            <div>
                <input
                    type="text"
                    placeholder="table code"
                    value={draftTableCode}
                    onInput={event => {
                        setDraftTableCode(event.target.value);
                    }}
                />
            </div>
            <div>
                <select
                    onChange={(event => {
                        setMoveDuration(Number(event.target.value));
                    })}
                >
                    {[2, 3, 5, 8, 13, 21, 34, 55, 89].map(duration => (
                        <option value={duration} selected={duration === moveDuration}>
                            {duration} seconds/move
                        </option>
                    ))}
                </select>
            </div>
            <Button type="submit" disabled={!isValid}>Add table</Button>
        </form>
    );
};
