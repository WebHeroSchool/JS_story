let userName = window.location.search.split('=')[1];
if (userName == undefined) {
  userName = "tinkabel85";
};
console.log(userName);

fetch(`https://api.github.com/users/${userName}`)
  .then(res => res.json())
  .then(json => {
    console.log(json);
    let name = json.login;
    let avatar = json.avatar_url;
    let bio = json.bio;
    let link = json.html_url;
    console.log(name, avatar, bio, link);
    if (name !== undefined) {
      document.getElementById('avatar').setAttribute('src', avatar);
      document.getElementById('name').innerHTML = `<a href='${link}' target=blank>${name}</a>`;
      document.getElementById('bio').innerHTML = bio;
    } else {
      document.body.innerHTML="Информация о пользователе не доступна";
    }
  })
  .catch(function(error) {
    console.log("Информация о пользователе не доступна");
  });
