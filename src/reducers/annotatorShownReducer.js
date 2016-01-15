export default function annotatorShown (state = false, action) {
  switch (action.type) {
    case 'SHOW_ANNOTATOR':
      return !state;
    case 'MOUNT_SPOTLIGHT':
      return true;
    default:
      return state;
  }
}
