import {useState} from 'fiddlehead';
import {Minus} from '../icons/Minus';
import {Plus} from '../icons/Plus';
import './TreeView.less';

export let TreeView = ({data}) => {
    return (
        <div class="TreeView">
            {data.map(([title, description], index) => (
                <div key={title}>
                    <Card
                        title={title}
                        description={description}
                        defaultExpanded={index < 2}
                    />
                </div>
            ))}
        </div>
    );
};

let Card = ({title, description, defaultExpanded}) => {
    let [expanded, setExpanded] = useState(defaultExpanded);

    return (
        <div class={`Card ${expanded ? 'expanded' : 'collapsed'}`}>
            <div class="heading" onClick={() => setExpanded(!expanded)}>
                <div class="title">
                    {title}
                </div>
                <div class="indicator">
                    {expanded ? <Minus /> : <Plus />}
                </div>
            </div>
            <div class="body">
                <div class="description">
                    {description}
                </div>
            </div>
        </div>
    );
};
