'use strict';
/* global */

const store = (function () {

  const createBookmark = function (bookmark) {
    this.items.push(bookmark);
  };

  const findById = function (id) {
    // use the guts of this function within other functions that need it. set it to a variable and use it there, not here
    return this.items.find(item => item.id === id);
  };

  const findAndDelete = function (id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  const toggleExpandedFilter = function () {
    this.expanded = !this.expanded;
  };

  // const toggleAddingFilter = function () {
  //   this.adding = !this.adding;
  // };

  const findAndUpdate = (id, newData) => {
    let item = store.items.find(item => item.id === id);
    item = Object.assign(item, newData);
  };

  return {
    items: [],
    adding: false,
    expanded: false,
    defaultStars: 3,
    toggleExpandedFilter,
    // toggleAddingFilter,
    findAndUpdate,
    createBookmark,
    findById,
    findAndDelete,
  };

}());