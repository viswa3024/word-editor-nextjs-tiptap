import { Extension } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType = any> {
    fontFamily: {
      setFontFamily: (font: string) => ReturnType;
    };
  }
}

export const FontFamily = Extension.create({
  name: 'fontFamily',
  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          fontFamily: {
            default: null,
            renderHTML: attrs => ({
              style: `font-family: ${attrs.fontFamily}`,
            }),
            parseHTML: el => ({
              fontFamily: el.style.fontFamily?.replace(/['"]/g, ''),
            }),
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontFamily:
        font =>
        ({ chain }) =>
          chain().setMark('textStyle', { fontFamily: font }).run(),
    };
  },
});
