export default function annotatorShown (state = false, action) {
  switch (action.type) {
    case 'SHOW_ANNOTATOR':
      return !state;
    default:
      return state;
  }
}
