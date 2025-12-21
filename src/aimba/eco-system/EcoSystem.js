import {Background} from '../background';
import {ImageView} from '../image-view';
import {Slider} from '../slider';
import './EcoSystem.less';

export let EcoSystem = ({
    sections: {
        ecoSystem: {slideImages, highlightsBackgroundImage}
    }
}) => {
    let highlights = [
        ['1048+', 'Case Study', 'Tình huống thực tế'],
        ['250+', 'Khối lý thuyết', 'Được chắt lọc cẩn thận'],
        ['500+', 'Mini Quiz', 'Kiểm tra nắm chắc kiến thức'],
        ['100+', 'Tips quản trị', 'Bí quyết tạo nên khác biệt'],
        ['15', 'Module chuyên biệt', 'Từ cơ bản đến nâng cao'],
        ['365', 'Ngày truy cập', 'Học linh hoạt theo lịch']
    ];

    return (
        <section class="EcoSystem" id="EcoSystem">
            <div class="heading">
                <div class="container">
                    <h2 class="title">Hệ sinh thái học tập <com-word>toàn diện</com-word></h2>
                    <div class="divider" />
                    <div class="description">
                        Không còn lý thuyết suông - Mọi kiến thức đều được kết nối với bối cảnh kinh doanh thật.
                        Tự mở rộng tình huống thực tế không giới hạn với <com-word>case builder.</com-word>
                    </div>
                </div>
            </div>
            <div class="screenshots">
                <Slider
                    slideItems={slideImages.map(({src, alt}, index) => ({
                        id: src,
                        render: () => (
                            <ImageView>
                                <img
                                    src={src}
                                    alt={alt}
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                />
                            </ImageView>
                        )
                    }))}
                >
                    {({ slideShow, backButton, nextButton, dotNavigation }) => (
                        <>
                            {slideShow()}
                            {backButton()}
                            {nextButton()}
                            {dotNavigation()}
                        </>
                    )}
                </Slider>
            </div>
            <div class="highlights">
                <div class="container">
                    <div class="content-bar">
                        <Background image={highlightsBackgroundImage.src} lazy />
                        <ul>
                            {highlights.map(([quantity, unit, description]) => (
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
