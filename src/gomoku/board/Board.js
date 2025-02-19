import './Board.less';
import {useCallback, useEffect, useMemo, useRef, useState} from 'fiddlehead';
import {Cell} from '../cell/Cell';
import {findStreak, getWonTeamId} from '../utils';
import {TimingBar} from '../timing-bar/TimingBar';

export let Board = ({
    remoteMatrix,
    remoteMoveSequence,
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

    // MOVE SEQUENCE
    let [moveSequence, setMoveSequence] = useState(remoteMoveSequence);

    useEffect(() => {
        setMoveSequence(remoteMoveSequence);
    }, [String(remoteMoveSequence)]);

    // STREAK
    let streak = useMemo(() => findStreak(matrix), [matrix]);

    let wonTeamId = getWonTeamId(streak, matrix);

    // DRAW
    let [drawData, setDrawData] = useState(null);

    let tableElementRef = useRef(null);

    let drawPad = 10;

    let findCellElement = useCallback((table, [row, column]) => {
        return table.querySelector(`tbody > tr:nth-child(${row + 1}) > td:nth-child(${column + 1})`);
    }, []);

    let findCentralOfElement = useCallback((element) => {
        let {offsetLeft, offsetWidth, offsetTop, offsetHeight} = element;
        return [
            offsetLeft + offsetWidth / 2,
            offsetTop + offsetHeight / 2
        ];
    }, []);

    let handleSetDrawData = useCallback((calculateDrawData) => {
        let handle = () => {
            setDrawData(calculateDrawData());
        };
        handle();
        window.addEventListener('resize', handle);
        return () => {
            window.removeEventListener('resize', handle);
        };
    }, []);

    useEffect(() => {
        return handleSetDrawData(() => {
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
                canvas: {
                    width: width + 2 * drawPad,
                    height: height + 2 * drawPad,
                },
                streak: {
                    x1: x1 + drawPad,
                    y1: y1 + drawPad,
                    x2: x2 + drawPad,
                    y2: y2 + drawPad,
                    strokeWidth
                }
            };
        });
    }, [streak, findCellElement, findCentralOfElement]);

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
        setMoveSequence(moveSequence => [...moveSequence, [rx, cx]]);
        fetch(`/gomoku/move?row=${rx}&column=${cx}&userId=${userId}&tableCode=${tableCode}`).then(res => res.json()).then(data => {
            setGameData(data);
        });
    }, [viewOnly, matrix, userId, tableCode, setGameData]);

    // LAST MOVE
    let isLastMoveAt = (row, column) => {
        if (moveSequence.length === 0) {
            return false;
        }
        let [lastRow, lastColumn] = moveSequence[moveSequence.length - 1];
        return (
            row === lastRow &&
            column === lastColumn
        );
    };

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
                                    lastMoveHighlighted={streak === null && isLastMoveAt(rx, cx)}
                                    makeMoveHere={() => {
                                        makeMoveTo(rx, cx);
                                    }}
                                />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {drawData !== null && (
                <svg viewBox={`0 0 ${drawData.canvas.width} ${drawData.canvas.height}`}>
                    {drawData.streak != null && (
                        <line
                            x1={drawData.streak.x1}
                            y1={drawData.streak.y1}
                            x2={drawData.streak.x2}
                            y2={drawData.streak.y2}
                            stroke={wonTeamId === 0 ? 'red' : 'blue'}
                            stroke-opacity="0"
                            stroke-linecap="round"
                            stroke-width={drawData.streak.strokeWidth}
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
                                from={drawData.streak.x1}
                                to={drawData.streak.x2}
                            />
                            <animate
                                attributeName="y2"
                                begin="0s"
                                dur="1s"
                                from={drawData.streak.y1}
                                to={drawData.streak.y2}
                            />
                        </line>
                    )}
                </svg>
            )}
        </div>
    );
};
