const NOTATION = /\s*(?:\/\/|\/\*|<!--|[#"']|--|%{1,2}|;{1,2})\s+\[!code (\S+?)(?::\d+)?\]\s*(?:(?:\*\/|-->)\s*)?$/;

export function stripCodeNotations(code: string): string {
  return code
    .split('\n')
    .filter(line => line.match(NOTATION)?.[1] !== '--')
    .map(line => line.replace(NOTATION, ''))
    .join('\n');
}
