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
      if ((e.keyCode === 27) && flag) {
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

/////////////Вертикальный аккордеон/////////////////////////

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

      if (!activeSubmenu || e.currentTarget !== activeSubmenu.querySelector('.submenu__link')) {
        // let currentSubmenu = e.currentTarget.parentNode;
        let currentSubmenu = e.currentTarget.closest('.submenu');
        currentSubmenu.classList.add('submenu--active');

        let currentSubmenuBlock = currentSubmenu.querySelector('.submenu__block');
        currentSubmenuBlock.style.width = calculateWidth() + 'px';
      }

      // if (activeSubmenu && e.target == activeSubmenu.querySelector('.submenu__title')) {
      //   let submenuBlock = activeSubmenu.querySelector('.submenu__block');
      //   submenuBlock.style.width = '0px';
      //   activeSubmenu.classList.remove('submenu--active');
      // }
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

// let slide = (function () {
//   const left = document.querySelector('.arrow--left');
//   const right = document.querySelector('.arrow--right');
//   const slider = document.querySelector('.slider__list');
//   let sliderWidth = parseInt(getComputedStyle(slider).width);
//   let sliderItemsCounter = slider.children.length;
//   let flag = true;


//   let moveSlide = function (direction) {
//     direction.addEventListener('click', (e) => {
//       e.preventDefault();
//       let currentRight = parseInt(getComputedStyle(slider).right);
//       if (flag) {
//         flag = false;

//         if (currentRight < (sliderItemsCounter - 1) * sliderWidth && direction == right) {
//           slider.style.right = currentRight + sliderWidth + 'px';
//         }

//         if (currentRight == (sliderItemsCounter - 1) * sliderWidth && direction == right) {
//           slider.style.right = 0 + 'px';
//         }

//         if (currentRight > 0 && direction == left) {
//           slider.style.right = currentRight - sliderWidth + 'px';
//         }

//         if (currentRight == 0 && direction == left) {
//           slider.style.right = (sliderItemsCounter - 1) * sliderWidth + 'px';
//         }
//         setTimeout(function () {
//           flag = true
//         }, 300)
//       }
//     });

//     window.addEventListener('resize', function () {
//       currentRight = 0;
//       slider.style.right = currentRight;
//       sliderWidth = parseInt(getComputedStyle(slider).width);
//     })
//   }

//   let addListeners = function () {
//     moveSlide(right);
//     moveSlide(left);
//   }

//   return { init: addListeners }
// })();

// slide.init();

/////////////////////////Слайдер jQuery/////////////////////////////////////////////////


$(function () {
  let moveSlide = function (item) {
    let activeSlide = $('.slider__item.active'),
      list = $('.slider__list'),
      reqIndex = item.index(),
      duration = 300;

    list.stop(true, true).animate(
      {
        'left': -reqIndex * 100 + '%'
      }, duration, function () {
        activeSlide.removeClass('active');
        item.addClass('active');
      });
  }

  $('.arrow').on('click', function (e) {
    e.preventDefault();
    let $this = $(e.currentTarget),
      items = $('.slider__item'),
      activeItem = $('.slider__item.active'),
      nextItem = activeItem.next(),
      prevItem = activeItem.prev(),
      firstItem = items.first(),
      lastItem = items.last();

    if ($this.hasClass('arrow--right')) {
      if (nextItem.length) {
        moveSlide(nextItem);
      } else {
        moveSlide(firstItem);
      }
    }
    if ($this.hasClass('arrow--left')) {
      if (prevItem.length) {
        moveSlide(prevItem);
      } else {
        moveSlide(lastItem);
      }
    }

    // if ($this.hasClass('arrow--left') && prevItem.length) {
    //   moveSlide(prevItem);
    // }
    // if ($this.hasClass('arrow--right') && nextItem.length) {
    //   moveSlide(nextItem);
    // }
  })
});

////////////////////////////IngredientsVisible///////////////////////////////////////////

// $(function() {

//   let IngredientsHover = function () {

//     $('.ingredients').mouseenter(function() {
//       $(this).addClass('ingredients--active');
//     }) 

//     $('.ingredients').mouseleave(function() {
//       $(this).removeClass('ingredients--active');
//     }) 
//   }
//   IngredientsHover();
// })

let IngredientsHover = (function () {
  
  // let ingredients = document.querySelector('.ingredients');
  // let ingredientsCross = document.querySelector('.ingredients__cross-link');
  // let body = document.querySelector('body');


// body.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   console.log(e.target);

  //   if (e.target === ingredients) {
  //     // console.log(e.target);
  //     ingredients.classList.add('active');
  //   } else {
  //     ingredients.classList.remove('active');
  //   }
  // })

  // body.addEventListener('click', (e) => {
  //   e.preventDefault();

  //   if (e.target !== ingredients) {
  //     ingredients.classList.remove('active');
  //   }
  // })

  // ingredients.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   ingredients.classList.toggle('active');
  // })

  // ingredients.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   // console.log(e.target);

  //   if (e.target === ingredientsCross) {
  //     // console.log(e.target);
  //     ingredients.classList.remove('active');
  //   } 
  // })

  // $('.ingredients').on('click', function (e) {
  //   e.preventDefault();
  //   console.log($(this));
  //   // console.log(e.target);

  //   $(this).addClass('active');
  // })

  // $('body').on('click', '.ingredients', function(e) {
  //   e.preventDefault();
  //   console.log(e.currentTarget);

  //   if (e.currentTarget !== $('.ingredients')) {
  //     $('.ingredients').removeClass('active');
  //   }

  // })

  // document.addEventListener('keydown', function (e) {
  //   if (e.keyCode === 27) {
  //     $('.ingredients').removeClass('active');
  //   }
  // })

  $('.ingredients').on({
    mouseenter() {
      $(this).addClass('ingredients--active');
    },
    mouseleave() {
      $(this).removeClass('ingredients--active');
    }
  })

  $('.ingredients__cross-link').on('click', function (e) {
    e.preventDefault();
    // console.log($(this));
    $(this).closest('.ingredients').removeClass('ingredients--active');
  })

  // $('.ingredients').mouseenter(function () {
  //   $(this).addClass('active');
  // })

  // $('.ingredients').mouseleave(function () {
  //   $(this).removeClass('active');
  // })
})();

////////////////////////////One Page scroll//////////////////////////////////////////////

var md = new MobileDetect(window.navigator.userAgent),
  isMobile = md.mobile();

let onePageScroll = (function () {
  const sections = $('.section');
  const visible = $('#content');
  let inscroll = false;

  let performTransition = function (sectionEq) {

    if (!inscroll) {
      inscroll = true;
      let position = sectionEq * -100 + '%';
      // let activeSection =

      sections.eq(sectionEq).addClass('is-active').siblings().removeClass('is-active');

      visible.css({
        transform: `translateY(${position})`,
        '-webkit-transform': `translateY(${position})`
      });

      $('.points__item').eq(sectionEq).addClass('active').siblings().removeClass('active');

      setTimeout(function () {

        inscroll = false;

        // $('.points__item').eq(sectionEq).addClass('active').siblings().removeClass('active');
      }, 500);
    };
  }

  $('[data-scroll-to]').on('click', function (e) {
    e.preventDefault();
    performTransition(parseInt($(e.target).data('scroll-to')));
  });

  let defineSections = function (sectionsList) {

    let activeSection = sectionsList.filter('.is-active');
    return {
      activeSection: activeSection,
      nextSection: activeSection.next(),
      prevSection: activeSection.prev()
    }
  };

  let scrollToSections = function (direction) {

    let section = defineSections(sections);

    if (direction === 'up' && section.nextSection.length) {
      performTransition(section.nextSection.index());
    }

    if (direction === 'down' && section.prevSection.length) {
      performTransition(section.prevSection.index());
    }

  };

  $('.wrapper').on({
    wheel: function (e) {
      const deltaY = e.originalEvent.deltaY;
      const direction = deltaY > 0 ? 'up' : 'down';
      scrollToSections(direction);
    },
    touchmove: function (e) {
      e.preventDefault();
    }
  });

  if (isMobile) {
    $(window).swipe({
      swipe: function (event, direction) {
        scrollToSections(direction);
      }
    });
  }

  $(document).on('keydown', function (e) {
    let section = defineSections(sections);

    switch (e.keyCode) {
      case 40:
        if (section.nextSection.length) {
          performTransition(section.nextSection.index());
        }
        break;
      case 38:
        if (section.prevSection.length) {
          performTransition(section.prevSection.index());
        }
        break;
    }
  })
})();

/////////////////////////Открытие и закрытие модального окна//////////////////////////////

const overlay = (function () {
  let body = document.querySelector('body');
  let link = document.createElement('a');
  let button = document.createElement('button');

  link.classList.add('modal-review__close');
  link.setAttribute('href', '#');

  button.classList.add('btn', 'btn--modal');
  button.setAttribute('type', 'button');

  let closeOverlay = function (modalId) {
    let overlay = document.querySelector(modalId);

    overlay.classList.remove('modal--active');
    body.classList.remove('locked');
  }

  let openOverlay = function (modalId, content) {
    let overlay = document.querySelector(modalId);
    let innerOverlay = overlay.querySelector('.modal__inner');

    if (content) {
      innerOverlay.innerHTML = content;
    }

    if (modalId === '#modal-review') {
      innerOverlay.appendChild(link);
    }

    if (modalId === '#modal-form') {
      innerOverlay.appendChild(button);
      button.textContent = 'закрыть';
    }

    overlay.classList.add('modal--active');
    body.classList.add('locked');

    link.addEventListener('click', (e) => {
      e.preventDefault();
      closeOverlay(modalId);
    })

    button.addEventListener('click', (e) => {
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
      if (e.keyCode === 27) {
        closeOverlay(modalId);
      }
    });
  }

  // let openOverlay = function (modalId, content) {
  //   let overlay = document.querySelector(modalId);
  //   let contentOverlay = overlay.querySelector('.modal__content');
  //   let link = document.querySelector('.modal-review__close');
  //   let button = document.querySelector('.btn--modal');

  //   if (content) {
  //     contentOverlay.innerHTML = content;
  //   }

  //   overlay.classList.add('modal--active');
  //   body.classList.add('locked');

  //   link.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     closeOverlay(modalId);
  //   })

  //   button.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     closeOverlay(modalId);
  //   })

  //   overlay.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     if (e.target === overlay) {
  //       closeOverlay(modalId);
  //     }
  //   })

  //   document.addEventListener('keydown', function (e) {
  //     if (e.keyCode == 27) {
  //       closeOverlay(modalId);
  //     }
  //   });
  // }

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

let ajaxForm = function (form) {
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

let submitForm = function (e) {
  e.preventDefault();
  let form = e.target;
  let request = ajaxForm(form)

  request.addEventListener('load', () => {
    if (request.status >= 400) {
      //   let contentModalForm = 'Ошибка соединения с сервером, попробуйте позже';
      //   overlay.open('#modal-form', `${contentModalForm}. Ошибка ${request.status}`)
      // }
      if (form.elements.comment.value === "") {
        let contentModalForm = request.response.errors.comment;
        overlay.open('#modal-form', contentModalForm);
      }

      if (form.elements.phone.value === "") {
        let contentModalForm = request.response.errors.phone;
        overlay.open('#modal-form', contentModalForm);
      }

      if (form.elements.name.value === "") {
        let contentModalForm = request.response.errors.name;
        overlay.open('#modal-form', contentModalForm);
      }
    } else {
      let contentModalForm = request.response.message;
      overlay.open('#modal-form', contentModalForm);
    }
  });
}

let myForm = document.querySelector('#form');
myForm.addEventListener('submit', submitForm);

///////////////////Открытие отзыва//////////////////////

let reviewOpen = function (template) {
  let commentsList = document.querySelector('.comments__list');

  commentsList.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.classList.contains('btn--review')) {
      overlay.open('#modal-review', template);
    }
  });
}

let contentReview = document.querySelector('#overlay1').innerHTML;
reviewOpen(contentReview);

/////////////////////////////Видео Плеер//////////////////////////////////////

let video;
let durationControl;
let soundControl;
let intervalId;

// документ полностью загружен
$().ready(function () {

  video = document.getElementById("player");

  // вешаем обработчик события onclick на тег video
  video.addEventListener('click', playStop);

  // обработчики событий для кнопок play
  let playButtons = document.querySelectorAll(".play");
  for (let i = 0; i < playButtons.length; i++) {
    playButtons[i].addEventListener('click', playStop);
  }

  // обработчик событий для кнопки динамик
  let micControl = document.getElementById("mic");
  micControl.addEventListener('click', soundOf)

  // обработчики событий для ползунка продолжительности видео
  durationControl = document.getElementById("durationLevel");
  durationControl.addEventListener('mousedown', stopInterval);
  // durationControl.addEventListener('click',setVideoDuration);
  durationControl.addEventListener('mouseup', setVideoDuration);

  durationControl.min = 0;
  durationControl.value = 0;

  // обработчики событий для ползунка громокости
  soundControl = document.getElementById("micLevel");
  // soundControl.addEventListener('click', changeSoundVolume);
  soundControl.addEventListener('mouseup', changeSoundVolume);

  // задаем максимальные и минимальные значения громокости
  soundControl.min = 0;
  soundControl.max = 10;
  // присваиваем ползунку максимальное значение
  soundControl.value = soundControl.max;

  //обрабатываем окончание видео
  video.addEventListener('ended', function () {
    $(".video__player-img").toggleClass("video__player-img--active");
    video.currentTime = 0;
  }, false);
});
/*
 Воспроизведение видео
*/
function playStop() {
  // показывает или скрывает белую кнопку play
  $(".video__player-img").toggleClass("video__player-img--active");
  // присваиваем ползунку продолжительности максимальное значение равное продолжительности нашего видео (в секундах)
  durationControl.max = video.duration;

  // проверим стоит ли видео на паузе, если да то продолжим воспроизведение. Если, наоборот, проигрыавыется, то остановим.
  if (video.paused) {
    // video.webkitRequestFullScreen(); //возможность открыть в полноэкранном режиме
    // запускаем видео
    video.play();
    intervalId = setInterval(updateDuration, 1000 / 66)

  } else {
    // video.webkitExitFullscreen(); //выйти из полноэкранного режима
    // останавливаем видео
    video.pause();
    clearInterval(intervalId);

  }
}

function stopInterval() {
  video.pause();
  clearInterval(intervalId);
}
/*
    Реализует возможность перемотки нашего видео
*/
function setVideoDuration() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  video.currentTime = durationControl.value;
  intervalId = setInterval(updateDuration, 1000 / 66);
}
/*
  Функция для обновления позиции ползунка продолжительности видео.   
*/
function updateDuration() {
  durationControl.value = video.currentTime;
  // console.log(video.currentTime)
}
/*
    Управление звуком
*/
function soundOf() {
  /*
      Делаем проверку уровня громкости. 
      Если у нас нашего видео есть звук, то мы его выключаем. 
      Предварительно запомнив текущую позицию громкости в переменную soundLevel
  */
  if (video.volume === 0) {
    video.volume = soundLevel;
    soundControl.value = soundLevel * 10;
  } else {
    /*
        Если у нашего видео нет звука, то выставляем уровень громкости на прежний уровень.
        Хранится в перменной soundLevel
    */
    soundLevel = video.volume;
    video.volume = 0;
    soundControl.value = 0;
  }
}
/*
    Управление звуком видео
*/
function changeSoundVolume() {
  /*
      Св-во volume может принимать значения от 0 до 1
      Делим на 10 для того что бы, была возможность более точной регулировки видео. 
       video.volume 0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9  1 
 soundControl.value 0   1   2   3   4   5   6   7   8   9  10
      */

  video.volume = soundControl.value / 10;
  // console.log(video.volume)
}

