import {CircleCheck, Gift} from '../icons';
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
                    <h2 class="title">Gói ưu đãi đặc biệt</h2>
                    <div class="pricing">
                        <div class="price">
                            <div class="sale-price">Còn: 1.490.000 VNĐ</div>
                            <div class="original-price">Giá gốc: 9.500.000</div>
                        </div>
                        <div class="tips">
                            <ul>
                                <li>
                                    <i />
                                    <span>Đã bao gồm VAT</span>
                                </li>
                                <li>
                                    <i />
                                    <span>Quyền truy cập 1 năm</span>
                                </li>
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
                <div class="form-box">
                    <div class="headlines">
                        <p><Gift /> Chỉ từ <strong>699.000</strong> <b>VNĐ</b></p>
                        <p>Dành cho 50 học viên đầu tiên!</p>
                    </div>
                    <div class="timing">
                        <div class="description">Ưu đãi có hạn, đăng ký ngay để không bỏ lỡ</div>
                        <div class="countdown">
                            <b class="hv">14</b> <i class="hu">Giờ</i>
                            <b class="mv">24</b> <i class="mu">Phút</i>
                            <b class="sv">44</b> <i class="su">Giây</i>
                        </div>
                    </div>
                    <form>
                        <div class="fields">
                            <input type="text" placeholder="Họ và tên*" required />
                            <input type="text" placeholder="Email*" required />
                            <input type="text" placeholder="Số điện thoại*" required />
                            <input type="text" placeholder="Địa chỉ" />
                        </div>
                        <button type="submit">Đăng ký</button>
                    </form>
                </div>
            </div>
        </section>
    );
};
