import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

export function localStorageMetaReducer<State>(
  reducer: ActionReducer<State>
): ActionReducer<State> {
  return (state, action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const storedState = localStorage.getItem('appState');
      if (storedState) {
        try {
          return JSON.parse(storedState);
        } catch (e) {
          console.error('Error parsing state from localStorage:', e);
        }
      }
    }

    const nextState = reducer(state, action);
    localStorage.setItem('appState', JSON.stringify(nextState));
    return nextState;
  };
}
