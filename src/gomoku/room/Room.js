import './Room.less';
import {useState} from 'fiddlehead';
import {AddTable} from '../add-table/AddTable';
import {TableViewer} from '../table-viewer/TableViewer';
import {UserName} from '../user-name/UserName';

export let Room = ({ myself, users, tables, now, setGameData }) => {
    let [shouldShowAddTable, setShouldShowAddTable] = useState(false);

    let tableCount = Object.keys(tables).length;

    return (
        <div class="Room">
            <h3>Hi, {myself.name}</h3>
            {tableCount > 0 && (
                <div class="tables">
                    {Object.values(tables).map((table) => (
                        <TableViewer
                            key={table.code}
                            table={table}
                            users={users}
                            myself={myself}
                            now={now}
                            setGameData={setGameData}
                        />
                    ))}
                </div>
            )}
            {tableCount < 32 && (
                <div class="new-table">
                    <div class="toggle-heading">
                        <span onClick={() => setShouldShowAddTable(!shouldShowAddTable)}>
                            New table
                        </span>
                    </div>
                    {shouldShowAddTable && (
                        <AddTable myself={myself} setGameData={setGameData} />
                    )}
                </div>
            )}
            <div class="users">
                <div class="heading">People in the room:</div>
                <div class="user-list">
                    {Object.values(users).map(user => (
                        <div key={user.id}>
                            <UserName user={user} now={now} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
