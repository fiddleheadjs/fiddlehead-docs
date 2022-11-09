import {useState, useEffect, useRef} from 'fiddlehead';
import {Button} from '../../components/button/Button';
import {__} from '../../modules/i18n';
import {DocumentViewer} from '../../viewers/document/DocumentViewer';
import {Link} from '../../modules/router';

export let createArticle = (path, currentNavItem) => {
    console.log(currentNavItem)
    let Article = () => {
        let [data, setData] = useState(null);

        let isUnmounted = useRef(false);
    
        useEffect(() => {
            import('@contents/' + path + '/index.md').then(data => {
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
                previousButton={
                    <Link href={currentNavItem.previous?.path}>
                        <Button disabled={currentNavItem.previous === null}>
                            <span>{__('Previous')}</span>
                        </Button>
                    </Link>
                }
                nextButton={currentNavItem.next !== null && (
                    <Link href={currentNavItem.next.path}> 
                        <Button>
                            <span>{__('Next: ')}</span>
                            <strong>{currentNavItem.next.label}</strong>
                        </Button>
                    </Link>
                )}
            />
        );
    };

    return Article;
};
