'use strict';
class AnnotationHandler {
  constructor() {
    this.annotations_by_type = {};
  }
  setCurrentAnnotator(annotator_name) {
    this.annotator = annotator_name;
    if (typeof this.annotations_by_type[this.annotator] === 'undefined') {
      this.annotations_by_type[annotator_name] = [];
    }
  }
  addAnnotation(span_start, span_end, annotation){
    this.annotations_by_type[this.annotator].push({ span_start, span_end, annotation });
  }
  getAnnotationsFor(type) {
    return this.annotations_by_type[type];
  }
}

module.exports = AnnotationHandler;
