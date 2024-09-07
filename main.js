//-----------------------------FIRST PAGE-------------------------------------------------
//--------------------------------TASK----------------------------------------------------
// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід
// на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули
// index.html - всі блоки з user - по 2 в рядок. кнопки/аосилвння розташувати під інформацією про user.
//-----------------------------------------------------------------------------------------

//--------------------------------COMMENTS-------------------------------------------------
//1. В работе могут попадаться незакомментированные console.log, я проверял что на выходе буду получать
//2. Пытался сделать не только правильно ,но и визуально приятным. Немножно повспоминал CSS.
//3. Стилизацию можно было бы сократить в несколько раз. Но в основном задача не этом заключалась.
//4. Уверен что код можно еще оптимизировать и уменьшить, но я дошел пока что только до такого результа.
//-----------------------------------------------------------------------------------------


const usersMainDiv=document.getElementById('usersDiv')
fetch('https://jsonplaceholder.typicode.com/users')
    .then((response)=>response.json())
    .then(usersObj=>{
        for (const users of usersObj) {
            const divUser = document.createElement('div')
            const pUserId =document.createElement('p')
            const hUserName = document.createElement('h2')
            const linkUserInfo =document.createElement('a')
            divUser.classList.add('userBlock')
            linkUserInfo.classList.add('link-user-info')
            pUserId.innerText=`ID: ${users.id}`
            hUserName.innerText=`Name: ${users.name}`
            linkUserInfo.innerText='Details';
            linkUserInfo.onclick=function () {
                localStorage.setItem(`user`, JSON.stringify(users));
            }
            linkUserInfo.href="pages/user-details.html"
            divUser.append(pUserId,hUserName, linkUserInfo)
            usersMainDiv.appendChild(divUser)
        }
    })