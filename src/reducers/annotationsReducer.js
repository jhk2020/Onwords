const sortAnnotations = function(arr) {
  arr.sort(function(a,b) {
      if (a.offsetTop < b.offsetTop) {
       return -1;
      } else if (a.offsetTop > b.offsetTop){
       return 1;
      } else {
         if (a.offsetLeft < b.offsetLeft) {
          return -1;
         } else if (a.offsetLeft > b.offsetLeft){
          return 1;
         }
      }
    });
  return arr;
};

export default function annotations (state = [], action) {
  switch (action.type) {
    case 'LOAD_ANNOTATIONS':
      let annotations = state.slice().concat(action.annotations);
      return sortAnnotations(annotations);

    case 'CREATE_ANNOTATION':
      debugger;
      let newState = [state.slice().concat(action.annotation)];
      return sortAnnotations(newState);

    case 'DELETE_ANNOTATION':
      let id = action.annotation.id;
      $('[data-annotation-id=' + id + ']').contents().unwrap();
      let newAnnotations = state.slice();
      let deleteIndex = newAnnotations.indexOf(action.annotation);
      newAnnotations.splice(deleteIndex, 1);
      return newAnnotations;
    case 'TOGGLE_OFF_FRIEND_ANNOTATIONS':
      let friendId = action.friendId;
      let filteredState = state.filter(function(annotation) {
        return !(annotation.user_id.toString() === friendId);
      });
      return filteredState;
    default:
      return state;
  }
}
