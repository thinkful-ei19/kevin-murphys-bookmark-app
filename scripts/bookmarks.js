'use strict';
/* global store, api, $ */

const bookmarks = (function () {

  function generateItemElement(item) {
    let itemTitle = ` ... `;
    if (!item.expanded) {
      // placeholder
      // placeholder
      // placeholder
      // placeholder
    }

    return `
      // HTML goes here
    `;
  }

  function generateBookmarksString(bookmarks) {
    const items = bookmarks.map((item) => generateItemElement(item));
    return items.join('');
  }

  function render() {

    let items = store.items;

    if (store.adding) {
      // placeholder
    }

    if (store.expanded) {
      // placeholder
    }

    console.log('`render` ran');

    const bookmarkItemsString = generateBookmarksString(items);

    // setTimeout(() => {
    //   $('placeholder').html(bookmarkItemsString);
    // }, 5000);
  }

  function handleAddBookmarkSubmit() {
    $('placeholder').submit(function (event) {
      event.preventDefault();
      const newBookmarkName = $('placeholder').val();
      api.createItem(newBookmarkName, newItem => {
        store.addItem(newItem);
        render();
      });
    });
  }

  function getBookmarkIdFromElement(item) {
    return $(item).closest('placeholder').data('item-id');
  }

  function handleNewBookmarkClicked() {
    $('placeholder').on('click', 'placeholder', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      const bookmark = store.findById(id);
      // placeholder
      // placeholder
      // placeholder
    });
  }

  function handleDeleteClicked() {
    $('placeholder').on('click', 'placeholder', event => {
      if (confirm('are you sure?')) {
        const id = getBookmarkIdFromElement(event.currentTarget);
        api.deleteBookmark(id, () => {
          store.findAndDelete(id);
          render();
        });
      }
    });
  }

  function handleEditBookmarkSubmit() {
    $('placeholder').on('submit', 'placeholder', event => {
      event.preventDefault();
      const id = getBookmarkIdFromElement(event.currentTarget);
      const bookmark = $(event.currentTarget).find('placeholder').val();
      api.updateBookmark(id, { placeholder }, () => {
        store.findAndUpdate(id, { placeholder });
        render();
      });
      render();
    });
  }

  function bindEventListeners() {
    handleAddBookmarkSubmit();
    handleNewBookmarkClicked();
    handleDeleteClicked();
    handleEditBookmarkSubmit();
    handleEditBookmarkSubmit();
  }

  return {
    render,
    bindEventListeners,
  };

}());