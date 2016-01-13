export default function annotations (state = [], action) {
  switch (action.type) {
    case 'CREATE_ANNOTATION':
      debugger;
      var newState = state.slice().concat([action.annotation]);
      newState.sort(function(a,b) {
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
      return newState;
    default:
      return state;
  }
}
