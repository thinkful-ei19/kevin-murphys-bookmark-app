'use strict';
/* global bookmarks, store, api, $ */

$(document).ready(function() {
  bookmarks.bindEventListeners();
  bookmarks.render();
  api.getItems((items) => {
    items.forEach((item) => store.createBookmark(item));
    bookmarks.render();
  });
});