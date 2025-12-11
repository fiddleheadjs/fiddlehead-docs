import {ArrowTopRight} from '../icons';
import {BachelorCap} from '../icons/BachelorCap';
import {FileChart} from '../icons/FileChart';
import {PeoplePlus} from '../icons/PeoplePlus';
import './TargetAudience.less';

export let TargetAudience = () => {
    let data = {
        left: ['PeoplePlus', 'Học viên chuẩn bị học MBA', 'Trang bị nền tảng thực tiễn để học sâu và hiệu quả hơn.'],
        central: ['FileChart', 'Học viên tìm kiếm giải pháp tinh gọn', 'Sở hữu năng lực quản trị ứng dụng ngay, không tốn nhiều thời gian và chi phí.'],
        right: ['BachelorCap', 'Học viên đã tốt nghiệp MBA', 'Biến kiến thức học thuật thành năng lực thực chiến, phù hợp bối cảnh Việt Nam.'],
    };

    let icons = {
        PeoplePlus,
        FileChart,
        BachelorCap
    };

    return (
        <section class="TargetAudience">
            <heading>
                <h2 class="title">AiMBA được thiết kế đặc biệt dành cho</h2>
                <div class="divider" />
            </heading>
            <div class="grid">
                <ul>
                    {['central', 'left', 'right'].map(position => {
                        let [iconName, title, description] = data[position];
                        let Icon = icons[iconName];
                        return (
                        <li key={position} class={position}>
                            <div class="icons">
                                <div><Icon /></div>
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
        </section>
    );
};
