import './Board.less';
import {useCallback, useEffect, useMemo, useRef, useState} from 'fiddlehead';
import {Cell} from '../cell/Cell';
import {findStreak, getWonTeamId} from '../utils';
import {TimingBar} from '../timing-bar/TimingBar';

export let Board = ({
    remoteMatrix,
    isMyTurn = false,
    teamId = null,
    userId = null,
    tableCode = null,
    moveDuration = null,
    setGameData = null
}) => {
    // MATRIX
    let [matrix, setMatrix] = useState(remoteMatrix);

    useEffect(() => {
        setMatrix(remoteMatrix);
    }, [String(remoteMatrix)]);

    // STREAK
    let streak = useMemo(() => findStreak(matrix), [matrix]);

    let wonTeamId = getWonTeamId(streak, matrix);

    let tableElementRef = useRef(null);

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
            let table = tableElementRef.current;
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
    
    // MOVE
    let [isWaitingForMove, setIsWaitingForMove] = useState(false);
    
    useEffect(() => {
        setIsWaitingForMove(isMyTurn && streak === null);
    }, [isMyTurn, streak === null]);

    let isViewer = (
        teamId === null ||
        userId === null ||
        tableCode === null ||
        moveDuration === null ||
        setGameData === null
    );
    
    let viewOnly = isViewer || !isWaitingForMove;

    let makeMoveTo = useCallback((rx, cx) => {
        if (viewOnly) {
            return;
        }
        let isCellAvailable = matrix[rx][cx] === 2;
        if (!isCellAvailable) {
            return;
        }
        setIsWaitingForMove(false);
        setMatrix(matrix => {
            let row = [...matrix[rx]];
            row[cx] = teamId;
            matrix[rx] = row;
            return [...matrix];
        });
        fetch(`/gomoku/move?row=${rx}&cell=${cx}&userId=${userId}&tableCode=${tableCode}`).then(res => res.json()).then(data => {
            setGameData(data);
        });
    }, [viewOnly, matrix, userId, tableCode, setGameData]);

    return (
        <div class="Board">
            <table ref={tableElementRef}>
                {isViewer || (
                    <TimingBar
                        isWaitingForMove={isWaitingForMove}
                        moveDuration={moveDuration}
                        teamId={teamId}
                        matrix={matrix}
                        makeMoveTo={makeMoveTo}
                    />
                )}
                <tbody>
                    {matrix.map((row, rx) => (
                        <tr>
                            {row.map((value, cx) => (
                                <Cell
                                    value={value}
                                    teamId={teamId}
                                    viewOnly={viewOnly}
                                    makeMoveHere={() => {
                                        makeMoveTo(rx, cx);
                                    }}
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
                        stroke={wonTeamId === 0 ? 'red' : 'blue'}
                        stroke-opacity="0"
                        stroke-linecap="round"
                        stroke-width={streakLineData.strokeWidth}
                    >
                        <set
                            attributeName="stroke-opacity"
                            begin="0s"
                            to="0.25"
                        />
                        <animate
                            attributeName="x2"
                            begin="0s"
                            dur="1s"
                            from={streakLineData.x1}
                            to={streakLineData.x2}
                        />
                        <animate
                            attributeName="y2"
                            begin="0s"
                            dur="1s"
                            from={streakLineData.y1}
                            to={streakLineData.y2}
                        />
                    </line>
                </svg>
            )}
        </div>
    );
};
