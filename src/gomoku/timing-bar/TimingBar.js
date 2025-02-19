import './TimingBar.less';
import {Timer} from '../timer/Timer';
import {getRandomInteger, isInMatrix} from '../utils';

export let TimingBar = ({isWaitingForMove, moveDuration, teamId, matrix, makeMoveTo}) => {
    let getAvailableCells = () => {
        let availableCells = [];
        for (let rx = 0; rx < matrix.length; rx++) {
            for (let cx = 0; cx < matrix[rx].length; cx++) {
                if (matrix[rx][cx] === 2) {
                    availableCells.push([rx, cx]);
                }
            }
        }
        return availableCells;
    };

    let makeMoveRandomly = () => {
        let availableCells = getAvailableCells();
        if (availableCells.length === 0) {
            return;
        }
        let randomIndex = getRandomInteger(0, availableCells.length - 1);
        let [rx, cx] = availableCells[randomIndex];
        makeMoveTo(rx, cx);
    };

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
                <span>&nbsp;</span>
            )}
        </caption>
    );
};
