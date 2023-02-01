import './Contents.less';
import {createPortal, useLayoutEffect, useState} from 'fiddlehead';
import {PlaygroundViewer} from '../playground/PlaygroundViewer';

export let Contents = ({content, playgrounds, ref}) => {
    let [playgroundPortals, setPlaygroundPortals] = useState({});

    useLayoutEffect(() => {        
        let playgroundPortals = {};

        playgrounds.forEach(({id}) => {
            let slot = ref.current.querySelector(`playground[data-id="${id}"]`);
            let subtreeRoot = document.createElement('div');
            slot.appendChild(subtreeRoot);
            let PP = ({children}) => createPortal(children, subtreeRoot);
            playgroundPortals[id] = PP;
        });

        setPlaygroundPortals(playgroundPortals);
    }, [content, playgrounds]);

    return (
        <div
            class="Contents"
            innerHTML={content}
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
