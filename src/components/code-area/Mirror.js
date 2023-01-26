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
            extensions: [
                editorTheme,
                keymap.of(defaultKeymap),
                keymap.of(indentWithTab),
                keymap.of(historyKeymap),
                autoCloseTags,
                history(),
                getSyntaxHighlighting(language),
                getLanguageCompartment(language),
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        onChange(editorView.state.doc.toString());
                    }
                }),
                EditorView.contentAttributes.of({
                    'data-gramm': 'false', // disable Grammarly
                }),
            ].filter(t => t !== null)
        });

        editorView = new EditorView({
            state: initialState,
            parent: containerRef.current
        });

        if (defaultSelection !== null) {
            // Handle max selectable position to avoid
            // RangeError: Selection points outside of document
            let maxSelectablePosition = editorView.state.doc.length;

            editorView.dispatch({
                selection: {
                    anchor: Math.min(defaultSelection[0], maxSelectablePosition),
                    head: Math.min(defaultSelection[1], maxSelectablePosition)
                }
            });

            // Auto focus so the user don't need to click twice to edit
            // - the first click is on the Mask
            editorView.focus();
        }
    }, []);

    return <div ref={containerRef} />;
};
