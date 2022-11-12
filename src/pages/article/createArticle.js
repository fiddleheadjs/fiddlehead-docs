import {useState, useEffect, useRef} from 'fiddlehead';
import {DocumentViewer} from '../../viewers/document/DocumentViewer';

export let createArticle = (contentPath, currentNavItem) => {
    let Article = () => {
        let [data, setData] = useState(null);

        let isUnmounted = useRef(false);
    
        useEffect(() => {
            import('@contents/' + contentPath + '/index.md').then(data => {
                if (!isUnmounted.current) {
                    setData(data);
                }
            });

            return () => {
                isUnmounted.current = true;
            };
        }, []);

        useEffect(() => {
            // Update the document title
            // This should be done after every render
            // not only after importing
            if (data !== null) {
                document.title = data.title;
            }
        }, [data]);
    
        if (data === null) {
            return null;
        }

        let {headings, contents, demos} = data;
    
        return (
            <DocumentViewer
                headings={headings}
                contents={contents}
                demos={demos}
                contentPath={contentPath}
                next={currentNavItem.next}
                previous={currentNavItem.previous}
            />
        );
    };

    return Article;
};
