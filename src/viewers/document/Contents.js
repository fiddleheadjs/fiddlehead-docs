import './Contents.less';
import {createPortal, useLayoutEffect, useMemo} from 'fiddlehead';
import {PlaygroundViewer} from '../playground/PlaygroundViewer';

export let Contents = ({content, playgrounds, ref}) => {
    let inner = useMemo(() => {
        let inner = document.createElement('div');
        inner.className = 'inner';
        inner.innerHTML = content;
        return inner;
    }, [content]);

    let playgroundPortals = useMemo(() => {
        let playgroundPortals = {};
        playgrounds.forEach(({id}) => {
            let slot = inner.querySelector(`playground[data-id="${id}"]`);
            let subtreeRoot = document.createElement('div');
            slot.appendChild(subtreeRoot);
            let PP = ({children}) => createPortal(children, subtreeRoot);
            playgroundPortals[id] = PP;
        });
        return playgroundPortals;
    }, [inner, playgrounds]);

    useLayoutEffect(() => {
        ref.current.appendChild(inner);
        return () => {
            if (ref.current !== null) {
                ref.current.removeChild(inner);
            }
        };
    }, [inner]);

    return (
        <div class="Contents" ref={ref}>
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
