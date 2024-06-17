import './Rules.less';

export let Rules = () => {
    return (
        <div class="Rules">
            <details>
                <summary>Xem chi tiết</summary>
                <h3>Cách thức tiến hành:</h3>
                <ul>
                    <li>Thể thức vòng tròn tính điểm 11 vòng đấu, diễn ra trong 11 tuần. Mỗi kỳ thủ thi đấu 1 trận mỗi vòng.</li>
                    <li>Trận chung kết diễn ra giữa 2 kỳ thủ đứng đầu.</li>
                    <li>Mỗi trận đấu các kỳ thủ thi đấu 2 ván cờ để quyết định thắng/hòa/thua. Kỳ thủ thắng trận đấu được 2 điểm, hòa 1 điểm, thua 0 điểm.</li>
                    <li>Thể thức ván cờ: 25 phút tích lũy 10 giây cho mỗi nước đi (25m+10s).</li>
                </ul>
                <h3>Chấp quân, chấp tiên:</h3>
                <p>Các kỳ thủ được phân làm 4 nhóm: A, B, C, D. Quy tắc chấp quân, chấp tiên như sau:</p>
                <ul>
                    <li>A chấp B = 1 Mã</li>
                    <li>A chấp C = 1 Mã + 1 Tiên</li>
                    <li>A chấp D = 1 Pháo + 1 Tiên </li>
                    <li>B chấp C = 2 Tiên</li>
                    <li>B chấp D = 1 Mã</li>
                    <li>C chấp D = 2 Tiên</li>
                    <li>Cùng nhóm đánh phân tiên</li>
                </ul>
                <h3>Luật cờ tướng Việt Nam:</h3>
                <p>Giải đấu áp dụng <a href="/files/luat_co_tuong.pdf">Luật cờ tướng Việt Nam</a>. Một số ý chính:</p>
                <ul>
                    <li>Hạn định số nước đi dẫn tới hòa cờ: Trang 10, mục 12</li>
                    <li>Cách xếp hạng các kỳ thủ: Trang 16, mục 21.3</li>
                    <li>Mười điểm chính khi xử ván cờ: Trang 17, mục 23</li>
                </ul>
            </details>
        </div>
    );
};
