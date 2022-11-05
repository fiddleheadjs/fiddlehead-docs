import Prism from 'prismjs';
import './highlight.less';

Prism.manual = true;

document.body.classList.add('prism-override');

export let highlightAllUnder = Prism.highlightAllUnder;

export let highlightElement = Prism.highlightElement;
