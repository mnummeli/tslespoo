/* global ex1area, ex2area */

function app() {
    const title = 'Workshop 2';
    document.title = title;
    document.querySelector('header h1').innerHTML = title;

    const lincoln = `
<p style="font-weight: bold;">"If I had nine hours to chop down a tree, I'd spend the first six sharpening my ax."</p>
<p>-- Abraham Lincoln</p>
`;
    ex1area.innerHTML = lincoln;
    repeatingText();
    document.querySelector('#ex4area button').onclick = askTheQuestion;
    document.querySelector('#ex5area button').onclick = showRandomImage;
    showRandomImage();

    function repeatingText() {
        let exercise2Str = '';
        for (let i = 0; i < 50; i++) {
            exercise2Str += lincoln;
        }
        ex2area.innerHTML = exercise2Str;
    }

    function askTheQuestion(event) {
        const isStudent = confirm('Are you a student?');
        document.querySelector('#ex4area p').innerHTML = isStudent ?
                '<p>Welcome student!</p>' :
                '<p>Sorry, this page is for students only.</p>';
    }

    function showRandomImage(event) {
        const images = [
            "http://farm4.staticflickr.com/3691/11268502654_f28f05966c_m.jpg",
            "http://farm1.staticflickr.com/33/45336904_1aef569b30_n.jpg",
            "http://farm6.staticflickr.com/5211/5384592886_80a512e2c9.jpg"
        ];
        const value = Math.floor(Math.random() * images.length);
        const imageElement = document.querySelector('#ex5area img');
        imageElement.style.height = '300px';
        imageElement.src = images[value];
    }
}

window.onload = app;