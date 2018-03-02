'use strict';
/* global cuid */

const Item = (function(){
  const validateName = function(name) {
    if (!name) throw new TypeError('Name must not be blank');
  };

  const create = function(name) {
    return {
      id: cuid(),
      title,
      url,
      description,
      adding: false,
      expanded: false,
    };
  };

  return {
    validateName,
    create,
  };
}());