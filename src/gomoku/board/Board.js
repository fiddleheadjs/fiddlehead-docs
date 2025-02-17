import './Board.less';
import {useEffect, useMemo, useState} from 'fiddlehead';
import {Cell} from '../cell/Cell';
import {findStreak} from '../utils';

export let Board = ({ remoteMatrix, teamId, userId, tableCode, isMyTurn, setGameData }) => {
    let [moved, setMoved] = useState(false);
    
    useEffect(() => {
        if (isMyTurn) {
            setMoved(false);
        }
    }, [isMyTurn]);
    
    let matrixSize = remoteMatrix.length;

    let [matrix, setMatrix] = useState(() => {
        let matrix = [];
        for (let r = 0; r < matrixSize; r++) {
            let row = [];
            for (let c = 0; c < matrixSize; c++) {
                row[c] = 2;
            }
            matrix[r] = row;
        }
        return matrix;
    });

    useEffect(() => {
        setMatrix(remoteMatrix);
    }, [String(remoteMatrix)]);

    let streak = useMemo(() => findStreak(matrix), [matrix]);

    return (
        <table class="Board">
            <tbody>
                {matrix.map((row, rx) => (
                    <tr>
                        {row.map((value, cx) => (
                            <Cell
                                value={value}
                                teamId={teamId}
                                userId={userId}
                                tableCode={tableCode}
                                rx={rx}
                                cx={cx}
                                setMatrix={setMatrix}
                                streak={streak ?? []}
                                setMoved={setMoved}
                                locked={!isMyTurn || moved}
                                setGameData={setGameData}
                            />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
