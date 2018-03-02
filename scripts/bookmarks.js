'use strict';
/* global store, api, $ */

const bookmarks = (function () {

  function generateItemElement(item) {

    // let top = '';

    if (store.expanded) {
      $('.expanded-bookmark').toggleClass('hidden');
    }

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
            <div class="bookmark-url-desc-box">
              <label class="bookmark-url">https://www.google.com/</label>
              <span class="description">lorem ipsum</span>
            </div>
          </div>
          <div class="expand-button-box">
            <label class="label">Edit Bookmark</label>
            <button class="expand-btn">
              <i class="fa fa-edit" style="font-size:20px;"></i>
            </button>
          </div>

          <div class="expanded-bookmark hidden">
            <div class="content">
              <label class="bookmark-title">Google</label>
              <div class="stars">
                <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>
              </div>
              <form id="new-title">
                <input type="text" name="description" value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">
                <br>
                <input type="text" name="URL" value="https://www.google.com/">
                <br>
                <input type="submit" name="edit bookmark" value="Edit Bookmark">
                <input type="submit" name="delete bookmark" value="Delete Bookmark">
              </form>
            </div>
          </div>
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
    //   $('.expanded-bookmark').toggleClass('hidden');
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
      // store.toggleAddingFilter();
      $('.default-top').toggleClass('hidden');
      $('.add-bookmark-top').toggleClass('hidden');
      render();
    });
  }

  function handleAddBookmarkSubmit() {
    $('#new-bookmark').submit(function (event) {
      event.preventDefault();
      const newBookmarkTitle = $('#new-title').val();
      const url = $('#new-url').val();
      const desc = $('#new-desc').val();
      api.createBookmark(newBookmarkTitle, url, desc, newItem => {
        store.createBookmark(newItem);
        render();
      });
    });
  }

  function handleCancelClicked() {
    $('.bookmarks').on('click', '.cancel-button', function (event) {
      event.preventDefault();
      $('.default-top').toggleClass('hidden');
      $('.add-bookmark-top').toggleClass('hidden');
      render();
    });
  }

  function getBookmarkIdFromElement(item) {
    return $(item).closest('placeholder').data('item-id');
  }

  function handleExpandBookmarkClicked() {
    $('.bookmarks').on('click', '.expand-btn', event => {
      event.preventDefault();
      store.toggleExpandedFilter();
      console.log('toggle expanded ran', store.expanded);
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
    handleCancelClicked();
    handleDeleteClicked();
    handleEditBookmarkSubmit();
    handleExpandBookmarkClicked();
  }

  return {
    render,
    bindEventListeners,
  };

}());