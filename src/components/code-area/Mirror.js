import {useRef, useLayoutEffect} from 'fiddlehead';
import {EditorState} from '@codemirror/state';
import {EditorView, keymap} from '@codemirror/view';
import {defaultKeymap, historyKeymap, history, indentWithTab} from '@codemirror/commands';
import {autoCloseTags} from '@codemirror/lang-javascript';
import {getSyntaxHighlighting} from './highlightStyle';
import {getLanguageCompartment} from './languageSupport';
import {editorTheme} from './editorTheme';

export let Mirror = ({defaultValue = '', defaultSelection = null, onChange, language}) => {
    let containerRef = useRef(null);

    useLayoutEffect(() => {
        let initialState, editorView;

        initialState = EditorState.create({
            doc: defaultValue,
            selection: defaultSelection !== null ? {
                anchor: defaultSelection[0],
                head: defaultSelection[1]
            } : null,
            extensions: [
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        onChange(editorView.state.doc.toString());
                    }
                }),
                editorTheme,
                keymap.of(defaultKeymap),
                keymap.of(indentWithTab),
                keymap.of(historyKeymap),
                autoCloseTags,
                history(),
                getSyntaxHighlighting(language),
                getLanguageCompartment(language),
            ].filter(t => t !== null)
        });

        editorView = new EditorView({
            state: initialState,
            parent: containerRef.current
        });

        if (defaultSelection !== null) {
            editorView.focus();
        }
    }, []);

    return <div ref={containerRef} />;
};
