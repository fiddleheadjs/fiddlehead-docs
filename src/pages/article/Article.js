import './Article.less';
import {useState, useEffect} from 'fiddlehead';

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
    
        return (
            <div class="Article">
                <h1>{data.title}</h1>
                <strong>{data.description}</strong>
            </div>
        );
    };

    return Article;
};
