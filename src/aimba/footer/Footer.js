import {Headset, Home, Clock, Envelop, PhoneCall} from '../icons';
import {Logo} from '../pictogram';
import './Footer.less';

export let Footer = () => {
    return (
        <footer class="Footer">
            <div class="main-area">
                <div class="container">
                    <div class="about-us">
                        <div class="brand">
                            <Logo monochrome="currentColor" />
                            <div class="slogan">
                                AiMBA - Agile & Immersive
                                <br aria-hidden="true" />
                                MBA level -Tranning
                            </div>
                        </div>
                        <div class="mission">
                            AIMBA tiên phong định nghĩa lại phương pháp phát triển năng lực cho chuyên gia, nhà quản trị và đội nhóm thông qua một triết lý đào tạo khác biệt: kết nối tri thức nền tảng với thực tế thông qua các tình huống mô phỏng chân thực.
                        </div>
                    </div>
                    <div class="contact">
                        <div class="headline">Nhà phát triển ứng dụng đào tạo: Tacasoft</div>
                        <div class="info">
                            <ul>
                                <li>
                                    <i><Headset /></i>
                                    <span>Liên hệ hỗ trợ 24/7 </span>
                                </li>
                                <li>
                                    <i><Clock /></i>
                                    <span>Thứ 2-7, 8h30-17h30</span>
                                </li>
                                <li>
                                    <i><Envelop /></i>
                                    <span>gateway@bcanvas.vn</span>
                                </li>
                                <li>
                                    <i><PhoneCall /></i>
                                    <span>0948.088.586</span>
                                </li>
                            </ul>
                            <div class="qrcode">
                                <img />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom-line">
                <div class="container">
                    <ul>
                        <li>
                            <i><Home /></i>
                            <span>Trụ sở chính: Tầng 2 tòa A Chelsea Residences, 48 Trần Kim Xuyến, Yên Hòa, Hà Nội</span>
                        </li>
                        <li>
                            <i><Home /></i>
                            <span>Chi nhánh: Vincom Đồng Khởi, Quận 1, TP. HCM</span>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};
