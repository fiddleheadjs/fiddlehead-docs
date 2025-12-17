import {useRef, useState} from 'fiddlehead';
import {TriangleDown, TriangleUp, Minus, Plus} from '../icons';
import './TreeView.less';

export let TreeView = ({data}) => {
    let [variableExpandedIndexes, setVariableExpandedIndexes] = useState([0, 1]);
    let fixedExpandedIndexes = [];
    let expandedIndexes = [...fixedExpandedIndexes, ...variableExpandedIndexes];

    let cardsRef = useRef(null);
    
    let isSingleColumn = () => {
        let style = getComputedStyle(cardsRef.current);
        let columns = style.gridTemplateColumns.split(' ');
        return columns.length === 1;
    };

    let toggleExpanded = (index) => {
        if (fixedExpandedIndexes.includes(index)) {
            return;
        }

        let targetIndexes = isSingleColumn() ? [index] : (
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
                {data.map(([title, description], index) => {
                    let expanded = expandedIndexes.includes(index);
                    return (
                        <div class={`card ${expanded ? 'expanded' : 'collapsed'}`} key={title}>
                            <div class="heading" onClick={() => toggleExpanded(index)}>
                                <div class="content">
                                    <div class="title">
                                        {title}
                                    </div>
                                    <div class="indicator">
                                        {expanded ? <Minus /> : <Plus />}
                                    </div>
                                </div>
                                <div class="pointer" />
                            </div>
                            <div class="body">
                                <div class="description">
                                    {description}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
