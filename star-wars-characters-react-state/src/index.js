import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CharacterList from './CharacterList';
import CharacterView from './CharacterView';

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

const fetchCharacters = dispatch => {
  fetch(endpoint + '/characters')
    .then(response => response.json())
    .then(response =>
      dispatch({
        type: 'RESPONSE_COMPLETE',
        payload: { characters: response.characters },
      }),
    )
    .catch(error => {
      dispatch({ type: 'ERROR', payload: { error } });
    });
};

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

  const { characters } = state;

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          <button onClick={() => dispatch(fetchCharacters)}>
            Fetch Characters
          </button>
          <CharacterList characters={characters} />
        </section>
        <section className="CharacterView">
          <Route path="/characters/:id" component={CharacterView} />
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
