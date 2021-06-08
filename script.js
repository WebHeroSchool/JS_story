let userName = window.location.search.split('=')[1];
if (userName == undefined) {
  userName = "tinkabel85";
};
const url = "https://api.github.com/users/";
const log = console.log;
let currentDate = () => {
  let date = new Date();
  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;
  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;
  let yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;
  return dd + '.' + mm + '.' + yy;
}

const getProfile = fetch(`${url}${userName}`)
  .then(res => res.json());

const getDate = new Promise((resolve, reject) => {
  setTimeout(() => currentDate ? resolve(currentDate()) : reject('error'), 3000);
});

Promise.all([getProfile, getDate])
  .then(([profile, date]) => {
    console.log(profile);
    document.getElementById('date').innerHTML = 'Current Date: ' + date;
    preloader.classList.add('hidden');
    let name = profile.login;
    let avatar = profile.avatar_url;
    let bio = profile.bio;
    let link = profile.html_url;
    console.log(name, avatar, bio, link);
    if (name !== undefined) {
      document.getElementById('avatar').setAttribute('src', avatar);
      document.getElementById('name').innerHTML = `<a href='${link}' target=blank>${name}</a>`;
      document.getElementById('bio').innerHTML = bio;
    } else {
      document.body.innerHTML = "Информация о пользователе не доступна";
    }
  })
  .catch(function(error) {
    console.log("Информация о пользователе не доступна");
  });
