import {useMemo, useState} from 'fiddlehead';

export let useLogger = () => {
    let [lines, setLines] = useState([]);
    
    return {
        log: (...chunks) => {
            setLines(lines => {
                let value = [
                    ...lines,
                    ['log', chunks],
                ];
                
                return value;
            });
        },
        lines: lines,
    };
};
