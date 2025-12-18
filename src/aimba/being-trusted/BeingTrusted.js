import './BeingTrusted.less';
import {Slider} from '../slider';
import {ImageView} from '../image-view';

export let BeingTrusted = () => {
    let feedbackData = [
        {
            avatar: '/img/aimba/being-trusted-person-01.jpg',
            name: 'Anh Nguyễn Bảo An',
            description: 'Chuyên gia phân tích tài chính',
            feedback: 'Tôi từng cân nhắc học MBA nhưng chi phí, công sức và thời gian nghỉ việc hiện tại là rào cản quá lớn. Với AiMBA, chỉ sau vài giờ học tôi đã có thể áp dụng ngay kiến thức vào công việc và thấy kết quả rõ rệt trong hiệu suất đội nhóm, giúp 1 dự án marketing tối ưu 15% chi phí nhờ cách phân tích tình huống. Sếp tôi đã rất hài lòng.'
        },
        {
            avatar: '/img/aimba/being-trusted-person-02.jpg',
            name: 'Chị Trần Ngọc Lan',
            description: 'Chuyên gia phân tích tài chính',
            feedback: 'Điều tôi ấn tượng nhất ở AiMBA là mọi kiến thức MBA không còn nằm trong sách vở, mà được đặt thẳng vào những tình huống doanh nghiệp Việt Nam. Thay vì học SWOT hay BSC theo lý thuyết, tôi được thực hành trên case thực tế và thấy ngay cách áp dụng vào công việc. Đây là điểm khác biệt mà tôi rất thích.'
        },
        {
            avatar: '/img/aimba/being-trusted-person-03.jpg',
            name: 'Anh Nguyễn Quốc Anh',
            description: 'Chuyên gia phân tích tài chính',
            feedback: 'Tôi từng cân nhắc học MBA nhưng chi phí, công sức và thời gian nghỉ việc hiện tại là rào cản quá lớn. Với AiMBA, chỉ sau vài giờ học tôi đã có thể áp dụng ngay kiến thức vào công việc và thấy kết quả rõ rệt trong hiệu suất đội nhóm, giúp 1 dự án marketing tối ưu 15% chi phí nhờ cách phân tích tình huống. Sếp tôi đã rất hài lòng.'
        },
        {
            avatar: '/img/aimba/being-trusted-person-04.jpg',
            name: 'Chị Hoàng Thu Huyền',
            description: 'Chuyên gia phân tích tài chính',
            feedback: 'Tôi từng cân nhắc học MBA nhưng chi phí, công sức và thời gian nghỉ việc hiện tại là rào cản quá lớn. Với AiMBA, chỉ sau vài giờ học tôi đã có thể áp dụng ngay kiến thức vào công việc và thấy kết quả rõ rệt trong hiệu suất đội nhóm, giúp 1 dự án marketing tối ưu 15% chi phí nhờ cách phân tích tình huống. Sếp tôi đã rất hài lòng.'
        },
        {
            avatar: '/img/aimba/being-trusted-person-05.jpg',
            name: 'Anh Quốc Hưng',
            description: 'Chuyên gia phân tích tài chính',
            feedback: 'Tôi từng cân nhắc học MBA nhưng chi phí, công sức và thời gian nghỉ việc hiện tại là rào cản quá lớn. Với AiMBA, chỉ sau vài giờ học tôi đã có thể áp dụng ngay kiến thức vào công việc và thấy kết quả rõ rệt trong hiệu suất đội nhóm, giúp 1 dự án marketing tối ưu 15% chi phí nhờ cách phân tích tình huống. Sếp tôi đã rất hài lòng.'
        },
        {
            avatar: '/img/aimba/being-trusted-person-06.jpg',
            name: 'Chị Trịnh Như Ý',
            description: 'Chuyên gia phân tích tài chính',
            feedback: 'Tôi từng cân nhắc học MBA nhưng chi phí, công sức và thời gian nghỉ việc hiện tại là rào cản quá lớn. Với AiMBA, chỉ sau vài giờ học tôi đã có thể áp dụng ngay kiến thức vào công việc và thấy kết quả rõ rệt trong hiệu suất đội nhóm, giúp 1 dự án marketing tối ưu 15% chi phí nhờ cách phân tích tình huống. Sếp tôi đã rất hài lòng.'
        },
        {
            avatar: '/img/aimba/being-trusted-person-07.jpg',
            name: 'Chị Khánh Ngọc',
            description: 'Chuyên gia phân tích tài chính',
            feedback: 'Tôi từng cân nhắc học MBA nhưng chi phí, công sức và thời gian nghỉ việc hiện tại là rào cản quá lớn. Với AiMBA, chỉ sau vài giờ học tôi đã có thể áp dụng ngay kiến thức vào công việc và thấy kết quả rõ rệt trong hiệu suất đội nhóm, giúp 1 dự án marketing tối ưu 15% chi phí nhờ cách phân tích tình huống. Sếp tôi đã rất hài lòng.'
        },
        {
            avatar: '/img/aimba/being-trusted-person-08.jpg',
            name: 'Anh Trương Văn Long',
            description: 'Chuyên gia phân tích tài chính',
            feedback: 'Tôi từng cân nhắc học MBA nhưng chi phí, công sức và thời gian nghỉ việc hiện tại là rào cản quá lớn. Với AiMBA, chỉ sau vài giờ học tôi đã có thể áp dụng ngay kiến thức vào công việc và thấy kết quả rõ rệt trong hiệu suất đội nhóm, giúp 1 dự án marketing tối ưu 15% chi phí nhờ cách phân tích tình huống. Sếp tôi đã rất hài lòng.'
        },
        {
            avatar: '/img/aimba/being-trusted-person-09.jpg',
            name: 'Anh Võ Minh Nhất',
            description: 'Chuyên gia phân tích tài chính',
            feedback: 'Tôi từng cân nhắc học MBA nhưng chi phí, công sức và thời gian nghỉ việc hiện tại là rào cản quá lớn. Với AiMBA, chỉ sau vài giờ học tôi đã có thể áp dụng ngay kiến thức vào công việc và thấy kết quả rõ rệt trong hiệu suất đội nhóm, giúp 1 dự án marketing tối ưu 15% chi phí nhờ cách phân tích tình huống. Sếp tôi đã rất hài lòng.'
        },
        {
            avatar: '/img/aimba/being-trusted-person-10.jpg',
            name: 'Anh Nguyễn Thành Bảo',
            description: 'Chuyên gia phân tích tài chính',
            feedback: 'Tôi từng cân nhắc học MBA nhưng chi phí, công sức và thời gian nghỉ việc hiện tại là rào cản quá lớn. Với AiMBA, chỉ sau vài giờ học tôi đã có thể áp dụng ngay kiến thức vào công việc và thấy kết quả rõ rệt trong hiệu suất đội nhóm, giúp 1 dự án marketing tối ưu 15% chi phí nhờ cách phân tích tình huống. Sếp tôi đã rất hài lòng.'
        },
    ];

    return (
        <section class="BeingTrusted">
            <div class="heading">
                <h2 class="title">Được tin tưởng bởi hơn 1.024 <no-break>chuyên gia</no-break>/<no-break>managers</no-break>/<no-break>CEOs</no-break></h2>
                <div class="description">Truy cập mở đến kho tàng tri thức kinh doanh</div>
            </div>
            <div class="feedbacks">
                <Slider
                    slideItems={feedbackData.map(({avatar, name, description, feedback}) => ({
                        id: `${name}, ${avatar}`,
                        render: () => (
                            <div class="card">
                                <div class="avatar">
                                    <ImageView>
                                        <img src={avatar} alt={name} loading="lazy" />
                                    </ImageView>
                                </div>
                                <div class="name">{name}</div>
                                <div class="description">{description}</div>
                                <div class="feedback">
                                    <div class="content">{feedback}</div>
                                </div>
                            </div>
                        )
                    }))}
                />
            </div>
        </section>
    );
};
