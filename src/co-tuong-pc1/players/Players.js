export let Players = ({ players }) => {
    return (
        <div class="Players">
            <h2>Danh sách kỳ thủ tham dự</h2>
            <ul>
                {players.map(player => (
                    <li key={player.id}>
                        <p>{player.name}</p>
                        <p>Nhóm {player.group}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
