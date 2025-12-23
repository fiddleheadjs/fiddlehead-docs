import './FrequentlyAskedQuestions.less';
import {useState} from 'fiddlehead';
import {Minus, Plus} from '../icons';

export let FrequentlyAskedQuestions = ({
    contents: {
        frequentlyAskedQuestions: {
            questionsAndAnswers
        }
    }
}) => {
    let [expandedQuestions, setExpandedQuestions] = useState(() => {
        if (questionsAndAnswers.length > 0) {
            return [questionsAndAnswers[0].question];
        }
        return [];
    });

    let toggleExpanded = (question) => {
        if (expandedQuestions.includes(question)) {
            setExpandedQuestions(expandedQuestions.filter(q => q !== question));
        } else {
            setExpandedQuestions([...expandedQuestions, question]);
        }
    };

    return (
        <section class="FrequentlyAskedQuestions" id="FrequentlyAskedQuestions">
            <div class="container">
                <h2 class="title">Câu hỏi thường gặp</h2>
                <div class="content">
                    <ul>
                        {questionsAndAnswers.map(({question, answer}) => {
                            let expanded = expandedQuestions.includes(question);
                            return (
                                <li class={expanded ? 'expanded' : 'collapsed'} key={question}>
                                    <button
                                        class="heading x-touchable"
                                        type="button"
                                        tabIndex="0"
                                        aria-expanded={String(expanded)}
                                        onClick={() => toggleExpanded(question)}
                                    >
                                        <div class="question">{question}</div>
                                        <div class="indicator">
                                            {expanded ? <Minus /> : <Plus />}
                                        </div>
                                    </button>
                                    <div class="body">
                                        <div class="answer">{answer}</div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
};
