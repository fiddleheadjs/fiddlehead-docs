import './TreeViewCard.less';
import {Minus, Plus} from '../icons';
import {useRef, useState} from 'fiddlehead';
import {useResizeObserver} from '../utils';

export let TreeViewCard = ({title, description, expanded, toggleExpanded}) => {
    let [descriptionHeight, setDescriptionHeight] = useState(null);
    let descriptionRef = useRef(null);

    useResizeObserver(descriptionRef, {
        callback: ({target}) => {
            setDescriptionHeight(target.offsetHeight);
        }
    });

    return (
        <div class={['TreeViewCard', expanded ? 'expanded' : 'collapsed']}>
            <div class="heading">
                <div class="milestone-wrapper">
                    <button
                        class="milestone x-button"
                        type="button"
                        tabIndex="0"
                        aria-label={title}
                        onClick={toggleExpanded}
                    >
                        <i />
                    </button>
                </div>
                <button
                    class="content x-touchable"
                    type="button"
                    tabIndex="0"
                    aria-expanded={String(expanded)}
                    onClick={toggleExpanded}
                >
                    <div class="title">
                        {title}
                    </div>
                    <div class="indicator">
                        {expanded ? <Minus /> : <Plus />}
                    </div>
                </button>
            </div>
            <div
                class="body"
                style={{
                    height: descriptionHeight == null ? null : (expanded ? `${descriptionHeight}px` : 0)
                }}
            >
                <div class="description" ref={descriptionRef}>
                    {description}
                </div>
            </div>
        </div>
    );
};
