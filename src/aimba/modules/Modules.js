import {Slider} from '../slider';
import './Modules.less';
import {TreeView} from './TreeView';

export let Modules = () => {
    let roadmap = [
        ['Module 1 - Nền tảng kĩ năng chuyên nghiệp', 'Trang bị tư duy, tác phong chuyên nghiệp cùng các kỹ năng mềm cốt lõi như giao tiếp, giải quyết vấn đề và làm việc nhóm. Đây là bước đầu tư nền tảng để khai phá tiềm năng và tối đa hóa hiệu suất ngay từ những ngày đầu tiên.'],
        ['Module 2 - Chuyên Gia Bán Hàng & Đàm Phán', 'Nâng tầm kỹ năng bán hàng và đàm phán lên đỉnh cao, đi sâu vào tâm lý khách hàng, chiến lược phức hợp và nghệ thuật xây dựng mối quan hệ bền vững để mang lại tăng trưởng doanh thu đột phá.'],
        ['Module 3 -  Đào tạo Chuyên gia Marketing', 'Làm chủ cuộc chơi marketing trong kỷ nguyên số, từ phân tích dữ liệu, sáng tạo nội dung, đến việc làm chủ các kênh digital để xây dựng một hình ảnh thương hiệu mạnh mẽ và thống lĩnh thị trường.'],
        ['Module 4 - Quản trị Nhân sự Hiện đại', 'Cung cấp công cụ và phương pháp tiên tiến để thu hút, phát triển và giữ chân nhân tài, xây dựng một môi trường làm việc lý tưởng nơi mọi cá nhân có thể phát triển và cống hiến.'],
        ['Module 5 - Quản trị Chuỗi Cung ứng & Logistics', 'Trang bị kiến thức toàn diện để quản lý hiệu quả mọi khâu trong chuỗi cung ứng, từ mua hàng, hoạch định, quản lý tồn kho, đến vận tải và logistics nhằm tạo lợi thế cạnh tranh bền vững.'],
        ['Module 6 - Tài chính cho Nhà Quản lý', 'Trao quyền cho các nhà quản lý phi tài chính để tự tin đưa ra quyết định kinh doanh dựa trên sự am hiểu sâu sắc về báo cáo tài chính, ngân sách, dòng tiền và phân tích đầu tư.'],
        ['Module 7 - Tài chính Chiến lược & Quản trị CFO', 'Trang bị tư duy của một Giám đốc Tài chính (CFO) chiến lược, học cách phân tích sâu sắc, mô hình hóa tài chính, quản trị rủi ro và định giá doanh nghiệp để dẫn dắt doanh nghiệp đến sự thịnh vượng.'],
        ['Module 8 - Lãnh đạo & Quản lý đội nhóm Hiệu suất cao', 'Trở thành nhà lãnh đạo truyền cảm hứng, có khả năng xây dựng và dẫn dắt những đội nhóm vô địch. Chương trình này tập trung vào các kỹ năng lãnh đạo và quản lý thực chiến: từ huấn luyện, trao quyền, tạo động lực đến giải quyết xung đột và quản lý sự thay đổi ở cấp độ đội nhóm. Bạn sẽ học cách khơi dậy tiềm năng của từng cá nhân, thúc đẩy sự gắn kết và tạo ra một môi trường làm việc hiệu suất cao, nơi mọi người cùng hướng đến mục tiêu chung.'],
        ['Module 9 - Quản trị dự án chuyên sâu & hiệu quả', 'Làm chủ nghệ thuật hoàn thành dự án phức tạp đúng hạn, trong ngân sách và vượt trên sự mong đợi thông qua các phương pháp quản lý tiên tiến từ Agile đến Waterfall.'],
        ['Module 10 - Quản trị Hệ thống Kiểm soát & Đo lường Hiệu suất', 'Biến chiến lược thành hành động và kết quả có thể đo lường, đảm bảo mọi bộ phận và cá nhân đều đang đi đúng hướng để thực thi thành công các mục tiêu chiến lược của công ty.'],
        ['Module 11 - Quản trị Rủi ro Doanh nghiệp', 'Xây dựng một khung quản trị rủi ro toàn diện (ERM) để nhận diện, phân tích, và ứng phó với các rủi ro, biến việc quản trị rủi ro thành một lợi thế cạnh tranh.'],
        ['Module 12 - Pháp lý Kinh doanh cho Nhà Quản lý', 'Trang bị "tấm khiên" pháp lý cần thiết về hợp đồng, lao động, sở hữu trí tuệ... giúp nhà quản lý tự tin vận hành doanh nghiệp và giảm thiểu rủi ro pháp lý tại Việt Nam.'],
        ['Module 13 - Hoạch định & Đổi mới Chiến lược', 'Dành cho các nhà lãnh đạo cấp cao, những người kiến tạo tương lai của doanh nghiệp.Chương trình này tập trung thuần túy vào tư duy chiến lược, các mô hình phân tích kinh điển và phương pháp đổi mới tiên tiến. Bạn sẽ học cách phân tích sâu sắc môi trường kinh doanh, xác định lợi thế cốt lõi, xây dựng các mô hình kinh doanh đột phá và dẫn dắt sự chuyển đổi chiến lược để đạt được thành công bền vững.'],
        ['Module 14 - M&A và phân tích đầu tư', 'Cung cấp kiến thức chuyên sâu và công cụ thực tiễn để thực hiện toàn bộ quy trình M&A, từ xác định mục tiêu, định giá, đàm phán đến tích hợp sau sáp nhập.'],
        ['Module 15 - AI & Tech 4.0 trong Quản trị Kinh doanh', 'Xây dựng tư duy chuyển đổi số và trang bị kiến thức nền tảng về Trí tuệ nhân tạo (AI) và tự động hóa. Người học sẽ khám phá các ứng dụng thực tế của AI, học cách phân tích quy trình và làm việc với dữ liệu để tìm ra cơ hội cải tiến. Khóa học cung cấp lộ trình để bắt đầu tự động hóa các tác vụ, ra quyết định dựa trên dữ liệu và dẫn dắt các sáng kiến công nghệ.'],
    ];

    return (
        <section class="Modules">
            <div class="heading">
                <div class="container">
                    <div class="title">60–80 giờ học theo mỗi Module chuyên biệt của AiMBA</div>
                    <div class="description">15 module tập trung giải quyết từng năng lực cụ thể, từ cơ bản đến nâng cao</div>
                </div>
            </div>
            <div class="roadmap">
                <div class="container">
                    <TreeView
                        data={roadmap}
                    />
                </div>
            </div>
            <div class="videos">
                <Slider
                    slideItems={['#def', '#edf', '#fde'].map(background => ({
                        id: background,
                        render: () => (
                            <div class="video-wrapper">
                                <img style={{background}} />
                            </div>
                        )
                    }))}
                />
            </div>
            <div class="actions">
                <div class="container">
                    <button class="signup" type="button">Đăng ký</button>
                </div>
            </div>
        </section>
    );
};
