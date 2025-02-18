import {UserName} from '../user-name/UserName';
import {getTeamName} from '../utils';
import './Team.less';

export let Team = ({ teamId, teamMembers, users, thinking, thinkingUserIndex, streak, now }) => {
    return (
        <div class="Team" data-team={teamId}>
            <h3>{getTeamName(teamId)}</h3>
            {teamMembers.map((userId, index) => {
                let user = users[userId];
                return (
                    <div key={user.id} class={`user ${thinking && thinkingUserIndex === index && streak === null ? 'thinking' : ''}`}>
                        <UserName
                            key={user.id}
                            user={user}
                            now={now}
                        />
                    </div>
                );
            })}
        </div>
    );
};
