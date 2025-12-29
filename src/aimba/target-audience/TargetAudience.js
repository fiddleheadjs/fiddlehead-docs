import {Background} from '../background';
import {BadgeCheck} from '../icons';
import {ImageView} from '../image-view';
import {AudienceList} from './AudienceList';
import './TargetAudience.less';

export let TargetAudience = ({
    contents: {
        targetAudience: {
            backgroundImage,
            certificateImage
        }
    }
}) => {
    let certificateData = [
        'Nhận Chứng nhận Hoàn thành AiMBA khẳng định học viên có tri thức & kĩ năng quản trị chuẩn quốc tế.',
        'Nắm vững những kiến thức chuyên sâu về quản trị kinh doanh ứng dụng tư duy quản trị số và công nghệ AI để xây dựng chiến lược kinh doanh phù hợp cho doanh nghiệp.',
        'Am hiểu và biết cách ứng dụng công nghệ AI vào các khía cạnh của quản trị kinh doanh nhằm phân tích, phát hiện, xây dựng giải pháp giải quyết các vấn đề quản trị.',
        'Nắm vững các kỹ năng cốt yếu, rèn luyện tư duy phân tích nhạy bén và am hiểu sâu sắc các xu hướng chuyển đổi số doanh nghiệp nhằm phân tích, phát hiện, xây dựng giải pháp kinh doanh đổi mới, bắt kịp các xu hướng mới.'
    ];

    return (
        <section class="TargetAudience" id="TargetAudience">
            <div class="heading">
                <h2 class="title">AiMBA được thiết kế đặc biệt <com-word>dành cho</com-word></h2>
                <div class="divider" />
            </div>
            <div class="audience">
                <AudienceList />
            </div>
            <div class="certificate">
                <div class="big-card">
                    <Background image={backgroundImage.src} lazy />
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
                            <ImageView>
                                <img src={certificateImage.src} alt={certificateImage.alt} loading="lazy" />
                            </ImageView>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
