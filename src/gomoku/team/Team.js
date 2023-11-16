import './Team.less';

export let Team = ({ teamName, team, users, thinking, thinkingUserIndex }) => {
    return (
        <div class="Team">
            <h3>Team {teamName}</h3>
            {team.map((userId, index) => {
                let user = users[userId];
                return (
                    <div key={user.id} class={`user ${thinking && thinkingUserIndex === index ? 'thinking' : ''}`}>
                        {user.name}
                    </div>
                );
            })}
        </div>
    );
};
