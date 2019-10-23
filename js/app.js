'use strict';

// step 1: add all keywords to drop down menu
// step 2: make sure keywords dont repeat
// step 3: filter images by keyword

function Horns(horns) {
    this.url = horns.image_url;
    this.name = horns.title;
    this.desc = horns.description;
    this.keyword = horns.keyword;
    this.num = horns.horns;
}

Horns.allHorns = [];
let dropdown = [];

Horns.prototype.options = function() {
    
    $('select').append('option')
}

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
    if(dropdown.includes(this.keyword) === false){
        dropdown.push(this.keyword);
    }
    if(dropdown.length === 11){
        dropdown.forEach(item =>{
            $('select').append(`<option value="${item}">${item}</option>`);

        })
    }
}

Horns.readJson = () => {
    $.get('data/page-1.json', 'json')
        .then(data => {
            data.forEach(item => {
                Horns.allHorns.push(new Horns(item));
            });
        })
        .then(Horns.loadHorns);
}

Horns.loadHorns = () => {
    Horns.allHorns.forEach(horns => horns.render());
}

$(() => Horns.readJson());
