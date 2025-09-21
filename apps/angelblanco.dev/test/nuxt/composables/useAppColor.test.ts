// import { useAppColors } from '#imports';
import { expect, it } from 'vitest';

it('changes color', () => {
  const appColor = useAppColors();

  expect(appColor.base100.value).toBeDefined();
});
