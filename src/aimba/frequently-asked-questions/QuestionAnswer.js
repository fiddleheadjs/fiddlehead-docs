import './QuestionAnswer.less';
import {useRef, useState} from 'fiddlehead';
import {Minus, Plus} from '../icons';
import {useResizeObserver} from '../utils/useResizeObserver';

export let QuestionAnswer = ({question, answer, expanded, toggleExpanded}) => {
    let [answerHeight, setAnswerHeight] = useState(null);
    let answerRef = useRef(null);

    useResizeObserver(answerRef, {
        callback: ({target}) => {
            setAnswerHeight(target.offsetHeight);
        }
    });

    return (
        <li class={['QuestionAnswer', expanded ? 'expanded' : 'collapsed']}>
            <button
                class="heading x-touchable"
                type="button"
                tabIndex="0"
                aria-expanded={String(expanded)}
                onClick={toggleExpanded}
            >
                <div class="question">{question}</div>
                <div class="indicator">
                    {expanded ? <Minus /> : <Plus />}
                </div>
            </button>
            <div
                class="body"
                style={{
                    height: answerHeight == null ? null : (expanded ? `${answerHeight}px` : 0)
                }}
            >
                <div class="answer" ref={answerRef}>{answer}</div>
            </div>
        </li>
    );
};
