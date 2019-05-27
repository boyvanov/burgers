let menu = (function (options) {
  let button = document.querySelector(options.button);
  let menu = document.querySelector(options.menu);
  let body = document.querySelector('body');

  let itemList = document.getElementById('nav__list').children;

  let counter = 0,
    flag = false;

  let startMenuAnimation = function startMenuAnimation() {
    let elem = itemList[counter];

    elem.classList.toggle('slideInUp');
    counter++;
    if (counter < itemList.length) {
      setTimeout(startMenuAnimation, 100);
    }
    if (counter === itemList.length) {
      counter = 0;
    }
  }

  let _toggleMenu = function (e) {
    button.classList.toggle('hamburger-menu-icon--active');
    menu.classList.toggle('hamburger-menu--active');
    body.classList.toggle('locked');

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
      target = e.target;
      if (target.classList.contains('nav__link')) {
        _toggleMenu();
      }
    })
  };

  document.addEventListener('keydown', function (e) {
    if ((e.keyCode == 27) && flag) {
      _toggleMenu();
    }

  });

  return {
    openMenu: addListeners
  };

})({
  button: '#hamburger-menu-icon',
  menu: '#hamburger-menu'
});

menu.openMenu();
