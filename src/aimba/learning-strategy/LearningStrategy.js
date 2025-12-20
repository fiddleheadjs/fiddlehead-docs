import {Background} from '../background';
import './LearningStrategy.less';

export let LearningStrategy = () => {
    let imgCover = '/aimba/img/learning-strategy-cover.jpg';

    let data = {
        '01': ['Chọn module phù hợp với mục tiêu hiện tại', 'Lựa chọn từ 15 chương trình chuyên biệt theo vị trí và mục tiêu sự nghiệp của bạn'],
        '02': ['Thực hành với các case study thực tế', 'Giải quyết các tình huống dựa trên 1048+ case study thực tế tại Việt Nam'],
        '03': ['Học sâu qua kiến giải chi tiết từng phần', 'Mỗi mini-case là một bài tập tư duy sâu, được phân tích cách tiếp cận tối ưu, chỉ rõ “vì sao” và “làm thế nào”'],
        '04': ['Tiến hành áp dụng ngay vào công việc', 'Ứng dụng kiến thức và kỹ năng đã học vào các tình huống thực tế tại công ty']
    };

    return (
        <section class="LearningStrategy" id="LearningStrategy">
            <div class="container">
                <div class="details">
                    <Background image="/aimba/img/background-04.jpg" lazy />
                    <div class="heading">
                        <div class="content">
                            <h2 class="title">Cách thức học tập tại AiMBA</h2>
                            <div class="actions">
                                <button type="button" tabIndex="0" class="x-button">Đăng ký</button>
                            </div>
                        </div>
                        <div class="divider" />
                    </div>
                    <div class="grid">
                        <ul>
                            {['01', '02', '03', '04'].map((number) => {
                                let [title, description] = data[number];
                                return (
                                    <li key={number} class={`no-${number}`}>
                                        <div class="heading">
                                            <div class="number">{number}</div>
                                            <div class="title">{title}</div>
                                        </div>
                                        <div class="description">{description}</div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <div class="cover">
                    <img src={imgCover} alt="Cách thức học tập tại AiMBA" loading="lazy" />
                </div>
            </div>
        </section>
    );
};
