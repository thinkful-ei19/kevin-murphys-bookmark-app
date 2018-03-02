'use strict';
/* global $ */

let api = (function () {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/kevin';

  return {
    
    getItems: callback => {
      $.getJSON(`${BASE_URL}/bookmarks`, callback);
    },
    
    createBookmark: (title, url, desc, callback) => {
      let newItem = JSON.stringify({ title, url, desc });
      $.ajax({
        url: `${BASE_URL}/bookmarks`,
        method: 'POST',
        contentType: 'application/json',
        data: newItem,
        success: callback,
      });
    },

    deleteBookmark: (id, callback) => {
      $.ajax({
        url: `${BASE_URL}/bookmarks/${id}`,
        method: 'DELETE',
        contentType: 'application/json',
        success: callback
      });
    },

    updateBookmark: (id, updateData, callback) => {
      let newData = JSON.stringify( updateData );
      $.ajax({
        url: `${BASE_URL}/bookmarks/${id}`,
        method: 'PATCH',
        contentType: 'application/json',
        data: newData,
        success: callback,
      });
    },

  };

})();