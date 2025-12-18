import {CircleFeatures, Logo} from '../pictogram';
import './Features.less';

export let Features = () => {
    let data = {
        lt: ['Phương pháp thiết kế ngược', 'Bắt đầu từ 1048+ case study thực tế, đi ngược lại chắt lọc 250+ khối lý thuyết quan trọng nhất. Học để làm được ngay!'],
        lm: ['Bản địa hóa cho thị trường Việt Nam', 'Từ "Nghệ thuật quan hệ", "Vượt qua tâm lý cả nể" đến "Quản trị doanh nghiệp gia đình" - giải quyết thách thức quản trị đặc thù Việt Nam.'],
        lb: ['Cung cấp nội dung chất lượng Expert-Grade', 'Chất lượng cấp độ chuyên gia với các thử thách mô phỏng khắt khe, đòi hỏi tư duy thấu đáo toàn diện để tìm giải pháp tối ưu.'],
        rt: ['Học tập thư giãn với tính năng Voice Reader', 'Công nghệ đọc tài liệu bằng giọng nói giúp bạn nghe bài học mọi lúc, mọi nơi tiện lợi, hiệu quả & thư giãn.'],
        rm: ['Học trực tuyến linh hoạt theo nhu cầu', '15 module chuyên biệt, học theo tiến độ cá nhân. Không cần nghỉ làm, vẫn phát triển sự nghiệp.'],
        rb: ['Trợ lý quản trị AI 24/7', 'Tận dụng các promt - template và câu hỏi thông minh để giải quyết vấn đề nhanh.'],
    };

    return (
        <section class="Features">
            <div class="heading">
                <h2 class="title">Cách AiMBA giúp bạn <no-break>bứt phá</no-break></h2>
                <div class="divider"/>
            </div>
            <div class="visualisation">
                <div class="grid">
                    <div class="central">
                        <CircleFeatures>
                            <Logo x="193" />
                        </CircleFeatures>
                    </div>
                    {['lt', 'lm', 'lb', 'rt', 'rm', 'rb'].map(position => {
                        let [title, description] = data[position];
                        return (
                            <div key={position} class={`card ${position}`}>
                                <div class="title">{title}</div>
                                <div class="description">
                                    <div class="content">{description}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
