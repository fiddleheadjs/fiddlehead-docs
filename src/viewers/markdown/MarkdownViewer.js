import './MarkdownViewer.less';
import * as marked from 'marked';
import {highlight} from '../../utils/highlight';

export let MarkdownViewer = ({content, headings, headingPosRef}) => {
    const renderer = new marked.Renderer();

    renderer.heading = (text, level, raw) => {
        if (level === 1) {
            return `<h${level}>${text}</h${level}>`;
        }

        headingPosRef.current++;
        const {id} = headings[headingPosRef.current];

        return `<h${level} id="${id}"><a href="#${id}">&para;</a>${text}</h${level}>`;
    };

    const markedOptions = {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: highlight,
        renderer: renderer,
    };

    return (
        <div
            class="MarkdownViewer"
            innerHTML={marked.marked(content, markedOptions)}
        />
    );
};
