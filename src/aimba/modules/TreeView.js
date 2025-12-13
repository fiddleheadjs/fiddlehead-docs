import {useState} from 'fiddlehead';
import {TriangleDown, TriangleUp, Minus, Plus} from '../icons';
import './TreeView.less';

export let TreeView = ({data}) => {
    let [variableExpandedIndexes, setVariableExpandedIndexes] = useState([]);
    let fixedExpandedIndexes = [0, 1];
    let expandedIndexes = [...fixedExpandedIndexes, ...variableExpandedIndexes];

    let toggleExpanded = (index) => {
        if (fixedExpandedIndexes.includes(index)) {
            return;
        }

        setVariableExpandedIndexes(() => {
            if (variableExpandedIndexes.includes(index)) {
                return [];
            }

            if (index % 2 === 0) {
                return [index, index + 1];
            } else {
                return [index - 1, index];
            }
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
