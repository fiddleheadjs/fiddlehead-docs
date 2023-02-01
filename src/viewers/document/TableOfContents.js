import './TableOfContents.less';
import {__} from '../../modules/i18n';

export let TableOfContents = ({headings, ref}) => {
    return (
        <div
            class="TableOfContents"
            ref={ref}
        >
            <div class="title">{__('Table of contents')}</div>
            <ul class="list">
                {headings.map(({text, level, id}) => (
                    <li key={id} data-id={id} data-level={level}>
                        <a href={'#'.concat(id)} innerHTML={text} />
                    </li>
                ))}
            </ul>
        </div>
    );
};
