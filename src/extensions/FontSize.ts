import { Extension } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType = any> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

export const FontSize = Extension.create({
  name: 'fontSize',
  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          fontSize: {
            default: null,
            renderHTML: attrs => ({
              style: `font-size: ${attrs.fontSize}`,
            }),
            parseHTML: el => ({
              fontSize: el.style.fontSize,
            }),
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        size =>
        ({ chain }) =>
          chain().setMark('textStyle', { fontSize: size }).run(),
      unsetFontSize:
        () =>
        ({ chain }) =>
          chain().setMark('textStyle', { fontSize: null }).run(),
    };
  },
});
