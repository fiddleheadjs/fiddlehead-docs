import {render} from 'less';
import {ArrowTopRight, BachelorCap, BadgeCheck, FileChart, PeoplePlus} from '../icons';
import {Slider} from '../slider';
import './TargetAudience.less';

export let TargetAudience = () => {    
    let icons = {
        PeoplePlus,
        FileChart,
        BachelorCap
    };

    let audienceData = {
        left: ['PeoplePlus', 'Học viên chuẩn bị học MBA', 'Trang bị nền tảng thực tiễn để học sâu và hiệu quả hơn.'],
        central: ['FileChart', 'Học viên tìm kiếm giải pháp tinh gọn', 'Sở hữu năng lực quản trị ứng dụng ngay, không tốn nhiều thời gian và chi phí.'],
        right: ['BachelorCap', 'Học viên đã tốt nghiệp MBA', 'Biến kiến thức học thuật thành năng lực thực chiến, phù hợp bối cảnh Việt Nam.'],
    };

    let certificateData = [
        'Nhận Chứng nhận Hoàn thành AiMBA khẳng định học viên có tri thức & kĩ năng quản trị chuẩn quốc tế.',
        'Nắm vững những kiến thức chuyên sâu về quản trị kinh doanh ứng dụng tư duy quản trị số và công nghệ AI để xây dựng chiến lược kinh doanh phù hợp cho doanh nghiệp.',
        'Am hiểu và biết cách ứng dụng công nghệ AI vào các khía cạnh của quản trị kinh doanh nhằm phân tích, phát hiện, xây dựng giải pháp giải quyết các vấn đề quản trị.',
        'Nắm vững các kỹ năng cốt yếu, rèn luyện tư duy phân tích nhạy bén và am hiểu sâu sắc các xu hướng chuyển đổi số doanh nghiệp nhằm phân tích, phát hiện, xây dựng giải pháp kinh doanh đổi mới, bắt kịp các xu hướng mới.'
    ];

    let feedbackData = [
        {
            avatar: '1',
            name: 'Anh Nguyễn Bảo An',
            description: 'Chuyên gia phân tích tài chính',
            feedback: 'Tôi từng cân nhắc học MBA nhưng chi phí, công sức và thời gian nghỉ việc hiện tại là rào cản quá lớn. Với AiMBA, chỉ sau vài giờ học tôi đã có thể áp dụng ngay kiến thức vào công việc và thấy kết quả rõ rệt trong hiệu suất đội nhóm, giúp 1 dự án marketing tối ưu 15% chi phí nhờ cách phân tích tình huống. Sếp tôi đã rất hài lòng.'
        },
        {
            avatar: '2',
            name: 'Chị Trần Ngọc Lan',
            description: 'Chuyên gia phân tích tài chính',
            feedback: 'Điều tôi ấn tượng nhất ở AiMBA là mọi kiến thức MBA không còn nằm trong sách vở, mà được đặt thẳng vào những tình huống doanh nghiệp Việt Nam. Thay vì học SWOT hay BSC theo lý thuyết, tôi được thực hành trên case thực tế và thấy ngay cách áp dụng vào công việc. Đây là điểm khác biệt mà tôi rất thích.'
        },
        {
            avatar: '3',
            name: 'Anh Nguyễn Quốc Anh',
            description: 'Chuyên gia phân tích tài chính',
            feedback: 'Tôi từng cân nhắc học MBA nhưng chi phí, công sức và thời gian nghỉ việc hiện tại là rào cản quá lớn. Với AiMBA, chỉ sau vài giờ học tôi đã có thể áp dụng ngay kiến thức vào công việc và thấy kết quả rõ rệt trong hiệu suất đội nhóm, giúp 1 dự án marketing tối ưu 15% chi phí nhờ cách phân tích tình huống. Sếp tôi đã rất hài lòng.'
        },
        {
            avatar: '4',
            name: 'Anh Nguyễn Bảo An',
            description: 'Chuyên gia phân tích tài chính',
            feedback: 'Tôi từng cân nhắc học MBA nhưng chi phí, công sức và thời gian nghỉ việc hiện tại là rào cản quá lớn. Với AiMBA, chỉ sau vài giờ học tôi đã có thể áp dụng ngay kiến thức vào công việc và thấy kết quả rõ rệt trong hiệu suất đội nhóm, giúp 1 dự án marketing tối ưu 15% chi phí nhờ cách phân tích tình huống. Sếp tôi đã rất hài lòng.'
        }
    ];

    return (
        <section class="TargetAudience">
            <div class="heading">
                <h2 class="title">AiMBA được thiết kế đặc biệt dành cho</h2>
                <div class="divider" />
            </div>
            <div class="audience">
                <ul>
                    {['central', 'left', 'right'].map(position => {
                        let [iconName, title, description] = audienceData[position];
                        let Icon = icons[iconName];
                        return (
                        <li key={position} class={position}>
                            <div class="icons">
                                <div>
                                    <div class="icon">
                                        <Icon />
                                    </div>
                                </div>
                                <div>
                                    <div class="arrow-pie">
                                        <ArrowTopRight />
                                    </div>
                                </div>
                            </div>
                            <div class="title">
                                {title}
                            </div>
                            <div class="description">
                                {description}
                            </div>
                        </li>
                    )})}
                </ul>
            </div>
            <div class="certificate">
                <h2 class="title">Chứng nhận - cam kết</h2>
                <div class="content">
                    <div class="details">
                        <ul>
                            {certificateData.map(statement => (
                                <li key={statement}>
                                    <i><BadgeCheck /></i>
                                    <span>{statement}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div class="photos">
                        
                    </div>
                </div>
            </div>
            <div class="being-trusted">
                <div class="heading">
                    <h2 class="title">Được tin tưởng bởi hơn 1.024 chuyên gia/managers/CEOs</h2>
                    <div class="description">Truy cập mở đến kho tàng tri thức kinh doanh</div>
                </div>
                <div class="feedbacks">
                    <Slider
                        gap="30px"
                        slideWidth="369px"
                        slideHeight="488px"
                        slideItems={feedbackData.map(({avatar, name, description, feedback}) => ({
                            id: `${name}, ${avatar}`,
                            render: () => (
                                <div class="card">
                                    <div class="avatar">
                                        <div class="rounded-image">
                                        </div>
                                    </div>
                                    <div class="name">{name}</div>
                                    <div class="description">{description}</div>
                                    <div class="feedback">{feedback}</div>
                                </div>
                            )
                        }))}
                    />
                </div>
            </div>
        </section>
    );
};
