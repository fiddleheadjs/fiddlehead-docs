import {useState, useEffect} from 'fiddlehead';
import {DocumentViewer} from '../../viewers/document/DocumentViewer';

export let createArticle = (path) => {
    let Article = () => {
        let [data, setData] = useState(null);
    
        useEffect(() => {
            import('@contents/' + path + '/index.md')
                .then((data) => {
                    // Update the document title
                    document.title = data.title;

                    // Update the data state
                    setData(data);
                });
        }, []);
    
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
