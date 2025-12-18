import './FrequentlyAskedQuestions.less';
import {useState} from 'fiddlehead';
import {Minus, Plus} from '../icons';

export let FrequentlyAskedQuestions = () => {
    let data = [
        ['AiMBA khác gì với MBA truyền thống?', 'AiMBA tập trung vào tính ứng dụng thực tế với phương pháp thiết kế ngược, bắt đầu từ 640+ case study thực tế rồi đi ngược lại 170+ khối lý thuyết. Phù hợp với bối cảnh kinh doanh Việt Nam và linh hoạt theo thời gian học tập.'],
        ['Tôi có thể học riêng lẻ từng module không?', 'AiMBA được thiết kế như một hệ sinh thái học tập toàn diện. Bạn sẽ nhận được trọn bộ 8 module để phát triển năng lực một cách hệ thống từ cơ bản đến nâng cao, đảm bảo tính liên kết và hiệu quả tối ưu.'],
        ['640+ case study được phân bổ như thế nào trong các module?', 'Mỗi module có số lượng case study khác nhau tùy theo độ phức tạp: Module 1 (80+),Module 2 (100+), Module 3 (90+), Module 4 (70+), Module 5 (80+), Module 6 (85+), Module 7 (75+), Module 8 (60+). Tất cả đều dựa trên tình huống thực tế tại Việt Nam.'],
        ['Có chứng chỉ sau khi hoàn thành không?', 'Có, bạn sẽ nhận được chứng nhận hoàn thành từ AiMBA sau khi hoàn thành các bài tập và đánh giá trong chương trình.']
    ];

    let [expandedQuestions, setExpandedQuestions] = useState([data[0][0]]);

    let toggleExpanded = (question) => {
        if (expandedQuestions.includes(question)) {
            setExpandedQuestions(expandedQuestions.filter(q => q !== question));
        } else {
            setExpandedQuestions([...expandedQuestions, question]);
        }
    };

    return (
        <section class="FrequentlyAskedQuestions">
            <div class="container">
                <h2 class="title">Câu hỏi thường gặp</h2>
                <div class="content">
                    <ul>
                        {data.map(([question, answer]) => {
                            let expanded = expandedQuestions.includes(question);
                            return (
                            <li class={expanded ? 'expanded' : 'collapsed'} key={question}>
                                <div class="heading" onClick={() => toggleExpanded(question)}>
                                    <div class="question">{question}</div>
                                    <div class="indicator">
                                        {expanded ? <Minus /> : <Plus />}
                                    </div>
                                </div>
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
