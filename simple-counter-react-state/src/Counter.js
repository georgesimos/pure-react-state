import React, { useState, useEffect, useRef } from 'react';

const Counter = ({ max, step }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef();

  let message = '';
  if (countRef.current < count) message = 'Higher';
  if (countRef.current > count) message = 'Lower';

  countRef.current = count;

  const increment = () => {
    setCount(c => {
      if (c >= max) return c;
      return c + step;
    });
  };

  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  useEffect(() => {
    document.title = `Counter : ${count}`;
    const id = setInterval(() => console.log(`Count: ${count}`), 1000);
    return () => clearInterval(id);
  }, [count]);

  return (
    <div className="Counter">
      <p>{message}</p>
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
