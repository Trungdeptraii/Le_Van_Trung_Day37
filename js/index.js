import * as client from './fetch.js';
let user;
const tag = (tag)=>document.querySelector(tag);
const overlay = tag('.overlay');
const btn = tag('.btn');
const userEl = tag('.user');
const userName = tag('.user-name');
const userAvt = tag('.user-avt');
const logout = tag('.logout');
const login = tag('.login');
const register = tag('.register');
const btnLogin = tag('.btn-login');
const btnRegister = tag('.btn-register');
const btnExitLogin = tag('.btn-exit-login');
const btnExitRegister = tag('.btn-exit-register');
const create = tag('.create-post');
const formLogin = tag('.form-login');
const formRegister = tag('.form-register');
const notiLogin = tag('.noti-login');
const notiRegister = tag('.noti-register');
const post = tag('.post');
const postForm = tag('.posts');

window.addEventListener('load', async ()=>{
    let {res, data} = await client.Fetch('GET', 'blogs');
    if(res.ok){
        console.log(data)
        let dataReverse = data.reverse();
        console.log(dataReverse)
        dataReverse.forEach(el=>client.renderBlog(el))
    }
})

login.onclick = function(){
    register.classList.remove('active');
    login.classList.add('active');
    h2type.textContent = 'Login';
    formLogin.style.display = '';
    formRegister.style.display = 'none';
}
register.onclick = function(){
    
}
btnLogin.onclick = ()=>{
    overlay.style.display = 'flex';
    client.clickLogin();
}
btnRegister.onclick = ()=>{
    overlay.style.display = 'flex';
    client.clickRegister();
}
btnExitLogin.onclick = ()=>{
    overlay.style.display = 'none';
}
btnExitRegister.onclick = ()=>{
    overlay.style.display = 'none';
}
formLogin.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const email = tag('.login-email').value;
    const password = tag('.login-password').value;
    console.log(email, password)
    if(email && password){
        const {res, data} = await client.Fetch('POST', 'auth/login', {email, password});
        if(res.ok){
            let {name, refreshToken, accessToken} = data;
            user = name;
            localStorage.setItem('token', JSON.stringify({refreshToken, accessToken}));
            overlay.style.display = 'none';
            userEl.style.display = 'flex';
            btn.style.display = 'none';
            userAvt.textContent = name.charAt(0).toUpperCase();
            userName.textContent = name

        }else{
            notiLogin.textContent = data
        }
    }
})

formRegister.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const email = tag('.register-email').value;
    const name = tag('.register-name').value;
    const password = tag('.register-password').value;
    if(email && password && name){
        const {res, data} = await client.Fetch('POST', 'auth/register', {email, password, name});
        if(res.ok){
            console.log(data)
        }else{
            notiRegister.textContent = data
        }
    }
})
logout.onclick = async ()=>{
    let token = client.fnToken();
    const {res} = await client.Fetch('POST','logout', {}, token.accessToken );
    if(res.ok){
        localStorage.removeItem('token');
        userEl.style.display = 'none';
        btn.style.display = 'flex';
        user = undefined;
    }else{
        console.log(res)
    }
}
create.onclick = ()=>{
    post.style.display = 'block';
}
postForm.addEventListener('submit',async (e)=>{
    e.preventDefault();
    let token = client.fnToken();
    const title = tag('.posts-title').value;
    const content = tag('.posts-content').value;
    let {res, data} = await client.Fetch('POST', 'blogs', {title, content}, token.accessToken)
    if(res.ok){
        console.log(data)
        data = data.reverse();
        console.log(data)
        data.forEach(el=>client.renderBlog(el))
    }else{
        console.log(res)
    }
})