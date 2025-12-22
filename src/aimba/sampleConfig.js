
let imgAttrs = ([src, alt]) => ({src, alt});

let videoAttrs = ([src, poster]) => ({src, poster});

export let sampleConfig = {
    onRegistrationRequest() {
        location.href = '#Registration';
    },
    onLoginRequest() {
        alert('Giả lập yêu cầu đăng nhập');
    },
    onRegistrationFormSubmit({formData, onFeedback}) {
        let values = {};
        for (let [name, value] of formData.entries()) {
            values[name] = value;
        }
        console.log('Registration form data:', values);
        let feedback = prompt(
            'Giả lập xử lý form đăng ký, data được log trong console.\n' +
            'Nhập một trong các phản hồi sau để kết thúc quá trình:\n' +
            '- success: <thông báo thành công>\n' +
            '- error: <thông báo lỗi>\n' +
            '- abort'
        );
        if (feedback === null) {
            return;
        }
        let [type, ...messageChunks] = feedback.split(':').map(t => t.trim());
        onFeedback({
            type,
            message: messageChunks.join()
        });
    },
    contents: {
        banner: {
            backgroundImage: {
                landscape: {
                    src: '/aimba/img/background-07-landscape.jpg'
                },
                portrait: {
                    src: '/aimba/img/background-07-portrait.jpg'
                },
            },
            coverImage: {
                src: '/aimba/img/banner-illustration.jpg',
                alt: 'AiMBA'
            }
        },
        ecoSystem: {
            slideImages: [
                ['/aimba/img/shared-screenshot-03.jpg', 'Screenshot 03'],
                ['/aimba/img/shared-screenshot-02.jpg', 'Screenshot 02'],
                ['/aimba/img/shared-screenshot-01.jpg', 'Screenshot 01'],
            ].map(imgAttrs),
            highlightsBackgroundImage: {
                src: '/aimba/img/background-01.jpg'
            }
        },
        resources: {
            brandStories: {
                slideImages: [
                    ['/aimba/img/shared-screenshot-02.jpg', 'Screenshot 02'],
                    ['/aimba/img/shared-screenshot-03.jpg', 'Screenshot 03'],
                    ['/aimba/img/shared-screenshot-04.jpg', 'Screenshot 04'],
                ].map(imgAttrs)
            },
            businessModels: {
                slideImages: [
                    ['/aimba/img/shared-screenshot-03.jpg', 'Screenshot 03'],
                    ['/aimba/img/shared-screenshot-04.jpg', 'Screenshot 04'],
                    ['/aimba/img/shared-screenshot-05.jpg', 'Screenshot 05'],
                ].map(imgAttrs)
            },
            bookInsights: {
                slideImages: [
                    ['/aimba/img/shared-screenshot-04.jpg', 'Screenshot 04'],
                    ['/aimba/img/shared-screenshot-05.jpg', 'Screenshot 05'],
                    ['/aimba/img/shared-screenshot-06.jpg', 'Screenshot 06'],
                ].map(imgAttrs)
            },
            miscellaneous: {
                slideImages: [
                    ['/aimba/img/shared-screenshot-05.jpg', 'Screenshot 05'],
                    ['/aimba/img/shared-screenshot-06.jpg', 'Screenshot 06'],
                    ['/aimba/img/shared-screenshot-01.jpg', 'Screenshot 01'],
                ].map(imgAttrs)
            }
        },
        modules: {
            backgroundImage: {
                src: '/aimba/img/background-02.jpg'
            },
            slideVideos: [
                ['/aimba/video/modules-video-01.mp4', '/aimba/img/modules-poster-01.jpg'],
                ['/aimba/video/modules-video-02.mp4', '/aimba/img/modules-poster-02.jpg'],
                ['/aimba/video/modules-video-03.mp4', '/aimba/img/modules-poster-03.jpg'],
            ].map(videoAttrs)
        },
        coreValues: {
            backgroundImage: {
                src: '/aimba/img/background-03.jpg'
            }
        },
        ourSolution: {
            coverImage: {
                src: '/aimba/img/our-solution-why-us.jpg',
                alt: 'Tại sao nên chọn AiMBA?'
            },
            slideImages: [
                ['/aimba/img/shared-screenshot-01.jpg', 'Screenshot 01'],
                ['/aimba/img/shared-screenshot-02.jpg', 'Screenshot 02'],
                ['/aimba/img/shared-screenshot-03.jpg', 'Screenshot 03'],
                ['/aimba/img/shared-screenshot-04.jpg', 'Screenshot 04'],
                ['/aimba/img/shared-screenshot-05.jpg', 'Screenshot 05'],
                ['/aimba/img/shared-screenshot-06.jpg', 'Screenshot 06'],
            ].map(imgAttrs)
        },
        learningStrategy: {
            backgroundImage: {
                src: '/aimba/img/background-04.jpg'
            },
            coverImage: {
                src: '/aimba/img/learning-strategy-cover.jpg',
                alt: 'Cách thức học tập tại AiMBA'
            }
        },
        targetAudience: {
            backgroundImage: {
                src: '/aimba/img/background-05.jpg'
            },
            certificateImage: {
                src: '/aimba/img/target-audience-certificate.png',
                alt: 'Chứng nhận hoàn thành khóa học'
            }
        },
        beingTrusted: {
            testimonials: [
                {
                    avatar: '/aimba/img/being-trusted-person-01.jpg',
                    name: 'Anh Nguyễn Bảo An',
                    title: 'Chuyên gia phân tích tài chính',
                    message: 'Tôi từng cân nhắc học MBA nhưng chi phí, công sức và thời gian nghỉ việc hiện tại là rào cản quá lớn. Với AiMBA, chỉ sau vài giờ học tôi đã có thể áp dụng ngay kiến thức vào công việc và thấy kết quả rõ rệt trong hiệu suất đội nhóm, giúp 1 dự án marketing tối ưu 15% chi phí nhờ cách phân tích tình huống. Sếp tôi đã rất hài lòng.'
                },
                {
                    avatar: '/aimba/img/being-trusted-person-02.jpg',
                    name: 'Chị Trần Ngọc Lan',
                    title: 'Chuyên gia phân tích tài chính',
                    message: 'Điều tôi ấn tượng nhất ở AiMBA là mọi kiến thức MBA không còn nằm trong sách vở, mà được đặt thẳng vào những tình huống doanh nghiệp Việt Nam. Thay vì học SWOT hay BSC theo lý thuyết, tôi được thực hành trên case thực tế và thấy ngay cách áp dụng vào công việc. Đây là điểm khác biệt mà tôi rất thích.'
                },
                {
                    avatar: '/aimba/img/being-trusted-person-03.jpg',
                    name: 'Anh Nguyễn Quốc Anh',
                    title: 'Chuyên gia phân tích tài chính',
                    message: 'Tôi từng cân nhắc học MBA nhưng chi phí, công sức và thời gian nghỉ việc hiện tại là rào cản quá lớn. Với AiMBA, chỉ sau vài giờ học tôi đã có thể áp dụng ngay kiến thức vào công việc và thấy kết quả rõ rệt trong hiệu suất đội nhóm, giúp 1 dự án marketing tối ưu 15% chi phí nhờ cách phân tích tình huống. Sếp tôi đã rất hài lòng.'
                },
                {
                    avatar: '/aimba/img/being-trusted-person-04.jpg',
                    name: 'Chị Hoàng Thu Huyền',
                    title: 'Chuyên gia phân tích tài chính',
                    message: 'Tôi từng cân nhắc học MBA nhưng chi phí, công sức và thời gian nghỉ việc hiện tại là rào cản quá lớn. Với AiMBA, chỉ sau vài giờ học tôi đã có thể áp dụng ngay kiến thức vào công việc và thấy kết quả rõ rệt trong hiệu suất đội nhóm, giúp 1 dự án marketing tối ưu 15% chi phí nhờ cách phân tích tình huống. Sếp tôi đã rất hài lòng.'
                },
                {
                    avatar: '/aimba/img/being-trusted-person-05.jpg',
                    name: 'Anh Quốc Hưng',
                    title: 'Chuyên gia phân tích tài chính',
                    message: 'Tôi từng cân nhắc học MBA nhưng chi phí, công sức và thời gian nghỉ việc hiện tại là rào cản quá lớn. Với AiMBA, chỉ sau vài giờ học tôi đã có thể áp dụng ngay kiến thức vào công việc và thấy kết quả rõ rệt trong hiệu suất đội nhóm, giúp 1 dự án marketing tối ưu 15% chi phí nhờ cách phân tích tình huống. Sếp tôi đã rất hài lòng.'
                },
                {
                    avatar: '/aimba/img/being-trusted-person-06.jpg',
                    name: 'Chị Trịnh Như Ý',
                    title: 'Chuyên gia phân tích tài chính',
                    message: 'Tôi từng cân nhắc học MBA nhưng chi phí, công sức và thời gian nghỉ việc hiện tại là rào cản quá lớn. Với AiMBA, chỉ sau vài giờ học tôi đã có thể áp dụng ngay kiến thức vào công việc và thấy kết quả rõ rệt trong hiệu suất đội nhóm, giúp 1 dự án marketing tối ưu 15% chi phí nhờ cách phân tích tình huống. Sếp tôi đã rất hài lòng.'
                },
                {
                    avatar: '/aimba/img/being-trusted-person-07.jpg',
                    name: 'Chị Khánh Ngọc',
                    title: 'Chuyên gia phân tích tài chính',
                    message: 'Tôi từng cân nhắc học MBA nhưng chi phí, công sức và thời gian nghỉ việc hiện tại là rào cản quá lớn. Với AiMBA, chỉ sau vài giờ học tôi đã có thể áp dụng ngay kiến thức vào công việc và thấy kết quả rõ rệt trong hiệu suất đội nhóm, giúp 1 dự án marketing tối ưu 15% chi phí nhờ cách phân tích tình huống. Sếp tôi đã rất hài lòng.'
                },
                {
                    avatar: '/aimba/img/being-trusted-person-08.jpg',
                    name: 'Anh Trương Văn Long',
                    title: 'Chuyên gia phân tích tài chính',
                    message: 'Tôi từng cân nhắc học MBA nhưng chi phí, công sức và thời gian nghỉ việc hiện tại là rào cản quá lớn. Với AiMBA, chỉ sau vài giờ học tôi đã có thể áp dụng ngay kiến thức vào công việc và thấy kết quả rõ rệt trong hiệu suất đội nhóm, giúp 1 dự án marketing tối ưu 15% chi phí nhờ cách phân tích tình huống. Sếp tôi đã rất hài lòng.'
                },
                {
                    avatar: '/aimba/img/being-trusted-person-09.jpg',
                    name: 'Anh Võ Minh Nhất',
                    title: 'Chuyên gia phân tích tài chính',
                    message: 'Tôi từng cân nhắc học MBA nhưng chi phí, công sức và thời gian nghỉ việc hiện tại là rào cản quá lớn. Với AiMBA, chỉ sau vài giờ học tôi đã có thể áp dụng ngay kiến thức vào công việc và thấy kết quả rõ rệt trong hiệu suất đội nhóm, giúp 1 dự án marketing tối ưu 15% chi phí nhờ cách phân tích tình huống. Sếp tôi đã rất hài lòng.'
                },
                {
                    avatar: '/aimba/img/being-trusted-person-10.jpg',
                    name: 'Anh Nguyễn Thành Bảo',
                    title: 'Chuyên gia phân tích tài chính',
                    message: 'Tôi từng cân nhắc học MBA nhưng chi phí, công sức và thời gian nghỉ việc hiện tại là rào cản quá lớn. Với AiMBA, chỉ sau vài giờ học tôi đã có thể áp dụng ngay kiến thức vào công việc và thấy kết quả rõ rệt trong hiệu suất đội nhóm, giúp 1 dự án marketing tối ưu 15% chi phí nhờ cách phân tích tình huống. Sếp tôi đã rất hài lòng.'
                },
            ]
        },
        registration: {
            backgroundImage: {
                src: '/aimba/img/background-06.jpg'
            },
        },
        footer: {
            qrCode: {
                data: 'https://tacasoft.vn',
                image: {
                    src: '/aimba/img/qrcode-tacasoft.png',
                    alt: 'Tacasoft QR code'
                }
            }
        }
    }
};
