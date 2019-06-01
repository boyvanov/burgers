///////////////Полноэкранное меню/////////////////////////

let menu = (function (options) {
  let button = document.querySelector(options.button);
  let menu = document.querySelector(options.menu);
  let body = document.querySelector('body');
  let logo = document.querySelector(options.logo);

  let itemList = document.getElementById('nav__list').children;

  let counter = 0,
    flag = false;

  let startMenuAnimation = function startMenuAnimation() {
    let element = itemList[counter];

    element.classList.toggle('slideInUp');
    counter++;
    if (counter < itemList.length) {
      setTimeout(startMenuAnimation, 50);
    }
    if (counter === itemList.length) {
      counter = 0;
    }
  }

  let _toggleMenu = function (e) {
    e.preventDefault();
    button.classList.toggle('hamburger-menu-icon--active');
    menu.classList.toggle('hamburger-menu--active');
    body.classList.toggle('locked');
    logo.classList.toggle('logo--active');

    startMenuAnimation();

    if (flag) {
      flag = false;
    } else {
      flag = true;
    }
    // flag ? flag = false : flag = true;
  }

  let addListeners = function () {
    button.addEventListener('click', _toggleMenu);

    menu.addEventListener('click', function (e) {
      if (e.target.classList.contains('nav__link')) {
        _toggleMenu(e);
      }
    });

    // for (let i = 0; i < itemList.length; i++) {
    //   itemList[i].addEventListener('click', _toggleMenu);
    // }

    document.addEventListener('keydown', function (e) {
      if ((e.keyCode == 27) && flag) {
        _toggleMenu(e);
      }
    })
  };

  return {
    openMenu: addListeners
  };

})({
  button: '#hamburger-menu-icon',
  menu: '#hamburger-menu',
  logo: '.logo'
});

menu.openMenu();

///////////////Вертикальный аккордеон/////////////////////////

// let teamAcco = function () {
//   let teamList = document.querySelector('.team__accordeon');

//   teamList.addEventListener('click', function (e) {

//     e.preventDefault();
//     let target = e.target;
//     const item = target.closest('.person');
//     const items = document.querySelectorAll('.person');
//                                  // if (target.className === 'person__link') {
//     if (target.classList.contains('person__link')) {
//                                  // if (item.classList.contains('person--active') == false) {
//       if (!item.classList.contains('person--active')) {
//         for (let i = 0; i < items.length; i++) {
//           items[i].classList.remove('person--active');
//         }
//         item.classList.add('person--active');
//       } else {
//         item.classList.remove('person--active');
//       }
//     }
//   });
// };

// teamAcco();

let teamAcco = function () {
  let teamLink = document.querySelectorAll('.person__link');

  teamLink.forEach(function (personItem) {
    personItem.addEventListener('click', function (e) {
      e.preventDefault(e);
      let activePerson = document.querySelector('.person--active');

      if (activePerson) {
        let personBlock = activePerson.querySelector('.person__block');
        personBlock.style.height = 0 + 'px';
        activePerson.classList.remove('person--active');
      }

      if (!activePerson || e.target !== activePerson.querySelector('.person__link')) {
        // let currentPerson = e.target.parentNode;
        let currentPerson = e.target.closest('.person');
        currentPerson.classList.add('person--active');

        let currentPersonBlock = currentPerson.querySelector('.person__block');
        currentPersonBlock.style.height = currentPersonBlock.scrollHeight + 'px';
      }
    })
  });
}

teamAcco();

///////////////Горизонтальный аккордеон/////////////////////////

let submenuAcco = () => {
  let submenuLink = document.querySelectorAll('.submenu__link');

  submenuLink.forEach(submenuItem => {
    submenuItem.addEventListener('click', (e) => {
      e.preventDefault(e);

      let activeSubmenu = document.querySelector('.submenu--active');

      if (activeSubmenu) {
        let submenuBlock = activeSubmenu.querySelector('.submenu__block');
        submenuBlock.style.width = '0px';
        activeSubmenu.classList.remove('submenu--active');
      }
      
      if (!activeSubmenu || e.target !== activeSubmenu.querySelector('.submenu__link')) {
        // let currentSubmenu = e.target.parentNode;
        let currentSubmenu = e.target.closest('.submenu');
        currentSubmenu.classList.add('submenu--active');

        let currentSubmenuBlock = currentSubmenu.querySelector('.submenu__block');
        currentSubmenuBlock.style.width = calculateWidth() + 'px';
      }

      if (activeSubmenu && e.target == activeSubmenu.querySelector('.submenu__title')) {
        let submenuBlock = activeSubmenu.querySelector('.submenu__block');
        submenuBlock.style.width = '0px';
        activeSubmenu.classList.remove('submenu--active');
      }
    })
  });

  let calculateWidth = () => {

    let windowWidth = window.innerWidth;

    let links = document.querySelectorAll('.submenu__link');
    let linksWidth = parseInt(getComputedStyle(links[0]).width);

    let width = windowWidth - linksWidth * links.length;

    if (width > 550) {
      return 550;
    } else {
      return width;
    }

    // return (width > 550) ? 550 : width;
  }
}

