# createPortal

_This one allows you to create a portal to split the subtree bellow from the native DOM tree to somewhere outside._

It is helpful when you want to create components that appear above others like Modal, Popover, Dropdown, Tooltip, and so on.

```jsx
import {createPortal} from 'fiddlehead';

function DocumentPortal({children}) {
    let el = useRef(document.createElement('div')).current;
    
    useEffect(() => {
        if (el.parentNode === null) {
            el.style.display = 'contents';
            document.body.appendChild(el);
        }
        return () => {
            if (el.parentNode !== null) {
                el.parentNode.removeChild(el);
            }
        };
    }, []);

    return createPortal(children, el);
}

function App() {
    let [showsImage, setShowsImage] = useState(false);

    return (
        <div>
            <button onClick={() => setShowsImage(true)}>
                Show Image
            </button>
            {showsImage && (
                <DocumentPortal>
                    <div className="modal">
                        <img src="/path/to/image.png"/>
                    </div>
                </DocumentPortal>
            )}
        </div>
    );
}
```
