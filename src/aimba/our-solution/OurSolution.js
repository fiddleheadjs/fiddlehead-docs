import {CircleCheck, CircleCheckOutline, TriangleRight} from '../icons';
import {ImageView} from '../image-view';
import {Macbook} from '../pictogram';
import {Slider} from '../slider';
import './OurSolution.less';

export let OurSolution = () => {
    let imgWhyUs = '/aimba/img/our-solution-why-us.jpg';

    let screenshots = [
        ['/aimba/img/shared-screenshot-01.jpg', 'Screenshot 01'],
        ['/aimba/img/shared-screenshot-02.jpg', 'Screenshot 02'],
        ['/aimba/img/shared-screenshot-03.jpg', 'Screenshot 03'],
        ['/aimba/img/shared-screenshot-04.jpg', 'Screenshot 04'],
        ['/aimba/img/shared-screenshot-05.jpg', 'Screenshot 05'],
        ['/aimba/img/shared-screenshot-06.jpg', 'Screenshot 06'],
    ];
    
    return (
        <section class="OurSolution" id="OurSolution">
            <div class="why-us">
                <div class="container">
                    <div class="details">
                        <h2 class="title">Tại sao nên chọn AiMBA?</h2>
                        <div class="description">
                            Thực tế cho thấy, nhiều lãnh đạo thành công nhờ kinh nghiệm thực chiến,
                            va chạm thị trường, học hỏi từ sai lầm – chứ không phải chỉ nhờ bằng cấp.
                            Và đa số người có bằng MBA thành công thường vốn đã làm ở tập đoàn lớn và giỏi xử lý các tình huống thực tiễn.
                            MBA truyền thống là nền tảng, nhưng khi vào phòng họp, cái bạn cần lại là giải case thực tế:
                        </div>
                        <div class="questions">
                            <ul>
                                <li>
                                    <i><CircleCheckOutline /></i>
                                    <span>Làm sao áp dụng SWOT khi đối thủ là doanh nghiệp gia đình với mạng lưới quan hệ phức tạp?</span>
                                </li>
                                <li>
                                    <i><CircleCheckOutline /></i>
                                    <span>Làm sao thuyết phục đội ngũ thay đổi khi văn hóa “cả nể” đang kìm hãm?</span>
                                </li>
                                <li>
                                    <i><CircleCheckOutline /></i>
                                    <span>Làm sao triển khai Design Thinking trong một tổ chức phân cấp cao, nơi mà nhân sự ngại đổi mới?</span>
                                </li>
                            </ul>
                        </div>
                        <div class="solution">
                            <i><TriangleRight /></i>
                            <span>Và AIMBA - Hệ thống đào tạo mô phỏng MBA thực chiến tích hợp AI chính là giải pháp được TACA thiết kế để đồng hành cùng bạn.</span>
                        </div>
                    </div>
                    <div class="photos">
                        <ImageView>
                            <img src={imgWhyUs} alt="Tại sao nên chọn AiMBA?" loading="lazy" />
                        </ImageView>
                    </div>
                </div>
            </div>
            <div class="your-needs">
                <div class="container">
                    <h2 class="title">Phát triển năng lực quản trị chuẩn MBA theo cách linh hoạt, thực chiến và tối đa hóa ROI</h2>
                    <div class="content">
                        <div class="photos">
                            <Slider
                                slideItems={screenshots.map(([src, alt]) => ({
                                    id: src,
                                    render: () => <img src={src} alt={alt} loading="lazy" />
                                }))}
                            >
                                {({slideShow, dotNavigation}) => (
                                    <>
                                        <div class="macbook-simulator">
                                            <Macbook />
                                            <div class="macbook-screen">
                                                {slideShow()}
                                            </div>
                                        </div>
                                        {dotNavigation()}
                                    </>
                                )}
                            </Slider>
                        </div>
                        <div class="details">
                            <div class="checklist">
                                <ul>
                                    {[
                                        'Tăng thăng tiến khi học quản trị chuẩn MBA',
                                        'Sẵn kho tài liệu lớn, cung cấp các thông tin',
                                        'Không lo về chi phí khi học AiMBA',
                                        'Tiềm năng tăng thu nhập lâu dài',
                                        'Không cần nghỉ việc - Không lo mất lương - Không bỏ lỡ cơ hội',
                                        'Vừa học vừa tăng hiệu quả công việc'
                                    ].map(text => (
                                        <li key={text}>
                                            <i><CircleCheck /></i>
                                            <span>{text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div class="actions">
                                <a class="x-button" href="#Enrollment">Đăng ký</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
