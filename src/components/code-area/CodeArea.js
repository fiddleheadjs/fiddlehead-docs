import {useRef, useEffect} from 'fiddlehead';
import {EditorState} from '@codemirror/state';
import {EditorView, keymap} from '@codemirror/view';
import {defaultKeymap, historyKeymap, history, indentWithTab} from '@codemirror/commands';
import {autoCloseTags} from '@codemirror/lang-javascript';
import {getSyntaxHighlighting} from './highlightStyle';
import {getLanguageCompartment} from './languageSupport';
import {editorTheme} from './editorTheme';

export let CodeArea = ({defaultValue, onChange, language}) => {
    let containerRef = useRef();

    useEffect(() => {
        let initialState, editorView;

        initialState = EditorState.create({
            doc: defaultValue,
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
    }, []);

    return <div class="CodeArea" ref={containerRef} />;
};
