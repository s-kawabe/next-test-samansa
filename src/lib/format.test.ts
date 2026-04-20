import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import dayjs from 'dayjs';
import {
  formatDurationShort,
  formatDurationFull,
  formatLikes,
  formatRelative,
  indexOfTotal,
} from './format';

// ---- formatDurationShort ----

describe('formatDurationShort', () => {
  it('null を渡すと空文字を返す', () => {
    expect(formatDurationShort(null)).toBe('');
  });

  it('undefined を渡すと空文字を返す', () => {
    expect(formatDurationShort(undefined)).toBe('');
  });

  it('分数を "N min" 形式で返す', () => {
    expect(formatDurationShort({ minutes: 5, seconds: 30 })).toBe('5 min');
  });

  it('0分のとき "0 min" を返す', () => {
    expect(formatDurationShort({ minutes: 0, seconds: 45 })).toBe('0 min');
  });
});

// ---- formatDurationFull ----

describe('formatDurationFull', () => {
  it('null を渡すと空文字を返す', () => {
    expect(formatDurationFull(null)).toBe('');
  });

  it('undefined を渡すと空文字を返す', () => {
    expect(formatDurationFull(undefined)).toBe('');
  });

  it('"N分SS秒" 形式で返す（秒はゼロ埋め）', () => {
    expect(formatDurationFull({ minutes: 12, seconds: 5 })).toBe('12分05秒');
  });

  it('秒が2桁のときもゼロ埋めしない', () => {
    expect(formatDurationFull({ minutes: 3, seconds: 45 })).toBe('3分45秒');
  });
});

// ---- formatLikes ----

describe('formatLikes', () => {
  it('null を渡すと "0" を返す', () => {
    expect(formatLikes(null)).toBe('0');
  });

  it('undefined を渡すと "0" を返す', () => {
    expect(formatLikes(undefined)).toBe('0');
  });

  it('0 を渡すと "0" を返す', () => {
    expect(formatLikes(0)).toBe('0');
  });

  it('999 以下はそのまま文字列で返す', () => {
    expect(formatLikes(999)).toBe('999');
  });

  it('1000 は "1.0k" を返す', () => {
    expect(formatLikes(1000)).toBe('1.0k');
  });

  it('12500 は "12.5k" を返す', () => {
    expect(formatLikes(12500)).toBe('12.5k');
  });

  it('1234 は "1.2k" を返す（小数第1位で四捨五入）', () => {
    expect(formatLikes(1234)).toBe('1.2k');
  });
});

// ---- formatRelative ----

describe('formatRelative', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-20T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('null を渡すと空文字を返す', () => {
    expect(formatRelative(null)).toBe('');
  });

  it('undefined を渡すと空文字を返す', () => {
    expect(formatRelative(undefined)).toBe('');
  });

  it('当日の日時は "today" を返す', () => {
    expect(formatRelative('2026-04-20T06:00:00Z')).toBe('today');
  });

  it('1日前は "yesterday" を返す', () => {
    expect(formatRelative('2026-04-19T12:00:00Z')).toBe('yesterday');
  });

  it('10日前は "10 days ago" を返す', () => {
    const date = dayjs('2026-04-20T12:00:00Z').subtract(10, 'day').toISOString();
    expect(formatRelative(date)).toBe('10 days ago');
  });

  it('2ヶ月前は "2 months ago" を返す', () => {
    const date = dayjs('2026-04-20T12:00:00Z').subtract(2, 'month').toISOString();
    expect(formatRelative(date)).toBe('2 months ago');
  });

  it('2年前は "2 years ago" を返す', () => {
    const date = dayjs('2026-04-20T12:00:00Z').subtract(2, 'year').toISOString();
    expect(formatRelative(date)).toBe('2 years ago');
  });
});

// ---- indexOfTotal ----

describe('indexOfTotal', () => {
  it('1桁の数値はゼロ埋めされる', () => {
    expect(indexOfTotal(1, 5)).toBe('01 / 05');
  });

  it('2桁の数値はそのまま返す', () => {
    expect(indexOfTotal(10, 20)).toBe('10 / 20');
  });

  it('index と total が同じ場合も正しく返す', () => {
    expect(indexOfTotal(3, 3)).toBe('03 / 03');
  });
});
