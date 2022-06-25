$(document).ready(function () {
    $("#hidenNav").hide();
});
$(document).ready(function () {
    $("#menu").hide(0);
});

$("#open").click(function () {
    $("#hidenNav").slideToggle(0, function () {
        $("#menu").slideToggle(1000);
    });
});
// })

let playingMovies = [];
async function getmovies(movieList) {
    if (movieList === undefined) {
        movieList = "now_playing";
    }
    let myReq = await fetch(
        `https://api.themoviedb.org/3/movie/${movieList}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR32Px4_3ZTHYF-tjdSOdkN82Esd5XSCl7c0ueF0LR8urOnlJBZ4TJJdf_k`
    );
    let finalReq = await myReq.json();
    playingMovies = finalReq.results;
    displayMovie();
}

getmovies();

// display function

function displayMovie(searchList) {
    var cartona = "";

    if (searchList != undefined) {
        playingMovies = searchList;
    }

    for (var i = 0; i < playingMovies.length; i++) {
        cartona += `<div class=" col-md-6 col-lg-4 my-3 shadow">
        <div class="movie shadow rounded position-relative">
            <div class="post">
                <img src="https://image.tmdb.org/t/p/w500/${playingMovies[i].poster_path}" class="img-fluid rounded">
                <div class="layer d-flex flex-column justify-content-center">
                    <div class="info p-0">

                        <h2>${playingMovies[i].title}</h2>
                        <p>${playingMovies[i].overview}</p>
                        <p>rate: ${playingMovies[i].vote_average}</p>
                        <p>${playingMovies[i].release_date}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    }
    document.getElementById("rowData").innerHTML = cartona;
}

// list functions

function nowPlaying() {
    getmovies("now_playing");
}
function popular() {
    getmovies("popular");
}
function topRated() {
    getmovies("top_rated");
}
async function trending() {
    let myReq = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=c73c7153f601e122d35a46d43dbd6eca`
    );
    let finalReq = await myReq.json();
    playingMovies = finalReq.results;
    displayMovie();
}
function upComing() {
    getmovies("upcoming");
}

// search

let searchMovies = [];
async function search(searchList) {
    if (searchList === undefined) {
        searchList = "";
    }
    let searchReq = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=c73c7153f601e122d35a46d43dbd6eca&query=${searchList}`
    );

    let finalSearch = await searchReq.json();
    let searchMovies = finalSearch.results;
    displayMovie(searchMovies);
}
search();

let searchresults2 = document
    .getElementById("allMovies")
    .addEventListener("keyup", (searchList) => {
        search(searchList.target.value);
    });
let searchresults = document
    .getElementById("word")
    .addEventListener("keyup", (searchList) => {
        search(searchList.target.value);
    });

// validation

let userName = document.getElementById("name");
let userEmail = document.getElementById("email");
let userPhone = document.getElementById("phone");
let userAge = document.getElementById("age");
let userPassword = document.getElementById("password");
let userRePassword = document.getElementById("rePassword");

// alert
let userNameAlert = document.getElementById("nameAlert");
let userEmailAlert = document.getElementById("emailAlert");
let userPhoneAlert = document.getElementById("phoneAlert");
let userAgeAlert = document.getElementById("ageAlert");
let userpasswordAlert = document.getElementById("passwordAlert");
let userRepasswordAlert = document.getElementById("rePasswordAlert");

function userNameValid() {
    return 1 == /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(userName.value)
        ? ((userNameAlert.style.display = "none"), !0)
        : ((userNameAlert.style.display = "block"), !1);
}
function userEmailValid() {
    return 1 ==
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail.value)
        ? ((userEmailAlert.style.display = "none"), !0)
        : ((userEmailAlert.style.display = "block"), !1);
}
function userPhoneValid() {
    return 1 ==
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
            userPhone.value
        )
        ? ((userPhoneAlert.style.display = "none"), !0)
        : ((userPhoneAlert.style.display = "block"), !1);
}
function userAgeValid() {
    return 1 == /^[1-9]{1}[0-9]{1}$/.test(userAge.value)
        ? ((userAgeAlert.style.display = "none"), !0)
        : ((userAgeAlert.style.display = "block"), !1);
}
function userPasswordValid() {
    return 1 == /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.value)
        ? ((userpasswordAlert.style.display = "none"), !0)
        : ((userpasswordAlert.style.display = "block"), !1);
}

(userAgeAlert.style.display = "none"),
    userName.addEventListener("keyup", userNameValid),
    userEmail.addEventListener("keyup", userEmailValid),
    userPhone.addEventListener("keyup", userPhoneValid),
    userAge.addEventListener("keyup", userAgeValid),
    userPassword.addEventListener("keyup", userPasswordValid),
    document.getElementById("contact").addEventListener("click", function () {
        userNameValid() &&
            userEmailValid() &&
            userPhoneValid() &&
            userAgeValid() &&
            userPasswordValid()
            ? (document.getElementById("submitBtn").disabled = !1)
            : (document.getElementById("submitBtn").disabled = !0);
    });
