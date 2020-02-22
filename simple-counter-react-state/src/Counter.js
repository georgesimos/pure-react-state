import React, { useState, useEffect } from 'react';

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');
  if (storage) return JSON.parse(storage).count;
  return { count: 0 };
};

const storeStateInLocalStorage = count => {
  localStorage.setItem('counterState', JSON.stringify({ count }));
};

const Counter = ({ max, step }) => {
  const [mount, setMount] = useState(false);
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(c => {
      if (c >= max) return c;
      return c + step;
    });
  };

  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  useEffect(() => {
    if (!mount) {
      setCount(getStateFromLocalStorage());
      setMount(true);
    }
    document.title = `Counter : ${count}`;
    storeStateInLocalStorage(count);
  }, [mount, count]);

  return (
    <div className="Counter">
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </div>
  );
};

export default Counter;
