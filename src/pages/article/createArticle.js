import {useState, useEffect} from 'fiddlehead';
import {DocumentViewer} from '../../viewers/document/DocumentViewer';

export let createArticle = (path) => {
    let Article = () => {
        let [data, setData] = useState(null);
    
        useEffect(() => {
            import('@contents/' + path + '/index.md').then(setData);
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
            />
        );
    };

    return Article;
};
