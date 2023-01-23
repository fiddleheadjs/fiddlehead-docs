import './CodeArea.less';
import {useLayoutEffect, useRef} from 'fiddlehead';
import {EditorState, Compartment} from "@codemirror/state";
import {EditorView, keymap} from "@codemirror/view";
import {defaultKeymap, historyKeymap, history} from "@codemirror/commands";
import {syntaxHighlighting, defaultHighlightStyle} from '@codemirror/language';
import {javascript, autoCloseTags} from '@codemirror/lang-javascript';
import {css} from '@codemirror/lang-css';

let getLanguageSupport = (language) => {
    if (language === 'css') {
        return css();
    }

    if (language === 'js' || language === 'jsx') {
        return javascript({jsx: true});
    }
    
    if (language === 'ts' || language === 'tsx') {
        return javascript({jsx: true, typescript: true});
    }

    return null;
};

let getLanguageExtension = (language) => {
    let languageSupport = getLanguageSupport(language);
    
    if (languageSupport !== null) {
        return new Compartment().of(languageSupport);
    }
    
    return null;
};

export let CodeArea = ({defaultValue, onChange, language}) => {
    let containerRef = useRef();

    useLayoutEffect(() => {
        let editorState, editorView;

        editorState = EditorState.create({
            doc: defaultValue,
            extensions: [
                EditorView.updateListener.of(update => {
                    if (update.docChanged) {
                        onChange(editorView.state.doc.toString());
                    }
                }),
                keymap.of(defaultKeymap),
                keymap.of(historyKeymap),
                autoCloseTags,
                history(),
                syntaxHighlighting(defaultHighlightStyle),
                getLanguageExtension(language),
            ].filter(t => t !== null)
        });

        editorView = new EditorView({
            state: editorState,
            parent: containerRef.current
        });
    }, []);

    return <div class="CodeArea" ref={containerRef} />;
};
