import './Board.less';
import {useEffect, useMemo, useRef, useState} from 'fiddlehead';
import {Cell} from '../cell/Cell';
import {findStreak, getWonTeamId} from '../utils';

export let Board = ({ remoteMatrix, teamId, userId, tableCode, isMyTurn, setGameData }) => {
    let [moved, setMoved] = useState(false);
    
    useEffect(() => {
        if (isMyTurn) {
            setMoved(false);
        }
    }, [isMyTurn]);
    
    let [matrix, setMatrix] = useState(remoteMatrix);

    useEffect(() => {
        setMatrix(remoteMatrix);
    }, [String(remoteMatrix)]);

    let streak = useMemo(() => findStreak(matrix), [matrix]);

    let wonTeamId = getWonTeamId(streak, matrix);

    let boundaryElementRef = useRef(null);

    let [streakLineData, setStreakLineData] = useState(null);
    
    let streakDrawPad = 10;

    useEffect(() => {
        let findCellElement = (table, [row, column]) => {
            return table.querySelector(`tbody > tr:nth-child(${row + 1}) > td:nth-child(${column + 1})`);
        };

        let findCentralOfElement = (element) => {
            let { offsetLeft, offsetWidth, offsetTop, offsetHeight } = element;
            return [
                offsetLeft + offsetWidth / 2,
                offsetTop + offsetHeight / 2
            ];
        };

        let calculateStreakLineData = () => {
            let table = boundaryElementRef.current;
            if (table === null || streak === null) {
                return null;
            }
            
            let width = table.clientWidth;
            let height = table.clientHeight;
            let strokeWidth = (width + height) / 2 / matrix.length * 1.2;

            let startCell = findCellElement(table, streak[0]);
            let endCell = findCellElement(table, streak[4]);
            if (startCell === null || endCell === null) {
                return null;
            }

            let [x1, y1] = findCentralOfElement(startCell);
            let [x2, y2] = findCentralOfElement(endCell);

            return {
                width: width + 2 * streakDrawPad,
                height: height + 2 * streakDrawPad,
                x1: x1 + streakDrawPad,
                y1: y1 + streakDrawPad,
                x2: x2 + streakDrawPad,
                y2: y2 + streakDrawPad,
                strokeWidth
            };
        };

        let handle = () => {
            setStreakLineData(calculateStreakLineData());
        };

        handle();

        window.addEventListener('resize', handle);
        
        return () => {
            window.removeEventListener('resize', handle);
        };
    }, [streak]);

    return (
        <div class="Board">
            <table ref={boundaryElementRef}>
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
            {streakLineData !== null && (
                <svg viewBox={`0 0 ${streakLineData.width} ${streakLineData.height}`}>
                    <line
                        x1={streakLineData.x1}
                        y1={streakLineData.y1}
                        x2={streakLineData.x2}
                        y2={streakLineData.y2}
                        stroke-width={streakLineData.strokeWidth}
                        stroke-linecap="round"
                        stroke={wonTeamId === 0 ? 'rgba(255, 0, 0, 0.25)' : 'rgba(0, 0, 255, 0.25)'}
                    />
                </svg>
            )}
        </div>
    );
};
