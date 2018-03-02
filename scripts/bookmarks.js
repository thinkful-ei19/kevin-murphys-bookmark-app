'use strict';
/* global store, api, $ */

const bookmarks = (function () {

  function generateItemElement(item) {

    return `
      <div class="item" data-item-id="${item.id}">
        <div class="content">
          <div class="bookmark-content">
            <div class="title-stars-url-box">
              <div class="title-stars-box">
                <div class="stars-box">
                  <label class="bookmark-title" for="stars-label">${item.title}</label>
                  <div class="stars" class="stars-label">
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                  </div>
                </div>
              </div>
              <div class="bookmark-url-desc-box">
                <a href="${item.url}><text class="bookmark-url">${item.url}</text></a>
                <text class="description">${item.desc}</text>
              </div>
            </div>
            <div class="expand-button-box">
              <button class="expand-btn btn2">
                <i class="fa fa-angle-down" style="font-size:40px;"></i>
                <i class="fa fa-angle-up hidden" style="font-size:40px;"></i>
              </button>
            </div>
          </div>


          <div class="expanded-bookmark hidden">
            <div class="expanded-content">
              <text>Edit Rating:</text>
              <div class="default-rating-content">
                <input type="radio" name="my-input" id="default-rating" checked>
                <label for="one star">1 Star</label>
                <input type="radio" name="my-input" id="default-rating">
                <label for="two star">2 Star</label>
                <input type="radio" name="my-input" id="default-rating">
                <label for="three star">3 Star</label>
                <input type="radio" name="my-input" id="default-rating">
                <label for="four star">4 Star</label>
                <input type="radio" name="my-input" id="default-rating">
                <label for="five star">5 Star</label>
              </div>
              <form class="edit-bookmark">
                <br>
                <span>Title:</span>
                <br>
                <input class="edit-title margin-bottom btn2 padding-3px" type="text" name="title" value="${item.title}" required>
                <br>
                <span>URL:</span>
                <br>
                <input class="edit-url margin-bottom btn2 padding-3px" type="text" name="description" value="${item.url}" required>
                <br>
                <span>Description:</span>
                <br>
                <textarea class="edit-desc margin-bottom text-area btn2 padding-3px" type="text" name="URL" value="" required>${item.desc}</textarea>
                <br>
                <input type="submit" name="edit bookmark" value="Edit Bookmark" class="edit-bookmark-submit margin-bottom btn">
              </form>
              <div class="delete-button">
                <button type="button" class="delete-bookmark btn">Delete Bookmark</button>
              </div>
            </div>
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

    console.log('`render` ran');

    const bookmarkItemsString = generateBookmarksString(items);

    setTimeout(() => {
      $('.bookmarks').html(bookmarkItemsString);
    }, 1500);
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
      // const rating = $('').val();
      $('#new-desc').val('');
      $('#new-url').val('');
      $('#new-title').val('');
      $('.default-top').toggleClass('hidden');
      $('.add-bookmark-top').toggleClass('hidden');
      api.createBookmark(newBookmarkTitle, url, desc, newItem => {
        store.createBookmark(newItem);
        render();
      });
    });
  }

  function handleCancelClicked() {
    $('.add-bookmark-top').on('click', '.cancel-button', function (event) {
      event.preventDefault();
      $('.default-top').toggleClass('hidden');
      $('.add-bookmark-top').toggleClass('hidden');
    });
  }

  function getBookmarkIdFromElement(item) {
    return $(item).closest('.item').data('item-id');
  }

  function handleExpandBookmarkClicked() {
    $('.bookmarks').on('click', '.expand-btn', event => {
      event.preventDefault();
      $(event.currentTarget).closest('.item').find('.expanded-bookmark').toggleClass('hidden');
      // store.toggleExpandedFilter();
      $('.fa-angle-down').toggleClass('hidden');
      $('.fa-angle-up').toggleClass('hidden');
    });
  }

  function handleDeleteClicked() {
    $('.bookmarks').on('click', '.delete-bookmark', event => {
      if (confirm('are you sure?')) {
        const id = getBookmarkIdFromElement(event.currentTarget);
        api.deleteBookmark(id, () => {
          console.log(id);
          store.findAndDelete(id);
          render();
        });
      }
    });
  }

  function handleEditBookmarkSubmit() {
    $('.bookmarks').on('submit', '.edit-bookmark', event => {
      event.preventDefault();
      if (confirm('are you sure?')) {
        const id = getBookmarkIdFromElement(event.currentTarget);
        const title = $('.edit-title').val();
        const url = $('.edit-url').val();
        const desc = $('.edit-desc').val();
        api.updateBookmark(id, { title, url, desc }, () => {
          store.findAndUpdate(id, { title, url, desc });
          render();
        });
      }
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