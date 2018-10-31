export const saveState = (state) => {
  try {
    state = Object.assign({}, state);
    if(state){
      state.router = null
    }
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state',serializedState)
  } catch (err) {
    // Ignore write errors.
  }
}
