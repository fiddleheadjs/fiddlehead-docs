import {useState, useEffect} from 'fiddlehead';
import {DocumentTemplate} from '../../templates/document/DocumentTemplate';

export let createArticle = (path) => {
    let Article = () => {
        let [data, setData] = useState(null);
    
        useEffect(() => {
            import('@contents/' + path + '/index.md')
                .then(setData);
        }, []);
    
        if (data === null) {
            return null;
        }

        let {headings, contents, demos} = data;
    
        return (
            <DocumentTemplate
                headings={headings}
                contents={contents}
                demos={demos}
            />
        );
    };

    return Article;
};
