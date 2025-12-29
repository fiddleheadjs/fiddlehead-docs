import {CircleCheck} from '../icons';
import {Slider} from '../slider';
import './Resources.less';

export let Resources = ({
    contents: {
        resources: {
            brandStories,
            businessModels,
            bookInsights,
            miscellaneous
        }
    }
}) => {
    let data = [
        {
            title: '50+ Brand Stories',
            description: 'Câu chuyện thành công từ các thương hiệu toàn cầu và Việt Nam',
            checklist: [
                'Tesla và Kế Hoạch Tổng Thể Của Elon Musk',
                'Aldi: Sự Tối Giản Hóa Trong Bán Lẻ',
                'Casper và Cuộc Cách Mạng Ngành Nệm',
                'Vingroup: Tốc Độ Thần Kỳ và Khát Vọng',
                'MoMo: Chiến Thắng Cuộc Chiến Siêu Ứng Dụng'
            ],
            screenshots: brandStories.slideImages,
            layout: 'standard',
            themeColor: '#EAF8FF'
        },
        {
            title: '38+ Business Models',
            description: 'Mô hình kinh doanh đã được chứng minh thành công trong thực tiễn',
            checklist: [
                'Omnichannel Model - Mô hình Đa kênh Tích hợp',
                'Ecosystem Model - Mô hình Hệ sinh thái',
                'Auction/Bidding Model - Mô hình Đấu giá/Đấu thầu',
                'Managed Services Model - Mô hình Dịch vụ Quản lý',
                'Manufacturing Model - Mô hình Sản xuất'
            ],
            screenshots: businessModels.slideImages,
            layout: 'reserve',
            themeColor: '#FAE8E8'
        },
        {
            title: '24+ Phân tích sách',
            description: 'Luận giải chi tiết từ các cuốn sách kinh doanh nổi tiếng, được nhiều độc giả yêu thích',
            checklist: [
                'Luận giải cuốn sách Blue Ocean Strategy',
                'Luận giải cuốn sách Thinking in Bets',
                'Luận giải cuốn sách The Goal',
                'Luận giải cuốn sách Contagious',
                'Luận giải cuốn sách Positioning'
            ],
            screenshots: bookInsights.slideImages,
            layout: 'standard',
            themeColor: '#E8F7E6'
        },
        {
            title: 'Thêm 325+ tài nguyên hữu ích',
            description: 'Framework, Principle, Methodology, Flashcard, mô hình và công cụ ứng dụng',
            checklist: [
                'Sơ đồ tư duy (Mind Mapping)',
                'Ma trận quản lý thời gian Eisenhower',
                'Sơ đồ hóa Quy trình Kinh doanh',
                'ESG Framework - Khung ESG',
                'Three Horizons Framework - Khung Ba Chân trời'
            ],
            screenshots: miscellaneous.slideImages,
            layout: 'reserve',
            themeColor: '#F4E9F8'
        }
    ];

    return (
        <section class="Resources" id="Resources">
            <div class="container">
                <div class="heading">
                    <h2 class="title">Kho tài nguyên lớn <com-word>chất lượng</com-word></h2>
                    <div class="description">Truy cập mở đến kho tàng tri thức kinh doanh</div>
                </div>
                {data.map(({title, description, checklist, screenshots, layout, themeColor}) => (
                    <div key={title} class={`catalogue layout-${layout}`} style={{background: themeColor}}>
                        <div class="details">
                            <h3 class="title">{title}</h3>
                            <div class="description">{description}</div>
                            <div class="checklist">
                                <ul>
                                    {checklist.map(content => (
                                        <li key={content}>
                                            <i><CircleCheck /></i>
                                            <span>{content}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div class="screenshots">
                            <div class="slider-wrapper">
                                <Slider
                                    slideItems={screenshots.map(({src, alt}) => ({
                                        id: src,
                                        render: () => <img src={src} alt={alt} loading="lazy" />
                                    }))}
                                    interval
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
