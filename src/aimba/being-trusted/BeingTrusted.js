import './BeingTrusted.less';
import {Slider} from '../slider';

export let BeingTrusted = () => {
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
        <section class="BeingTrusted">
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
        </section>
    );
};
