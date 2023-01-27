import {EditorView} from '@codemirror/view';
import {font_family, font_size, font_weight, gray, line_height, space} from '../../style/theme';

export let mirrorTheme = EditorView.theme({
    '&.cm-focused': {
        outline: 'none',
    },
    '.cm-scroller': {
        fontFamily: font_family.code,
        fontSize: `${font_size.code}px`,
        lineHeight: line_height.code,
        fontWeight: font_weight.code,
    },
    '.cm-content': {
        padding: `${space.tiny_3}px 0`,
        caretColor: gray.black,
    },
    '.cm-line': {
        padding: `0 ${space.tiny_3}px`,
    },
});
