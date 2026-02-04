import { colors, fontSizes, spacing } from '@/src/utils/theme';

describe('theme tokens', () => {
  it('exports core color tokens', () => {
    expect(colors.primary).toBe('#0F2D52');
    expect(colors.background).toBe('#F5F7FB');
    expect(colors.textPrimary).toBe('#1B2430');
  });

  it('exports spacing and font size scales', () => {
    expect(spacing.lg).toBe(16);
    expect(spacing.xxl).toBe(32);
    expect(fontSizes.md).toBe(16);
    expect(fontSizes.xxl).toBe(28);
  });
});
