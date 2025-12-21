import './Footer.less';
import {Headset, Home, Clock, Envelop, PhoneCall} from '../icons';
import {ImageView} from '../image-view';
import {Logo, Wave} from '../pictogram';

export let Footer = () => {
    let imgQrcodeTacasoft = '/aimba/img/qrcode-tacasoft.png';

    return (
        <footer class="Footer" role="contentinfo">
            <div class="wave-background">
                <Wave active />
            </div>
            <div class="main-area">
                <div class="container">
                    <div class="about-us">
                        <div class="brand">
                            <div class="logo-wrapper">
                                <Logo monochrome="currentColor" />
                            </div>
                            <div class="slogan">
                                AiMBA - Agile & Immersive
                                <br aria-hidden="true" />
                                MBA level - Tranning
                            </div>
                        </div>
                        <div class="mission">
                            AiMBA tiên phong định nghĩa lại phương pháp phát triển năng lực cho chuyên gia, nhà quản trị và đội nhóm thông qua một triết lý đào tạo khác biệt: kết nối tri thức nền tảng với thực tế thông qua các tình huống mô phỏng chân thực.
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
                                    <a href="mailto:gateway@bcanvas.vn">gateway@bcanvas.vn</a>
                                </li>
                                <li>
                                    <i><PhoneCall /></i>
                                    <a href="tel:0948.088.586">0948.088.586</a>
                                </li>
                            </ul>
                            <div class="qrcode">
                                <ImageView>
                                    <img src={imgQrcodeTacasoft} alt="Tacasoft QR code" loading="lazy" />
                                </ImageView>
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
