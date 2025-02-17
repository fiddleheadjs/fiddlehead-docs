import './EnterTable.less';
import {TableViewer} from '../table-viewer/TableViewer';

export let EnterTable = ({ myself, users, tables, setGameData }) => {
    let enterTable = (tableCode) => {
        fetch(`/gomoku/enter-table?userId=${myself.id}&tableCode=${tableCode}`).then(res => res.json()).then((data) => {
            setGameData(data);
        });
    };

    return (
        <div class="EnterTable">
            {Object.values(tables).map((table) => (
                <TableViewer key={table.code} table={table} users={users} enterTable={enterTable} />
            ))}
        </div>
    );
};
