export const LOAD_NOTES = 'EVTX:SERVER:NOTES:LOAD';
export const NOTES_LOADED = 'NOTES:LOADED';

export const loadNotes = () => (dispatch, getState) => {
  const { notes } = getState();
  if (!notes.data.length) {
    dispatch({
      type: LOAD_NOTES,
      replyTo: NOTES_LOADED,
    });
  }
};
 