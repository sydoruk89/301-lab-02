'use strict';

function Horns(horns) {
  this.url = horns.image_url;
  this.name = horns.title;
  this.desc = horns.description;
  this.keyword = horns.keyword;
  this.num = horns.horns;
}

Horns.all = [];

Horns.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let hornClone = $('div[class="clone"]');
  let hornHtml = $('#photo-template').html();
  hornClone.html(hornHtml);
  hornClone.find('h2').text(this.name);
  hornClone.find('img').attr('src', this.url);
  hornClone.find('p').text(this.desc);
  hornClone.removeClass('clone');
  hornClone.attr('class', this.keyword);
}

Horns.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(item => {
        Horns.all.push(new Horns(item));
      });
    })
    .then(() => {
      Horns.loadHorns();
      displayPage();
    });
}


Horns.loadHorns = () => {
  Horns.all.forEach(horns => horns.render());
}

$(() => Horns.readJson());




// Dog.readJson = () => {
//   $.get('./data.json', 'json')
//     .then(data => {
//       data.forEach(item => {
//         Dog.allDogs.push(new Dog(item));
//       });
//     })
//     .then(Dog.loadDogs);
// };

// Dog.loadDogs = () => {
//   Dog.allDogs.forEach(dog => dog.render());
// };

// $(() => Dog.readJson());
