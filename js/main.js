const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

console.log(posts);

const postsContainer = document.querySelector('.posts-list');

const arrPostsLiked = [];

for(let i = 0; i < posts.length; i++) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('post');
    postsContainer.append(newDiv);

    newDiv.innerHTML = 
    `
    <div class="post__header">
        <div class="post-meta">                    
            <div class="post-meta__icon">
                <img class="profile-pic" src="${posts[i].author.image}" alt="${posts[i].author.name}">                    
            </div>
            <div class="post-meta__data">
                <div class="post-meta__author">${posts[i].author.name}</div>
                <div class="post-meta__time">${italianDate(posts[i].created)}</div>
            </div>                    
        </div>
    </div>
    <div class="post__text">${posts[i].content}</div>
    <div class="post__image">
        <img src="${posts[i].media}" alt="">
    </div>
    <div class="post__footer">
        <div class="likes js-likes">
            <div class="likes__cta">
                <a class="like-button  js-like-button" href="#!" data-postid="${posts[i].id}">
                    <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                    <span class="like-button__label">Mi Piace</span>
                </a>
            </div>
            <div class="likes__counter">
                Piace a <b id="like-counter-${posts[i].id}" class="js-likes-counter">${posts[i].likes}</b> persone
            </div>
        </div> 
    </div>
    `
    controlProfilePicture(i);
}

eventListenerCreation();

function controlProfilePicture(i) {
    if(posts[i].author.image == null) {
        const eleProfileImage = document.querySelectorAll('.profile-pic');
        eleProfileImage[i].classList.add('profile-pic-default');
        const surnameInitialIndex = posts[i].author.name.indexOf(' ') + 1;
        const initials = posts[i].author.name[0] + posts[i].author.name[surnameInitialIndex];
        eleProfileImage[i].attributes.alt.value = initials;
    }
}

function eventListenerCreation() {
    for(let i = 0; i < posts.length; i++) {
        const likeBtn = document.querySelector(`[data-postid="${posts[i].id}"]`);
        likeBtn.addEventListener('click', likeFunction);
    }
}

function likeFunction() {
    if(this.classList.contains('like-button--liked')) {
        this.classList.remove('like-button--liked'); // Decoloro il tasto premuto
        const eleLikesCount = document.querySelectorAll('.js-likes-counter');
        const index = this.attributes['data-postid'].value - 1; // Ottengo l'index del post
        eleLikesCount[index].innerHTML = posts[index].likes -= 1; // Decremento il numero dei like
        const indexID = arrPostsLiked.indexOf(posts[index].id); // Ottengo l'index dell'ID nell'array in console
        arrPostsLiked.splice(indexID, 1); // Rimuovo l'id dall'array dei likes in console
    } else {
        this.classList.add('like-button--liked'); // Coloro il tasto premuto
        const eleLikesCount = document.querySelectorAll('.js-likes-counter');
        const index = this.attributes['data-postid'].value - 1; // Ottengo l'index del post
        eleLikesCount[index].innerHTML = posts[index].likes += 1; // Aumento il numero dei like
        arrPostsLiked.push(posts[index].id); // Aggiungo ID post piaciuto all'interno dell'array apposito in console
    }
    console.log(arrPostsLiked);
}

function italianDate(toFormat) {
    // let date = toFormat.split(/\D/g);
    // return[date[2], date[1], date[0]].join("-");

    let date = '';
    for(let i = 0; i < posts.length; i++) {
        date = toFormat.split('-').reverse().join().replaceAll(',','/');
    }
    return date;
}