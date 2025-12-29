import './FrequentlyAskedQuestions.less';
import {useState} from 'fiddlehead';
import {QuestionAnswer} from './QuestionAnswer';

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
                        {questionsAndAnswers.map(({question, answer}) => (
                            <QuestionAnswer
                                key={question}
                                question={question}
                                answer={answer}
                                expanded={expandedQuestions.includes(question)}
                                toggleExpanded={() => toggleExpanded(question)}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};
