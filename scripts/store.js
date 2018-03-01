'use strict';
/* global */

const store = (function() {
  const addItem = function(item) {
    this.items.push(item);
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  const findAndUpdate = (id, newData) => {
    let item = store.items.find(item => item.id === id);
    item = Object.assign(item, newData);
  };

  return {
    items: [],
    adding: false,
    expanded: false,
    findAndUpdate,
    addItem,
    findById,
    findAndDelete,
  };

}());