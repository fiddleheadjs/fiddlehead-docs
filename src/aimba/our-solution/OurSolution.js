import {CircleCheck} from '../icons/CircleCheck';
import {CircleCheckOutline} from '../icons/CircleCheckOutline';
import {TriangleRight} from '../icons/TriangleRight';
import './OurSolution.less';

export let OurSolution = () => {
    return (
        <div class="OurSolution">
            <div class="why-us">
                <div class="container">
                    <div class="details">
                        <div class="title">Tại sao nên chọn AiMBA?</div>
                        <div class="description">
                            Thực tế cho thấy, nhiều lãnh đạo thành công nhờ kinh nghiệm thực chiến,
                            va chạm thị trường, học hỏi từ sai lầm – chứ không phải chỉ nhờ bằng cấp.
                            Và đa số người có bằng MBA thành công thường vốn đã làm ở tập đoàn lớn và giỏi xử lý các tình huống thực tiễn.
                            MBA truyền thống là nền tảng, nhưng khi vào phòng họp, cái bạn cần lại là giải case thực tế:
                        </div>
                        <div class="questions">
                            <ul>
                                <li>
                                    <CircleCheckOutline />
                                    <span>Làm sao áp dụng SWOT khi đối thủ là doanh nghiệp gia đình với mạng lưới quan hệ phức tạp?</span>
                                </li>
                                <li>
                                    <CircleCheckOutline />
                                    <span>Làm sao áp dụng SWOT khi đối thủ là doanh nghiệp gia đình với mạng lưới quan hệ phức tạp?</span>
                                </li>
                                <li>
                                    <CircleCheckOutline />
                                    <span>Làm sao áp dụng SWOT khi đối thủ là doanh nghiệp gia đình với mạng lưới quan hệ phức tạp?</span>
                                </li>
                            </ul>
                        </div>
                        <div class="solution">
                            <TriangleRight />
                            <span>Và AIMBA - Hệ thống đào tạo mô phỏng MBA thực chiến tích hợp AI chính là giải pháp được TACA thiết kế để đồng hành cùng bạn.</span>
                        </div>
                    </div>
                    <div class="photos">
                        <img />
                    </div>
                </div>
            </div>
            <div class="fit-your-needs">
                <div class="container">
                    <div class="title">Phát triển năng lực quản trị chuẩn MBA theo cách linh hoạt, thực chiến và tối đa hóa ROI</div>
                    <div class="content">
                        <div class="photos">
                            <img />
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
                                            <CircleCheck />
                                            <span>{text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div class="actions">
                                <button type="button">Đăng ký</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
