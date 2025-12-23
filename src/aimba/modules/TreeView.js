import './TreeView.less';
import {useRef, useState} from 'fiddlehead';
import {TriangleDown, TriangleUp} from '../icons';
import {TreeViewCard} from './TreeViewCard';

let isTwinColumnOrUnknownApproximately = () => {
    return window.innerWidth == null || window.innerWidth > 600;
};

export let TreeView = ({data}) => {
    let [variableExpandedIndexes, setVariableExpandedIndexes] = useState(() => {
        return isTwinColumnOrUnknownApproximately() ? [0, 1] : [0];
    });
    let fixedExpandedIndexes = [];
    let expandedIndexes = [...fixedExpandedIndexes, ...variableExpandedIndexes];
    
    let cardsRef = useRef(null);
    let isSingleColumnOrUnknown = () => {
        let grid = cardsRef.current;
        if (grid == null) {
            return true;
        }
        let {gridTemplateColumns} = getComputedStyle(grid);
        return !gridTemplateColumns.includes(' ');
    };

    let toggleExpanded = (index) => {
        if (fixedExpandedIndexes.includes(index)) {
            return;
        }
        let targetIndexes = isSingleColumnOrUnknown() ? [index] : (
            index % 2 === 0 ? [index, index + 1] : [index - 1, index]
        );
        setVariableExpandedIndexes((prevValue) => {
            if (variableExpandedIndexes.includes(index)) {
                return prevValue.filter(idx => !targetIndexes.includes(idx));
            }
            return targetIndexes;
        });
    };

    return (
        <div class="TreeView">
            <div class="growth-path">
                <TriangleUp />
                <div class="line" />
                <TriangleDown />
            </div>
            <div class="cards" ref={cardsRef}>
                {data.map(([title, description], index) => (
                    <TreeViewCard
                        key={title}
                        title={title}
                        description={description}
                        expanded={expandedIndexes.includes(index)}
                        toggleExpanded={() => toggleExpanded(index)}
                    />
                ))}
            </div>
        </div>
    );
};