/////////////////////////Яндекс-карта//////////////////////////////////////////////

ymaps.ready(init);

let placemarks = [
  {
    latitude: 59.914,
    longitude: 30.513,
    hintContent: 'Mr. Burger №1',
    balloonContent: 'Лучшие бургеры в городе!',
  },
  {
    latitude: 59.926,
    longitude: 30.404,
    hintContent: 'Mr. Burger №2',
    balloonContent: 'Лучшие бургеры в городе!',
  },
  {
    latitude: 59.969,
    longitude: 30.337,
    hintContent: 'Mr. Burger №3',
    balloonContent: 'Лучшие бургеры в городе!',
  },
  {
    latitude: 59.881,
    longitude: 30.338,
    hintContent: 'Mr. Burger №4',
    balloonContent: 'Лучшие бургеры в городе!',
  }
  // {
  //   latitude: 59.881,
  //   longitude: 30.338,
  //   hintContent: '<div class="map__hint">наб. реки Фонтанки, д.56</div>',
  //   balloonContent: [
  //     '<div class="map__balloon">',
  //     '<img class="map__burger-img" src="../img/logo/logo.png" alt="burger"/>',
  //     'Самые вкусные бургеры у нас! Заходите по адресу: наб. реки Фонтанки, д.56',
  //     '</div>'
  //   ]
  // }

],
  geoObjects = [];
  
function init() {
  let map = new ymaps.Map('map', {
    center: [59.924, 30.382],
    zoom: 12,
    controls: ['zoomControl'],
    behaviors: ['drag']
  })

  for (let i = 0; i < placemarks.length; i++) {
    // placemarks.forEach(function(obj) {
    geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude], {
      hintContent: placemarks[i].hintContent,
      balloonContent: placemarks[i].balloonContent
      // balloonContent: placemarks[i].balloonContent.join('')
    },
      {
        iconLayout: 'default#image',
        iconImageHref: './img/svg/map-marker.svg',
        iconImageSize: [46, 58],
        iconImageOffset: [-23, -58]
        // iconImageClipRect: [[415,0], [461,57]]
      });
  };

  let clusterer = new ymaps.Clusterer({
    clusterIcons: [
      {
        href: './img/svg/logo.svg',
        size: [98, 74],
        offset: [-49, -37]
      }
    ],
    clusterIconContentLayout: null
  });

  map.geoObjects.add(clusterer);
  clusterer.add(geoObjects)
  // map.geoObjects.add(placemark);

}