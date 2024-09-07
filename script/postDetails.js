// ------------------------------------------------PAGE THREE------------------------------------------------
// Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// Нижчє інформаці про пост, вивести всі коментарі поточного поста
// (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
//------------------------------------------------------------------------------------------------------------
const postInfo = JSON.parse(localStorage.getItem('post'))
const mainDiv = document.getElementById('postDetailsDiv')
const fullPost = document.createElement('div')
// console.log(postInfo)
for (const post in postInfo) {
    const pPost = document.createElement('p')
    fullPost.classList.add('fullPostDiv')
    pPost.classList.add('pPost')
    pPost.innerHTML=`
    <b>${post}</b>: ${postInfo[post]}
    `
    fullPost.appendChild(pPost)
}
mainDiv.appendChild(fullPost)
// console.log(postInfo.id)
const sectionComments = document.createElement('section')
fetch(`https://jsonplaceholder.typicode.com/posts/${postInfo.id}/comments`)
    .then((response)=>response.json())
    .then(postComments=>{
        for (const comment of postComments) {
            const commentDiv = document.createElement('div')
            commentDiv.classList.add('commentDiv')
            for (const commentKey in comment) {
                const commentP = document.createElement('p')
                commentP.classList.add('commentP')
                commentP.innerHTML=`
                <b>${commentKey}</b>: ${comment[commentKey]}
                `
                commentDiv.appendChild(commentP)
                sectionComments.appendChild(commentDiv)
            }
        }
        mainDiv.appendChild(sectionComments)
    })
