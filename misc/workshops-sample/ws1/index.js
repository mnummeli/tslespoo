function app(){
    let showEx1Elem = false;
    $('#ex1form').submit(e => {
        e.preventDefault();
        showEx1Elem = !showEx1Elem;
        if(showEx1Elem) {
            $('#ex1elem').show(300);
            $('#ex1form button').html('Hide element');
        } else {
            $('#ex1elem').hide(300);
            $('#ex1form button').html('Show element');
        }
    });
    $('#ex2Area').mousemove(e => {
        $('#ex2Coords').html(`x: ${e.offsetX}, y: ${e.offsetY}`);
    });
}

$(app);