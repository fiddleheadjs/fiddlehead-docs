import {SquareCheck} from '../icons';
import './Banner.less';

export let Banner = () => {
    return (
        <section class="Banner">
            <div class="messages">
                <div class="container">
                    <div class="overlay">
                        <div class="group">
                            <div class="headline">
                                <div class="brand">
                                    <span>AiMBA</span>
                                </div>
                                <div class="slogan">
                                    Agile & Immersive MBA-level training
                                </div>
                            </div>
                        </div>
                        <div class="group">
                            <div class="description">Học MBA thực chiến với AI qua mô phỏng hàng nghìn tình huống thật.</div>
                        </div>
                        <div class="group">
                            <ul class="checklist">
                                <li>
                                    <SquareCheck />
                                    <span>Cung cấp hệ thống kiến thức</span>
                                </li>
                                <li>
                                    <SquareCheck />
                                    <span>Mài sắc tư duy quản lý</span>
                                </li>
                                <li>
                                    <SquareCheck />
                                    <span>Kỹ năng và công cụ quản trị</span>
                                </li>
                                <li>
                                    <SquareCheck />
                                    <span>Trợ lý AI giải quyết nhanh công việc</span>
                                </li>
                                <li>
                                    <SquareCheck />
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
