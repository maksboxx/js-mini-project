//-----------------------------SECOND PAGE-------------------------------------------------
//--------------------------------TASK-----------------------------------------------------
// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.
// user-details.html - блок з інфою про user зверху сторінки. Кнопка нижчє, на 90% ширини сторінки, по центру.
//------------------------------------------------------------------------------------------

const mainDiv=document.getElementById('usersDetailsDiv')
const fullUserInfo = JSON.parse(localStorage.getItem('user'))
// console.log(fullUserInfo)

// Рекурсия для вывода всех вложенных обьектов. На случай того если их будет много
// Скорее всего его можно сделать как то лучше и проще, но я смог только этот вариант оптимальный найти

function displayList(obj, mainDiv) {
    const ul = document.createElement('ul');
    ul.classList.add('ul-user-full-info')
    mainDiv.appendChild(ul);
    for (let objKey in obj) {
        const li = document.createElement('li');
        li.classList.add('li-user-full-info')
        let value = obj[objKey];
        if (typeof value === 'object') {
            li.innerHTML = `<b>${objKey}:</b>`;
            ul.appendChild(li);
            displayList(value, li);
        } else {
            li.innerHTML = `<b>${objKey}:</b> ${value}`;
            ul.appendChild(li);
        }
    }
    mainDiv.appendChild(ul)
}
displayList(fullUserInfo,mainDiv)

// ------------------------------------------------------SHOW POST----------------------------------------------------

const buttonShowPosts =document.createElement('button')
buttonShowPosts.classList.add('button-show-posts')
buttonShowPosts.innerText='Post of current user'
mainDiv.appendChild(buttonShowPosts)
const sectionPosts =document.createElement('section')
buttonShowPosts.onclick=function () {
    sectionPosts.innerText='' // ---------Очистка если кнопку будут нажимать несколько раз или же будут
    // обновлять список постов
    fetch(`https://jsonplaceholder.typicode.com/users/${fullUserInfo.id}/posts`)
        .then((response)=>response.json())
        .then(userPosts=>{
            sectionPosts.classList.add('sectionPosts')
            for (const post of userPosts) {
                    const postDiv =document.createElement('div')
                    const postP=document.createElement('p')
                    const postLink=document.createElement('a')
                    postLink.classList.add('postLink')
                    postP.classList.add('postP')
                    postDiv.classList.add('postDiv')
                    postP.innerHTML=`
                    <b>Title</b>: ${post.title}
                    `
                postLink.innerText='Details';
                postLink.onclick=function () {
                    localStorage.setItem(`post`, JSON.stringify(post));
                }
                postLink.href="post-details.html"
                    postDiv.append(postP,postLink)
                    sectionPosts.appendChild(postDiv)
            }
            mainDiv.appendChild(sectionPosts)
        })

}