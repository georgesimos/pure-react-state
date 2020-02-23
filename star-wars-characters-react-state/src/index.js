import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList';

import endpoint from './endpoint';
import './styles.scss';

const initialState = {
  characters: [],
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  if (action.type === 'LOADING') {
    return {
      characters: [],
      loading: true,
      error: null,
    };
  }
  if (action.type === 'RESPONSE_COMPLETE') {
    return {
      characters: action.payload.characters,
      loading: false,
      error: null,
    };
  }
  if (action.type === 'ERROR') {
    return {
      characters: [],
      loading: true,
      error: action.payload.error,
    };
  }
  return state;
};

// const useFetch = url => {
//   const [state, dispatch] = React.useReducer(fetchReducer, initialState);

//   useEffect(() => {
//     dispatch({ type: 'LOADING' });

//     (async function fetchUrl() {
//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         dispatch({ type: 'RESPONSE_COMPLETE', payload: { characters: data } });
//       } catch (error) {
//         dispatch({ type: 'ERROR', payload: { error } });
//       }
//     })();
//   }, []);

//   return [state.characters, state.loading, state.error];
// };

const useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDsipatch = action => {
    console.log(action);

    if (typeof action === 'function' || action instanceof Function) {
      action(dispatch);
    } else {
      dispatch(action);
    }
  };

  return [state, enhancedDsipatch];
};

const Application = () => {
  const [state, dispatch] = useThunkReducer(reducer, initialState);

  const { characters, loading, error } = state;

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          {loading ? <p>Loading</p> : <CharacterList characters={characters} />}
          {error && <p className="error"> {error.message}</p>}
        </section>
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Application />
  </Router>,
  rootElement,
);
