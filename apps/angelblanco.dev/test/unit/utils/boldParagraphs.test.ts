import { describe, expect, it } from 'vitest';
import { boldParagraphs } from '../../../app/utils/boldParagraphs';

describe('utils: boldParagraphs', () => {
  it('splits paragraphs on blank lines and marks the bold parts', () => {
    expect(boldParagraphs('I am a **web engineer** with  **10 years**.\n\n  Second   paragraph. \n')).toEqual([
      [
        { text: 'I am a ', bold: false },
        { text: 'web engineer', bold: true },
        { text: ' with ', bold: false },
        { text: '10 years', bold: true },
        { text: '.', bold: false },
      ],
      [
        { text: 'Second paragraph.', bold: false },
      ],
    ]);
  });

  it('keeps a paragraph that starts with bold text and unmatched asterisks as text', () => {
    expect(boldParagraphs('**Bold** start and a lonely ** here')).toEqual([
      [
        { text: 'Bold', bold: true },
        { text: ' start and a lonely ** here', bold: false },
      ],
    ]);
  });

  it('returns no paragraphs for empty text', () => {
    expect(boldParagraphs(' \n\n ')).toEqual([]);
  });
});
