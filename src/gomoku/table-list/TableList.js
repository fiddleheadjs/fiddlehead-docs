import './TableList.less';
import {useState} from 'fiddlehead';
import {AddTable} from '../add-table/AddTable';
import {TableViewer} from '../table-viewer/TableViewer';

export let TableList = ({ myself, users, tables, setGameData }) => {
    let [shouldShowAddTable, setShouldShowAddTable] = useState(false);

    let tableCount = Object.keys(tables).length;

    return (
        <div class="TableList">
            <h3>Hi, {myself.name}</h3>
            {tableCount > 0 && (
                <div class="all-tables">
                    {Object.values(tables).map((table) => (
                        <TableViewer
                            key={table.code}
                            table={table}
                            users={users}
                            myself={myself}
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
        </div>
    );
};
