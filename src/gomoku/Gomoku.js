import './Gomoku.less';
import {useEffect, useState} from 'fiddlehead';
import {AddUser} from './add-user/AddUser';
import {Room} from './room/Room';
import {Table} from './table/Table';

let withWrapper = (content) => (
    <div class="Gomoku">{content}</div>
);

export let Gomoku = () => {
    let [gameData, setGameData] = useState(null);

    useEffect(() => {
        let refresh = () => {
            let userId = localStorage.getItem('userId');
            fetch(`/gomoku/game-data?userId=${userId}`).then(res => res.json()).then(setGameData);
        };
        refresh();
        let intervalId = setInterval(refresh, 1000);
        return () => clearInterval(intervalId);
    }, []);

    if (gameData === null) {
        return withWrapper('Loading...');
    }

    let {users, tables, now} = gameData;
    
    let myUserId = localStorage.getItem('userId');
    let myself = users[myUserId];
    
    if (myself == null) {
        return withWrapper(<AddUser setGameData={setGameData} />);
    }
    
    if (myself.playingTableCode == null) {
        return withWrapper(<Room tables={tables} myself={myself} users={users} now={now} setGameData={setGameData} />);
    }
    
    let myTable = tables[myself.playingTableCode];
    
    return withWrapper(<Table table={myTable} myself={myself} users={users} now={now} setGameData={setGameData} />);
};
