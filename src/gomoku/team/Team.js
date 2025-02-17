import {getTeamName} from '../utils';
import './Team.less';

export let Team = ({ teamId, teamMembers, users, thinking, thinkingUserIndex, streak, now, align }) => {
    return (
        <div class={`Team align-${align}`} data-team={teamId}>
            <h3>{getTeamName(teamId)}</h3>
            {teamMembers.map((userId, index) => {
                let user = users[userId];
                let disconnected = now - user.lastPingAt > 4000;
                return (
                    <div key={user.id} class={`user ${disconnected  ? 'disconnected' : ''} ${thinking && thinkingUserIndex === index && streak === null ? 'thinking' : ''}`}>
                        {user.name}
                    </div>
                );
            })}
        </div>
    );
};
