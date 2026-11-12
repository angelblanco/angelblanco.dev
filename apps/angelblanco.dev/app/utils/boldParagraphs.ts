export interface BoldPart {
  text: string;
  bold: boolean;
}

export function boldParagraphs(text: string): BoldPart[][] {
  return text
    .split(/\n\s*\n/)
    .map(paragraph => paragraph.trim().replace(/\s+/g, ' '))
    .filter(Boolean)
    .map(paragraph => paragraph
      .split(/\*\*(.+?)\*\*/)
      .map((part, index) => ({ text: part, bold: index % 2 === 1 }))
      .filter(part => part.text));
}
