'use client';

import { useState } from 'react';

type Props = {
  initialCount?: number;
};

export function Counter({ initialCount = 0 }: Props) {
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <p data-testid="count">{count}</p>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Increment
      </button>
      <button type="button" onClick={() => setCount((c) => c - 1)}>
        Decrement
      </button>
    </div>
  );
}
