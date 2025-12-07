import {Slider} from '../slider';
import './StudySystem.less';

export let StudySystem = () => {
    return (
        <section class="StudySystem">
            <div class="heading">
                <div class="container">
                    <h2 class="title">Hệ sinh thái học tập toàn diện</h2>
                    <div class="divider" />
                    <div class="description">
                        Không còn lý thuyết suông - Mọi kiến thức đều được kết nối với bối cảnh kinh doanh thật.
                        Tự mở rộng tình huống thực tế không giới hạn với case builder.
                    </div>
                </div>
            </div>
            <div class="screenshots">
                <div class="container">
                    <Slider
                        gap="60px"
                        slideWidth="1200px"
                        slideHeight="550px"
                        slideItems={['#def', '#dfe', '#fde'].map(background => ({
                            id: background,
                            render: () => <img style={{background}} />
                        }))}
                    />
                </div>
            </div>
            <div class="numbers">
                <div class="container">
                    <div class="content-bar">
                        <ul>
                            {[
                                ['1048+', 'Case Study', 'Tình huống thực tế'],
                                ['250+', 'Khối lý thuyết', 'Được chắt lọc cẩn thận'],
                                ['500+', 'Mini Quiz', 'Kiểm tra nắm chắc kiến thức'],
                                ['100+', 'Tips quản trị', 'Bí quyết tạo nên khác biệt'],
                                ['15', 'Module chuyên biệt', 'Từ cơ bản đến nâng cao'],
                                ['365', 'Ngày truy cập', 'Học linh hoạt theo lịch']
                            ].map(([quantity, unit, description]) => (
                                <li key={unit}>
                                    <div class="quantity">{quantity}</div>
                                    <div class="unit">{unit}</div>
                                    <div class="description">{description}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};
