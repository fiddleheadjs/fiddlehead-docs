import './Contents.less';
import {createPortal, useLayoutEffect, useMemo} from 'fiddlehead';
import {PlaygroundViewer} from '../playground/PlaygroundViewer';

export let Contents = ({content, playgrounds, ref}) => {
    let container = useMemo(() => {
        let container = document.createElement('div');
        container.innerHTML = content;
        return container;
    }, [content]);

    let playgroundPortals = useMemo(() => {
        let playgroundPortals = {};
        playgrounds.forEach(({id}) => {
            let slot = container.querySelector(`playground[data-id="${id}"]`);
            let subtreeRoot = document.createElement('div');
            slot.appendChild(subtreeRoot);
            let PP = ({children}) => createPortal(children, subtreeRoot);
            playgroundPortals[id] = PP;
        });
        return playgroundPortals;
    }, [container, playgrounds]);

    useLayoutEffect(() => {
        ref.current.appendChild(container);
        return () => {
            if (ref.current !== null) {
                ref.current.removeChild(container);
            }
        };
    }, [container]);

    return (
        <div
            class="Contents"
            ref={ref}
        >
            {playgrounds.map(({id, fileList}) => {
                let PP = playgroundPortals[id];
                return (
                    <PP key={id}>
                        <PlaygroundViewer fileList={fileList} />
                    </PP>
                );
            })}
        </div>
    );
};
