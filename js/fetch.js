const tag = (tag)=>document.querySelector(tag);
const blog = tag('.blog')
const h2type = tag('h2');
const login = tag('.login');
const register = tag('.register');
const formLogin = tag('.form-login');
const formRegister = tag('.form-register');

let apiServer = 'https://api-auth-two.vercel.app'
export async function Fetch(method, source, data={}, token) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if(token){
        myHeaders.append("Authorization", `Bearer ${token}` );

    }
    var raw = JSON.stringify(data);
    const options = {
        method: method,
        headers: myHeaders,
        body: method === "POST" ? raw : null,
        redirect: "follow",
    };
    try {
        const res = await fetch(
        `${apiServer}/${source}`,
        options
        );
        const data = await res.json();
        if(res.ok){
            return {res, data: data.data}
        }else{
            return {res, data: data.message}
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const renderBlog = (data)=>{
    const blogItem = document.createElement('div');
    blogItem.className= 'blog-item';

    const blogHeader = document.createElement('div');
    blogHeader.className = 'blog-item-header';

    const blogAvt = document.createElement('div');;
    blogAvt.className = 'blog-avt';
    let arrName = data.userId.name.split(' ');
    blogAvt.textContent = arrName[arrName.length-1].charAt(0).toUpperCase();
    blogHeader.append(blogAvt);

    const blogName = document.createElement('div');;
    blogName.className = 'blog-name';
    blogName.textContent = data.userId.name;
    blogHeader.append(blogName);

    blogItem.append(blogHeader)

    const blogBody = document.createElement('div');
    blogBody.className = 'blog-item-body';

    const blogTitle = document.createElement('div');;
    blogTitle.className = 'blog-title';
    blogTitle.textContent = data.title;
    blogBody.append(blogTitle);

    const blogContent = document.createElement('div');;
    blogContent.className = 'blog-content';
    blogContent.textContent = data.content;
    blogBody.append(blogContent);

    const blogTagId = document.createElement('div');;
    blogContent.className = 'blog-tagId';
    blogContent.textContent = data.content;
    blogBody.append(blogContent);

    blogItem.append(blogBody)

    blog.append(blogItem);

}
export function clickLogin(){
    register.classList.remove('active');
    login.classList.add('active');
    h2type.textContent = 'Login';
    formLogin.style.display = '';
    formRegister.style.display = 'none';
}
export function clickRegister(){
    login.classList.remove('active');
    register.classList.add('active');
    h2type.textContent = 'Register';
    formLogin.style.display = 'none';
    formRegister.style.display = 'block';
}

export function fnToken(){
    const tokens = JSON.parse(localStorage.getItem('token'));
    return{
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
    }
}
export default apiServer