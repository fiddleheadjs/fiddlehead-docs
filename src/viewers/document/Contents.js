import './Contents.less';
import {render, useLayoutEffect} from 'fiddlehead';
import {PlaygroundViewer} from '../playground/PlaygroundViewer';

export let Contents = ({content, playgrounds, ref}) => {
    useLayoutEffect(() => {
        let container = ref.current;

        playgrounds.forEach(({id, fileList}) => {
            render(
                <PlaygroundViewer fileList={fileList} />,
                container.querySelector(`playground[data-id="${id}"]`)
            );
        });
    }, [content, playgrounds]);

    return (
        <div
            class="Contents"
            innerHTML={content}
            ref={ref}
        />
    );
};
