import {useState} from 'fiddlehead';
import {Minus} from '../icons/Minus';
import {Plus} from '../icons/Plus';
import './TreeView.less';
import {TriangleDown, TriangleUp} from '../icons';

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
                <div class="line"/>
                <TriangleDown />
            </div>
            <div class="cards">
                {data.map(([title, description], index) => (
                    <Card
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

let Card = ({title, description, expanded, toggleExpanded}) => {
    return (
        <div class={`Card ${expanded ? 'expanded' : 'collapsed'}`}>
            <div class="heading" onClick={toggleExpanded}>
                <div class="content">
                    <div class="title">
                        {title}
                    </div>
                    <div class="indicator">
                        {expanded ? <Minus /> : <Plus />}
                    </div>
                </div>
                <div class="pointer"/>
            </div>
            <div class="body">
                <div class="description">
                    {description}
                </div>
            </div>
        </div>
    );
};
