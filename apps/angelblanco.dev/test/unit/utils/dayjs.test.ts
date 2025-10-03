import { expect, it } from 'vitest';
import dayjs from '../../../app/utils/dayjs';

it('has localized format', () => {
  expect(dayjs('2025-05-05').format('LL')).toBe('May 5, 2025');
});

it('has relative time', () => {
  expect(dayjs('2025-05-05').to(dayjs('2025-05-07'))).toBe('in 2 days');
});
