'use strict';

function Horns(horns) {
  this.url = horns.image_url;
  this.name = horns.title;
  this.desc = horns.description;
  this.keyword = horns.keyword;
  this.num = horns.horns;
}

Horns.allHorns = [];
const keyWords = [];


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

Horns.loadHorns = () => {
  Horns.allHorns.forEach(horns => horns.render());
};

Horns.prototype.renderOption = function() {
  if (!keyWords.includes(this.keyword)){
    keyWords.push(this.keyword);
    $('select').append(`<option value = ${this.keyword}>${this.keyword}</option>`);
  }
};

Horns.loadOptions = () => {
  Horns.allHorns.forEach((element) => element.renderOption());
  $('select').on('change', function() {
    let selected = $(this).val();
    $('main div').hide();
    $(`div[class="${selected}"]`).show();
    if(selected === 'default'){
      $('div').show();
    }
  });
};

Horns.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(item => {
        Horns.allHorns.push(new Horns(item));
      });
    })
    .then(() => {
      Horns.loadHorns();
      Horns.loadOptions();
    })
}



// ------load data on page------

$(() => Horns.readJson());

