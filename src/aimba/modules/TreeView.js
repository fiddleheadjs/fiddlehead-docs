import './TreeView.less';
import {useState} from 'fiddlehead';
import {TriangleDown, TriangleUp} from '../icons';
import {TreeViewCard} from './TreeViewCard';

let isSingleColumnOrUnknown = () => {
    return globalThis.innerWidth == null || globalThis.innerWidth <= 600;
};

let isTwinColumnOrUnknown = () => {
    return globalThis.innerWidth == null || globalThis.innerWidth > 600;
};

export let TreeView = ({data}) => {
    let [variableExpandedIndexes, setVariableExpandedIndexes] = useState(() => {
        return isTwinColumnOrUnknown() ? [0, 1] : [0];
    });
    let fixedExpandedIndexes = [];
    let expandedIndexes = [...fixedExpandedIndexes, ...variableExpandedIndexes];
    
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
            <div class="cards">
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
