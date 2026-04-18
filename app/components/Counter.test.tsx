import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Counter } from './Counter';

describe('Counter', () => {
  it('デフォルトの初期値は0', () => {
    render(<Counter />);
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('initialCount で初期値を指定できる', () => {
    render(<Counter initialCount={5} />);
    expect(screen.getByTestId('count')).toHaveTextContent('5');
  });

  it('Increment ボタンでカウントが増加する', async () => {
    const user = userEvent.setup();
    render(<Counter />);
    await user.click(screen.getByRole('button', { name: 'Increment' }));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });

  it('Decrement ボタンでカウントが減少する', async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={3} />);
    await user.click(screen.getByRole('button', { name: 'Decrement' }));
    expect(screen.getByTestId('count')).toHaveTextContent('2');
  });
});