submenuAcco();

//////////////////////////Слайдер/////////////////////////

let slide = (function () {
  const left = document.querySelector('.arrow--left');
  const right = document.querySelector('.arrow--right');
  const slider = document.querySelector('.slider__list');
  let sliderWidth = parseInt(getComputedStyle(slider).width);
  let sliderItemsCounter = slider.children.length;

  let moveSlide = function (direction) {
    direction.addEventListener('click', (e) => {
      e.preventDefault();
      let currentRight = parseInt(getComputedStyle(slider).right);

      if (currentRight < (sliderItemsCounter - 1) * sliderWidth && direction == right) {
        slider.style.right = currentRight + sliderWidth + 'px';
      }

      if (currentRight == (sliderItemsCounter - 1) * sliderWidth && direction == right) {
        slider.style.right = 0 + 'px';
      }

      if (currentRight > 0 && direction == left) {
        slider.style.right = currentRight - sliderWidth + 'px';
      }

      if (currentRight == 0 && direction == left) {
        slider.style.right = (sliderItemsCounter - 1) * sliderWidth + 'px';
      }
    });

    window.addEventListener('resize', function () {
      currentRight = 0;
      slider.style.right = currentRight;
      sliderWidth = parseInt(getComputedStyle(slider).width);
    })
  }

  let addListeners = function () {
    moveSlide(right);
    moveSlide(left);
  }

  return { init: addListeners }
})();

slide.init();

/////////////////////////Открытие и закрытие модального окна//////////////////////////////

const overlay = (function () {
  let body = document.querySelector('body');
  let link = document.createElement('a');

  link.classList.add('modal-review__close');
  link.setAttribute('href', '#');

  let openOverlay = function (modalId, content) {
    let overlay = document.querySelector(modalId);
    let innerOverlay = document.querySelector('.modal-review__inner');

    if (content) {
      innerOverlay.innerHTML = content;
    }
    innerOverlay.appendChild(link);

    overlay.classList.add('modal-review--active');
    body.classList.add('locked');

    link.addEventListener('click', (e) => {
      e.preventDefault();
      closeOverlay(modalId);
    })

    overlay.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target === overlay) {
        closeOverlay(modalId);
      }
    })

    document.addEventListener('keydown', function (e) {
      if (e.keyCode == 27) {
        closeOverlay(modalId);
      }
    });
  }

  let closeOverlay = function (modalId) {
    let overlay = document.querySelector(modalId);

    overlay.classList.remove('modal-review--active');
    body.classList.remove('locked');
  }

  // let setContent = function (modalId, content) {
  //   let overlay = document.querySelector(modalId);
  //   let innerOverlay = overlay.querySelector('.modal-review__inner');

  //   if (content) {
  //     innerOverlay.innerHTML = content;
  //     innerOverlay.appendChild(link);
  //   }
  // }

  return {
    open: openOverlay,
    close: closeOverlay,
    // setContent: setContent
  }
})();

/////////////////////Отправляет запрос на сервер////////////////

var ajaxForm = function (form) {
  let formData = new FormData();
  formData.append('name', form.elements.name.value);
  formData.append('phone', form.elements.phone.value);
  formData.append('comment', form.elements.comment.value);
  formData.append('to', 'free20@yandex.ru');

  // let data = {
  //   name: form.elements.name.value,
  //   phone: form.elements.phone.value,
  //   comment: form.elements.comment.value,
  //   to: 'free20@yandex.ru'
  // },
  let url = 'https://webdev-api.loftschool.com/sendmail/';

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', url);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.send(formData);

  // xhr.send(JSON.stringify(data));

  return xhr;
}

//////////////////////Обрабатывает ответ с сервера/////////////////

var submitForm = function (e) {
  e.preventDefault();
  var form = e.target;
  let request = ajaxForm(form)

  request.addEventListener('load', () => {
    if (request.status >= 400) {
      // let content = 'Ошибка соединения с сервером, попробуйте позже';

      // overlay.open('#modal-review', `${content}. Ошибка ${request.status}`)
      let contentModalForm = request.response.errors.name;

      overlay.open('#modal-review', contentModalForm);

    } else {
      let contentModalForm = request.response.message;

      overlay.open('#modal-review', contentModalForm);
    }
  });
}

let myForm = document.querySelector('#form');
myForm.addEventListener('submit', submitForm);

///////////////////Открытие отзыва//////////////////////

let reviewOpen = function (content) {
  let commentsList = document.querySelector('.comments__list');

  commentsList.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e.target);

    if (e.target.classList.contains('btn--review')) {
      overlay.open('#modal-review', content);
    }
  });
}

let contentReview = document.querySelector('#overlay1').innerHTML;
reviewOpen(contentReview);