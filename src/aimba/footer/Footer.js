import {Headset, Home, Clock, Envelop, PhoneCall} from '../icons';
import {ImageView} from '../image-view';
import {Logo} from '../pictogram';
import './Footer.less';

export let Footer = () => {
    let imgQrcodeTacasoft = '/aimba/qrcode-tacasoft.png';

    return (
        <footer class="Footer">
            <div class="soft-edge">
                <svg viewBox="0 0 1920 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M396.468 48.7473C184.485 52.9502 41.9966 93.9364 -1 118.471V370.764L1921 371C1920.5 277.892 1921.2 73.7821 1920.2 0C1878.7 27.6989 1725.86 55.7314 1554.88 73.0847C1336.89 94.7764 1028.42 81.094 924.426 73.0847C590.453 50.3917 446.964 47.7462 396.468 48.7473Z" fill="url(#soft-edge-linear-gradient)" />
                    <defs>
                        <linearGradient id="soft-edge-linear-gradient" x1="0" y1="150" x2="1920" y2="150" gradientUnits="userSpaceOnUse">
                            <stop offset="0.25" stop-color="#1E469E" />
                            <stop offset="1" stop-color="#28A7DF" />
                        </linearGradient>
                    </defs>
                </svg>
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
                                    <span>gateway@bcanvas.vn</span>
                                </li>
                                <li>
                                    <i><PhoneCall /></i>
                                    <span>0948.088.586</span>
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
