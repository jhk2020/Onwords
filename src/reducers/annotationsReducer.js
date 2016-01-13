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
      const annotations = action.annotations.slice();
      return sortAnnotations(annotations);

    case 'CREATE_ANNOTATION':
      var newState = state.slice().concat([action.annotation]);
      return sortAnnotations(newState);
    default:
      return state;
  }
}
