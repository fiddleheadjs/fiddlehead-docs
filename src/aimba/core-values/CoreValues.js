import {DocumentChart, GearChecklist, HandMoney, PersonGrowth, RobotSmile, StudentLaptop} from '../pictogram';
import './CoreValues.less';

export let CoreValues = () => {
    let data = [
        ['DocumentChart', 'Nắm vững hệ thống kiến thức nền tảng MBA chuẩn quốc tế: quản trị nhân sự, marketing, tài chính, chiến lược và vận hành.'],
        ['PersonGrowth', 'Mài sắc tư duy quản lý – rèn luyện trực tiếp qua hàng trăm tình huống thực chiến,ứng dụng tạo hiệu quả công việc ngay.'],
        ['GearChecklist', 'Khắc phục tình trạng gặp case khó khi áp dụng MBA vào thực tế khi mọi kiến thức đều được kết nối với tình huống thật.'],
        ['StudentLaptop', 'Học tập linh hoạt theo tiến độ cá nhân, phát triển đúng năng lực mình cần mà không phải học dàn trải.'],
        ['HandMoney', 'Học viên được trang bị kiến thức chuyên sâu về quản trị, từ tài chính, marketing đến vận hành, giúp hiểu rõ cách một doanh nghiệp hoạt động.'],
        ['RobotSmile', 'Luôn có cố vấn AI thông minh hỗ trợ trong quá trình học tập và đồng hành công việc.'],
    ];

    let pictograms = {
        DocumentChart,
        PersonGrowth,
        GearChecklist,
        StudentLaptop,
        HandMoney,
        RobotSmile
    };

    return (
        <section class="CoreValues">
            <div class="title">Giá trị nhận được khi đầu tư AiMBA</div>
            <div class="divider" />
            <div class="values">
                <ul>
                    {data.map(([picName, text]) => {
                        let Pictogram = pictograms[picName];
                        return (
                            <li key={text}>
                                <div class="pictogram"><Pictogram /></div>
                                <div class="divider" />
                                <div class="text">{text}</div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};
