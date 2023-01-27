import {useState, useEffect, useRef} from 'fiddlehead';
import {DocumentViewer} from '../../viewers/document/DocumentViewer';

export let createArticle = (contentPath, currentNavItem) => {
    let Article = () => {
        let [data, setData] = useState(null);
        let [error, setError] = useState(null);
        
        useEffect(() => {
            import('@contents/' + contentPath + '/index.md').then(data => {
                setData(data);
            }).catch((error) => {
                setError(error);
            });
        }, []);

        useEffect(() => {
            // Update the document title
            // This should be done after every render
            // not only after importing
            if (data !== null) {
                document.title = data.title;
            }
        }, [data]);

        if (error !== null) {
            throw error;
        }
    
        if (data === null) {
            return null;
        }

        let {headings, contents} = data;
    
        return (
            <DocumentViewer
                headings={headings}
                contents={contents}
                contentPath={contentPath}
                next={currentNavItem.next}
                previous={currentNavItem.previous}
            />
        );
    };

    return Article;
};
