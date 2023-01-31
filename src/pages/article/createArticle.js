import './Article.less';
import {useState, useEffect} from 'fiddlehead';
import {Loading} from '../../components/loading/Loading';
import {__} from '../../modules/i18n';
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
            // This error should be handled in a higher level
            throw error;
        }

        let renderChildren = () => {
            if (data === null) {   
                return <Loading />;
            }
    
            let {title, description, headings, playgrounds, content} = data;
        
            return (
                <DocumentViewer
                    title={title}
                    description={description}
                    headings={headings}
                    playgrounds={playgrounds}
                    content={content}
                    contentPath={contentPath}
                    next={currentNavItem.next}
                    previous={currentNavItem.previous}
                />
            );
        };

        return (
            <div class="Article">
                {renderChildren()}
            </div>
        );
    };

    return Article;
};
