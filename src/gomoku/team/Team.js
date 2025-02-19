import './Team.less';
import {UserName} from '../user-name/UserName';
import {getTeamName} from '../utils';

export let Team = ({ teamId, memberIds, tableCode, users, thinking, thinkingUserIndex, streak, now }) => {
    return (
        <div class="Team" data-team={teamId}>
            <h3>{getTeamName(teamId)}</h3>
            {memberIds.map((memberId, index) => {
                let member = users[memberId];
                let isMemberLeftOut = member.playingTableCode !== tableCode;
                if (isMemberLeftOut) {
                    return null;
                }
                let isMemberThinking = !isMemberLeftOut && thinking && thinkingUserIndex === index && streak === null;
                return (
                    <div key={member.id} class={`user ${isMemberThinking ? 'thinking' : ''}`}>
                        <UserName
                            key={member.id}
                            user={member}
                            now={now}
                        />
                    </div>
                );
            })}
        </div>
    );
};
