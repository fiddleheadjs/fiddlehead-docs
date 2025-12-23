import {useEffect} from 'fiddlehead';

export let useResizeObserver = (targetRef, {callback}) => {
    useEffect(() => {
        if (typeof ResizeObserver === 'undefined') {
            return;
        }
        let target = targetRef.current;
        if (target == null) {
            return;
        }
        let previousWidth = 0;
        let previousHeight = 0;
        let observer = new ResizeObserver(([ entry ]) => {
            if (entry.contentRect) {
                let {width, height} = entry.contentRect;
                let widthChange = Math.abs(width - previousWidth);
                let heightChange = Math.abs(height - previousHeight);
                let threshold = 2;
                if (widthChange > threshold || heightChange > threshold) {
                    callback(entry);
                    previousWidth = width;
                    previousHeight = height;
                }
            }
        });
        observer.observe(target);
        return () => {
            observer.unobserve(target);
        };
    }, []);
};
