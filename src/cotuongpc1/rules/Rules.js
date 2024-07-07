import './Rules.less';

export let Rules = () => {
    return (
        <div class="Rules">
            <details>
                <summary>Chi tiết điều lệ</summary>
                <h3>Giải thưởng</h3>
                <ul>
                    <li>Quán quân: 500.000đ + cúp vô địch</li>
                    <li>Á quân: 300.000đ</li>
                    <li>Quý quân: 200.000đ</li>
                    <li>Điện quân: 100.000đ</li>
                </ul>
                <h3>Thể thức thi đấu</h3>
                <ul>
                    <li>Thể thức vòng tròn tính điểm 11 vòng đấu, diễn ra trong 11 tuần. Mỗi kỳ thủ thi đấu 1 trận mỗi vòng.</li>
                    <li>Mỗi trận đấu các kỳ thủ thi đấu 2 ván cờ để quyết định thắng/hòa/thua. Kỳ thủ thắng trận đấu được 2 điểm, hòa 1 điểm, thua 0 điểm.</li>
                    <li>Thể thức ván cờ: 25 phút tích lũy 10 giây cho mỗi nước đi (25m+10s).</li>
                </ul>
                <h3>Chấp quân, chấp tiên</h3>
                <p>Các kỳ thủ được phân làm 4 nhóm: A, B, C, D. Quy tắc chấp quân, chấp tiên như sau:</p>
                <ul>
                    <li>A chấp B = 1 mã</li>
                    <li>A chấp C = 1 mã + 1 tiên</li>
                    <li>A chấp D = 1 pháo + 1 tiên</li>
                    <li>B chấp C = 2 tiên</li>
                    <li>B chấp D = 1 mã</li>
                    <li>C chấp D = 2 tiên</li>
                    <li>Cùng nhóm đánh phân tiên</li>
                </ul>
                <h3>Luật cờ tướng</h3>
                <p>Giải đấu áp dụng <a href="/files/luat_co_tuong.pdf">Luật cờ tướng Việt Nam</a> có sửa đổi. Một số ý chính:</p>
                <ul>
                    <li>Hạn định số nước đi dẫn tới hòa cờ: Trang 10, mục 12</li>
                    <li>Cách xếp hạng các kỳ thủ: Trang 16, mục 21</li>
                    <li>Mười điểm chính khi xử ván cờ: Trang 17, mục 23</li>
                </ul>
                <p>Một số tình huống hay xảy ra:</p>
                <ul>
                    <li>Khi đi quân hoặc ăn quân, sau khi đã đặt quân xuống bàn và thả tay ra thì nước đi được xác lập và không được đi lại. Khi quân chưa chạm bàn, hoặc chưa thả tay ra thì được đi lại.</li>
                    <li>Khi thực hiện một nước đi không hợp lệ, bao gồm bỏ tướng hoặc làm lộ mặt tướng, thì bị tính lỗi kỹ thuật và được đi lại.</li>
                    <li>Chỉ bấm đồng hồ sau khi hoàn thành nước đi, tay nào đi quân tay đó bấm đồng hồ. Bên nào không bấm đồng hồ thì tự chịu thiệt thòi về thời gian, đối thủ vẫn thực hiện các nước đi bình thường.</li>
                    <li>Sau khi mỗi bên đi được 50 nước mà không ăn quân thì xử hòa.</li>
                    <li>Chỉ được phép chiếu hoặc bắt tối đa 6 nước liên tục với 1 quân, 12 nước liên tục với 2 quân, và 18 nước liên tục với 3 quân.</li>
                    <li>Chiếu một hoặc nhiều lần, nghỉ 1 lần (nhất cách nhất chiếu) là được phép</li>
                    <li>Bắt một hoặc nhiều lần, nghỉ 1 lần là được phép</li>
                    <li>Chiếu một hoặc nhiều lần, bắt 1 lần là được phép</li>
                    <li>Bắt một hoặc nhiều lần, chiếu 1 lần là được phép</li>
                    <li>Chiếu một hoặc nhiều lần và dọa chiếu bí là được phép</li>
                    <li>Bắt 2 hay nhiều quân liên tục là được phép</li>
                    <li>Cản quân liên tục là được phép</li>
                </ul>
            </details>
        </div>
    );
};
