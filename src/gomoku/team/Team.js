import './Team.less';

export let Team = ({ teamName, team, users, thinking, thinkingUserIndex, now }) => {
    return (
        <div class="Team">
            <h3>Team {teamName}</h3>
            {team.map((userId, index) => {
                let user = users[userId];
                let disconnected = now - user.lastPingAt > 4000;
                return (
                    <div key={user.id} class={`user ${disconnected  ? 'disconnected' : ''} ${thinking && thinkingUserIndex === index ? 'thinking' : ''}`}>
                        {user.name}
                    </div>
                );
            })}
        </div>
    );
};
