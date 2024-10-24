'use strict';

const TITLE = 'Express-esimerkki';

$(() => {
    document.title = TITLE;
    $('#heading').html(TITLE);
    $('form#nameForm').submit(e => {
	e.preventDefault();
	const nameField = $('form#nameForm input#name');
	const name = nameField.val();
	$.get(`/rs/hello?name=${name}`).then(value => {
	    console.log(value);
	    const valueLine = `<p>${value.id} : ${value.name}</p>`;
	    $('#greeting').append(valueLine);
	    nameField.val('');
	});
    });
});
