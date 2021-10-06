export const getUsers = () => {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson)
      return resJson
    })
}
export const getPosts = (id) => {
  return fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(resJson => {
      console.log("posts",resJson)
      return resJson.filter(post => post.userId===id)
    })
}
export const addPosts = (post) => {
//   return fetch('https://jsonplaceholder.typicode.com/addPosts', {
//         method: 'POST',
//         body: JSON.stringify(post)
//   })
    // .then(res => res.json())
    // .then(resJson => {
      return post
    // })
}
