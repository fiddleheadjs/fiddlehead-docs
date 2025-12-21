import {Background, onePixel} from '../background';
import {SquareCheck} from '../icons';
import './Banner.less';

export let Banner = ({
    sections: {
        banner: {
            backgroundImage,
            coverImage
        }
    }
}) => {
    return (
        <section class="Banner" role="banner">
            <div class="messages">
                <Background
                    image={[
                        ['(min-width: 601px)', backgroundImage.landscape.src],
                        ['(max-width: 600px)', backgroundImage.portrait.src],
                    ]}
                />
                <picture class="illustration">
                    <source media="(min-width: 1201px)" srcset={coverImage.src} />
                    <img src={onePixel} alt={coverImage.alt} aria-hidden="true" />
                </picture>
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
            <div class="highlights">
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
