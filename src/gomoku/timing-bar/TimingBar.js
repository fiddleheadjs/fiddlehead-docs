import './TimingBar.less';
import {Timer} from '../timer/Timer';
import {getRandomInteger, isInMatrix} from '../utils';
import {useMemo, useEffect, useCallback} from 'fiddlehead';
import {addWindowStateChangeListener, removeWindowStateChangeListener, STATE_ACTIVE, STATE_PASSIVE} from '../pageState';

export let TimingBar = ({isWaitingForMove, moveDuration, teamId, matrix, makeMoveTo}) => {
    let availableCells = useMemo(() => {
        let emptyCells = [];
        for (let rx = 0; rx < matrix.length; rx++) {
            for (let cx = 0; cx < matrix[rx].length; cx++) {
                if (matrix[rx][cx] === 2) {
                    emptyCells.push([rx, cx]);
                }
            }
        }
        return emptyCells;
    }, [matrix]);

    let makeMoveRandomly = useCallback(() => {
        if (availableCells.length === 0) {
            return;
        }
        let randomIndex = getRandomInteger(0, availableCells.length - 1);
        let [rx, cx] = availableCells[randomIndex];
        makeMoveTo(rx, cx);
    }, [availableCells, makeMoveTo]);

    useEffect(() => {
        let listener = (event) => {
            event.preventDefault();
            event.returnValue = true;
            makeMoveRandomly();
        };
        window.addEventListener('beforeunload', listener);
        return () => {
            window.removeEventListener('beforeunload', listener);
        };
    }, [makeMoveRandomly]);

    useEffect(() => {
        let listener = (state) => {
            if (!(state === STATE_ACTIVE || state === STATE_PASSIVE)) {
                makeMoveRandomly();
            }
        };
        addWindowStateChangeListener(listener);
        return () => {
            removeWindowStateChangeListener(listener);
        };
    }, [makeMoveRandomly]);

    let isFirstMove = !isInMatrix(teamId, matrix);

    return (
        <caption class="TimingBar">
            {isWaitingForMove ? (
                <Timer
                    isFirstMove={isFirstMove}
                    moveDuration={moveDuration}
                    makeMoveRandomly={makeMoveRandomly}
                />
            ) : (
                <span class="placeholder">&nbsp;</span>
            )}
        </caption>
    );
};
