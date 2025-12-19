import {Background} from '../background';
import {CircleCheck, Gift} from '../icons';
import {PromoCountdown} from './PromoCountdown';
import './Enrollment.less';

export let Enrollment = () => {
    const data = [
        'Truy cập đầy đủ <b>1048+ case study</b>',
        '<b>250+ khối lý thuyết</b> được kiến giải chi tiết',
        'Kho tài nguyên: <b>50+</b> Brand Stories, <b>40+</b> Business Models',
        '<b>24+ phân tích</b> sách kinh doanh nổi tiếng',
        '<b>Cố vấn AI</b> thông minh',
        '<b>Chứng nhận hoàn thành</b> cho từng module'
    ];

    return (
        <section class="Enrollment">
            <Background image="/aimba/img/background-06.jpg" lazy />
            <div class="container">
                <div class="details">
                    <h2 class="title">Gói ưu đãi <com-word>đặc biệt</com-word></h2>
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
                                    <i><CircleCheck checkColor="currentColor" circleColor="white" /></i>
                                    <span innerHTML={text} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div class="form-box">
                    <div class="headlines">
                        <p><Gift /> Chỉ từ <com-word><strong>699.000</strong> <b>VNĐ</b></com-word></p>
                        <p>Dành cho 50 học viên <com-word class="nobreak">đầu tiên!</com-word></p>
                    </div>
                    <div class="timing">
                        <div class="description">Ưu đãi có hạn, đăng ký ngay để <com-word>không bỏ lỡ</com-word></div>
                        <PromoCountdown />
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
