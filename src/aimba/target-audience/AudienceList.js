import './AudienceList.less';
import {ArrowTopRight, BachelorCap, FileChart, PeoplePlus} from '../icons';
import {useState} from 'fiddlehead';

export let AudienceList = ({
    onRegistrationRequest
}) => {
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

    let [highlightedPosition, setHighlightedPosition] = useState('central');

    return (
        <ul class="AudienceList">
            {['central', 'left', 'right'].map(position => {
                let [iconName, title, description] = audienceData[position];
                let Icon = icons[iconName];
                return (
                    <li
                        key={position}
                        class={[position, position === highlightedPosition && 'highlighted']}
                        onMouseOver={() => setHighlightedPosition(position)}
                        onTouchStart={() => setHighlightedPosition(position)}
                    >
                        <div class="background" />
                        <div class="actions">
                            <div>
                                <div class="icon">
                                    <Icon />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    class="arrow-pie x-button"
                                    tabIndex="0"
                                    onClick={onRegistrationRequest}
                                >
                                    <ArrowTopRight />
                                </button>
                            </div>
                        </div>
                        <div class="title">
                            {title}
                        </div>
                        <div class="description">
                            {description}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};
