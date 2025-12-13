import {CircleCheck} from '../icons/CircleCheck';
import {Gift} from '../icons/gift';
import './Enrollment.less';

export let Enrollment = () => {
    const data = [
        'Truy cập đầy đủ 1048+ case study',
        '250+ khối lý thuyết được kiến giải chi tiết',
        'Kho tài nguyên: 50+ Brand Stories, 40+ Business Models',
        '24+ phân tích sách kinh doanh nổi tiếng',
        'Cố vấn AI thông minh',
        'Chứng nhận hoàn thành cho từng module'
    ];

    return (
        <section class="Enrollment">
            <div class="container">
                <div class="details">
                    <div class="title">Gói ưu đãi đặc biệt</div>
                    <div class="pricing">
                        <div class="price">
                            <div class="sale-price">Còn: 1.490.000 VNĐ</div>
                            <div class="original-price">Giá gốc: 9.500.000</div>
                        </div>
                        <div class="tips">
                            <ul>
                                <li>Đã bao gồm VAT</li>
                                <li>Quyền truy cập 1 năm</li>
                            </ul>
                        </div>
                    </div>
                    <div class="checklist">
                        <ul>
                            {data.map(text => (
                                <li key={text}>
                                    <i><CircleCheck /></i>
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div class="form">
                    <div class="heading">
                        <div class="line"><Gift /> Chỉ từ <strong>699.000 VNĐ</strong></div>
                        <div class="line">Dành cho 50 học viên đầu tiên!</div>
                    </div>
                    <div class="timing">
                        <div class="description">Ưu đãi có hạn, đăng ký ngay để không bỏ lỡ</div>
                        <div class="countdown">
                            <b>14</b> <i>Giờ</i>
                            <b>24</b> <i>Phút</i>
                            <b>44</b> <i>Giây</i>
                        </div>
                    </div>
                    <form>
                        
                    </form>
                </div>
            </div>
        </section>
    );
};
