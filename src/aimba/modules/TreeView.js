import {useState} from 'fiddlehead';
import {TriangleDown, TriangleUp, Minus, Plus} from '../icons';
import './TreeView.less';

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
                {data.map(([title, description], index) => {
                    let expanded = expandedIndexes.includes(index);
                    return (
                        <div class={`card ${expanded ? 'expanded' : 'collapsed'}`} key={title}>
                            <div class="heading">
                                <div class="milestone-wrapper">
                                    <button
                                        class="milestone x-button"
                                        type="button"
                                        aria-label={title}
                                        onClick={() => toggleExpanded(index)}
                                    >
                                        <i />
                                    </button>
                                </div>
                                <button
                                    class="content x-touchable"
                                    type="button"
                                    tabIndex="0"
                                    aria-expanded={String(expanded)}
                                    onClick={() => toggleExpanded(index)}
                                >
                                    <div class="title">
                                        {title}
                                    </div>
                                    <div class="indicator">
                                        {expanded ? <Minus /> : <Plus />}
                                    </div>
                                </button>
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
