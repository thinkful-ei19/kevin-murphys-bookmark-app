'use strict';
/* global store, api, $ */

const bookmarks = (function () {

  function generateItemElement(item) {

    return `
    <div class="item">
      <div class="content">
        <div class="title-stars-url-box">
          <div class="title-stars-box">
            <div class="stars-box">
              <label class="bookmark-title" for="stars-label">Google</label>
              <div class="stars" id="stars-label">
                <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>
              </div>
            </div>
          </div>
          <div class="bookmark-url-box">
            <label class="bookmark-url">https://www.google.com/</label>
          </div>
        </div>
        <div class="expand-button-box">
          <label class="label">Expand Bookmark</label>
          <button class="expand-btn">
            <i class="fa fa-angle-down" style="font-size:40px;"></i>
          </button>
        </div>
      </div>
    </div>
    `;
  }

  function generateBookmarksString(bookmarks) {
    const items = bookmarks.map((item) => generateItemElement(item));
    return items.join('');
  }

  function render() {

    let items = store.items;

    // if (store.adding) {
    //   // placeholder
    // }

    // if (store.expanded) {
    //   // placeholder
    // }



    console.log('`render` ran');

    const bookmarkItemsString = generateBookmarksString(items);

    // setTimeout(() => {
    $('.bookmarks').html(bookmarkItemsString);
    // }, 5000);
  }

  function handleNewBookmarkClicked() {
    $('.new-bookmark-button-box').on('click', '.btn', function (event) {
      event.preventDefault();
      store.toggleAddingFilter();
    });
  }

  function handleAddBookmarkSubmit() {
    $('placeholder').submit(function (event) {
      event.preventDefault();
      const newBookmarkName = $('placeholder').val();
      const url = $('placeholder').val();
      const desc = $('placeholder').val();
      api.createItem(newBookmarkName, url, desc, newItem => {
        store.addItem(newItem);
        render();
      });
    });
  }

  function getBookmarkIdFromElement(item) {
    return $(item).closest('placeholder').data('item-id');
  }

  function handleExpandBookmarkClicked() {
    $('.expand-btn-box').on('click', '.expand-btn', event => {
      // const id = getBookmarkIdFromElement(event.currentTarget);
      // const bookmark = store.findById(id);
      event.preventDefault();
      store.toggleExpandedFilter();
      render();
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
    handleExpandBookmarkClicked();
  }

  return {
    render,
    bindEventListeners,
  };

}());