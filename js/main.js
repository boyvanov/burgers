let menu = (function (options) {
  let button = document.querySelector(options.button);
  let menu = document.querySelector(options.menu);
  let body = document.querySelector('body');
  let logo = document.querySelector(options.logo);

  let itemList = document.getElementById('nav__list').children;

  let counter = 0,
    flag = false;

  let startMenuAnimation = function startMenuAnimation() {
    let elem = itemList[counter];

    elem.classList.toggle('slideInUp');
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
      let target = e.target;
      if (target.classList.contains('nav__link')) {
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

// let teamAcco = function () {
//   let teamList = document.querySelector('.team__accordeon');

//   teamList.addEventListener('click', function (e) {
//     e.preventDefault();
//     let target = e.target;
//     console.log(target);
//     const item = target.closest('.person');
//     const items = document.querySelectorAll('.person');
//     // if (target.className === 'person__link') {
//     if (target.classList.contains('person__link')) {
//       // if (item.classList.contains('person--active') == false) {
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

  teamLink.forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault(e);
      let activePerson = document.querySelector('.person--active');

      if (activePerson) {
        let personBlock = activePerson.querySelector('.person__block');
        personBlock.style.height = 0 + 'px';
        activePerson.classList.remove('person--active');
      }

      if (!activePerson || e.target !== activePerson.querySelector('.person__link')) {
        let currentPerson = e.target.closest('.person');
        currentPerson.classList.add('person--active');

        let currentPersonBlock = currentPerson.querySelector('.person__block');
        currentPersonBlock.style.height = currentPersonBlock.scrollHeight + 'px';
      }
    })
  });
}

teamAcco();

