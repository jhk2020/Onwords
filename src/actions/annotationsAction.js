export function createAnn(annotation) {
  return {
    type: 'CREATE_ANNOTATION',
    annotation
  }
}

export function loadAnns(annotations) {
  return {
    type: 'LOAD_ANNOTATIONS',
    annotations
  }
}

export function deleteAnn(annotation) {
  return {
    type: 'DELETE_ANNOTATION',
    annotation
  }
}
