import {useState} from 'fiddlehead';
import {AddTable} from '../add-table/AddTable';
import {EnterTable} from '../enter-table/EnterTable';
import './TableList.less';

export let TableList = ({ myself, users, tables, setGameData }) => {
    let [shouldShowAddTable, setShouldShowAddTable] = useState(false);

    let tableCount = Object.keys(tables).length;

    return (
        <div class="TableList">
            <h3>Hi, {myself.name}</h3>
            {tableCount > 0 && (
                <section>
                    <EnterTable myself={myself} users={users} tables={tables} setGameData={setGameData} />
                </section>
            )}
            {tableCount < 32 && (
                <section>
                    <div class="toggle-heading" onClick={() => setShouldShowAddTable(!shouldShowAddTable)}>
                        New table
                    </div>
                    {shouldShowAddTable && (
                        <AddTable myself={myself} setGameData={setGameData} />
                    )}
                </section>
            )}
        </div>
    );
};
