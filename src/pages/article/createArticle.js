import {useState, useEffect} from 'fiddlehead';
import {DocumentTemplate} from '../../templates/document/DocumentTemplate';

export let createArticle = (filename) => {
    let Article = () => {
        let [data, setData] = useState(null);
    
        useEffect(() => {
            import('@contents/' + filename + '/index.md')
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
