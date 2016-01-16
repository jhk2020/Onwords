export default function annotations (state = [], action) {
  switch (action.type) {
    case 'LOAD_ANNOTATIONS':
      let annotations = state.slice().concat(action.annotations);
      return sortAnnotations(annotations);

    case 'CREATE_ANNOTATION':
      let newState = state.slice().concat(action.annotation);
      return sortAnnotations(newState);

    case 'DELETE_ANNOTATION':
      let id = action.annotation.id;
      $('[data-annotation-id=' + id + ']').contents().unwrap();
      let newAnnotations = state.slice();
      let deleteIndex = newAnnotations.indexOf(action.annotation);
      newAnnotations.splice(deleteIndex, 1);
      return newAnnotations;

    case 'UPDATE_ANNOTATION':
      let updatedAnnotations = state.slice();
      for (var i = 0; i < updatedAnnotations.length; i++) {
        if (updatedAnnotations[i].id === action.annotation.id) {
          updatedAnnotations[i].text = action.annotation.text;
          break;
        }
      }
      return updatedAnnotations;

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

function sortAnnotations(arr) {
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
