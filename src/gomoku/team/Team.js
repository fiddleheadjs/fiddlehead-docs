import './Team.less';

export let Team = ({ teamName, team, users, thinking, thinkingUserIndex }) => {
    return (
        <div class="Team">
            <h3>Team {teamName}</h3>
            {team.map((userId, index) => {
                let user = users[userId];
                return (
                    <div class="user" key={user.id} data-thinking={thinking && thinkingUserIndex === index}>
                        {user.name}
                    </div>
                );
            })}
        </div>
    );
};
