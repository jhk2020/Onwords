export default function spotlight(state = '', action) {
  switch (action.type) {
    case 'CHANGE_HIGHLIGHTS':
      unhighlight(state);
      highlight(action.newSpotlight);
      return action.newSpotlight;

    case 'MOVE_TO_SPOTLIGHT':
      moveToSpotlight(state);
      return state;

    case 'MOUNT_SPOTLIGHT':
      highlight(action.newSpotlight);
      return action.newSpotlight;

    case 'UNMOUNT_SPOTLIGHT':
      unhighlight(state);
      return '';

    default:
      return state;
  }
}

function highlight(annotation) {
  moveToSpotlight(annotation);

  const newSpotlightColor = $('span[data-annotation-id="' + annotation.id + '"]').css('background-color');

  const newSpotlightColorWithUmph = newSpotlightColor.slice(0, newSpotlightColor.lastIndexOf(',') + 1) + ' 1)';
  const styles = {
    backgroundColor: newSpotlightColorWithUmph,
    color: "black"
  }
  $('span[data-annotation-id="' + annotation.id + '"]').css(styles);
};

function unhighlight(annotation) {
  const oldSpotlightColorWithUmph = $('span[data-annotation-id="' + annotation.id + '"]').css('background-color');
  if (oldSpotlightColorWithUmph) {
    var oldSpotlightColor = oldSpotlightColorWithUmph.slice(0, oldSpotlightColorWithUmph.length - 1) + ', 0.25)';
    var defaultColor = $('body').css('color');
    oldSpotlightColor = oldSpotlightColor.slice(0, oldSpotlightColor.indexOf('(')) + 'a' + oldSpotlightColor.slice(oldSpotlightColor.indexOf('('));
    var styles = {
      backgroundColor: oldSpotlightColor,
      color: defaultColor
    }
    $('span[data-annotation-id="' + annotation.id + '"]').css(styles);
  }
}

function moveToSpotlight(annotation) {
  $('html, body').animate({
    scrollTop: annotation.offsetTop - 200
  }, 350);
}
