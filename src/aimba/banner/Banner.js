import {Background} from '../background';
import {SquareCheck} from '../icons';
import './Banner.less';

export let Banner = () => {
    return (
        <section class="Banner" role="banner">
            <div class="messages">
                <Background
                    image="/aimba/img/background-07.jpg"
                    imageSet="/aimba/img/background-07-800w.jpg 800w, /aimba/img/background-07-2000w.jpg 2000w"
                    imageSizes="(max-width: 600px) 200px"
                />
                <div class="illustration">
                    <img src="/aimba/img/banner-illustration.jpg" alt="AiMBA illustration" />
                </div>
                <div class="container">
                    <div class="overlay">
                        <div class="group">
                            <div class="headline">
                                <div class="brand">
                                    <span>AiMBA</span>
                                </div>
                                <div class="slogan">
                                    <com-word>Agile & Immersive</com-word> <com-word>MBA-level training</com-word>
                                </div>
                            </div>
                        </div>
                        <div class="group">
                            <div class="description">Học MBA thực chiến với AI qua mô phỏng hàng nghìn tình huống thật.</div>
                        </div>
                        <div class="group">
                            <ul class="checklist">
                                <li>
                                    <i><SquareCheck /></i>
                                    <span>Cung cấp hệ thống kiến thức</span>
                                </li>
                                <li>
                                    <i><SquareCheck /></i>
                                    <span>Mài sắc tư duy quản lý</span>
                                </li>
                                <li>
                                    <i><SquareCheck /></i>
                                    <span>Kỹ năng và công cụ quản trị</span>
                                </li>
                                <li>
                                    <i><SquareCheck /></i>
                                    <span>Trợ lý AI giải quyết nhanh công việc</span>
                                </li>
                                <li>
                                    <i><SquareCheck /></i>
                                    <span>Năng lực quản trị chuẩn quốc tế</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="numbers">
                <div class="container">
                    <div class="item">
                        <div class="content">
                            <b>1048+</b> <span>Case quản trị kinh điển</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="content">
                            <b>250+</b> <span>Khối kiến thức</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="content">
                            <b>38+</b> <span>Mô hình kinh doanh</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
