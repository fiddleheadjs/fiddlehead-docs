import './Article.less';
import {useState, useEffect} from 'fiddlehead';
import {Loading} from '../../components/loading/Loading';
import {__} from '../../modules/i18n';
import {DocumentViewer} from '../../viewers/document/DocumentViewer';

export let createArticle = (contentPath, currentNavItem) => {
    let Article = () => {
        let [data, setData] = useState(null);
        let [error, setError] = useState(null);
        let [shouldShowLoading, setShouldShowLoading] = useState(false);
        
        useEffect(() => {
            let timeoutId = setTimeout(() => {
                setShouldShowLoading(true);
            }, 300);

            import('@contents/' + contentPath + '/index.md').then(data => {
                setData(data);
                setShouldShowLoading(false);
            }).catch((error) => {
                setError(error);
            }).finally(() => {
                clearTimeout(timeoutId);
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
                if (shouldShowLoading) {
                    return (
                        <div class="preparation">
                            <Loading />
                        </div>
                    );
                }
    
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

        return (
            <div class="Article">
                {renderChildren()}
            </div>
        );
    };

    return Article;
};
