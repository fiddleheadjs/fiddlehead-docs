import {HighlightStyle, syntaxHighlighting} from '@codemirror/language';
import {tags} from '@lezer/highlight';

let jsHighlightStyle = HighlightStyle.define([
    {
        tag: [tags.comment, tags.meta],
        color: '#90A0B0'
    },
    {
        tag: tags.punctuation,
        color: '#999'
    },
    {
        tag: tags.namespace,
        color: '#666'
    },
    {
        tag: [tags.definition(tags.propertyName), tags.tagName, tags.bool, tags.number, tags.annotation, tags.deleted],
        color: '#905'
    },
    {
        tag: [tags.attributeName, tags.string, tags.character, tags.inserted],
        color: '#690'
    },
    {
        tag: [tags.operator, tags.atom, tags.url],
        color: '#9A6E3A'
    },
    {
        tag: [tags.attributeValue, tags.keyword],
        color: '#07A'
    },
    {
        tag: [tags.className, tags.function(tags.variableName), tags.function(tags.propertyName)],
        color: '#DD4A68'
    },
    {
        tag: [tags.regexp],
        color: '#E90'
    }
]);

let cssHighlightStyle = HighlightStyle.define([
    {
        tag: tags.comment,
        color: '#708090'
    },
    {
        tag: tags.punctuation,
        color: '#999'
    },
    {
        tag: tags.className,
        color: '#690'
    },
    {
        tag: tags.propertyName,
        color: '#905'
    },
    {
        tag: tags.definitionKeyword,
        color: '#07A'
    },
    
    {
        tag: tags.modifier,
        color: '#E90'
    },

]);

let getHighlightStyle = (language) => {
    if (language === 'css') {
        return cssHighlightStyle;
    }

    return jsHighlightStyle;
};

export let getSyntaxHighlighting = (language) => {
    return syntaxHighlighting(getHighlightStyle(language));
};
