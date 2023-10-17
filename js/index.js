import * as client from './fetch.js';
let user, blogs;
const tag = (tag)=>document.querySelector(tag);
const overlay = tag('.overlay');
const blog = tag('.blog')
const btn = tag('.btn-header');
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
const post = tag('.post');
const postForm = tag('.posts');
const loading = tag('.loading');
const toastBody = tag('.toast-body');
const toast = tag('.toast');


window.addEventListener('load', async ()=>{
    loading.classList.add('active');
    let {res, data} = await client.Fetch('GET', 'blogs');
    if(res.ok){
        blogs = data;
        console.log(data)
        loading.classList.remove('active');
        data.forEach(el=>client.renderBlog(el))
    }else{
        loading.classList.remove('active');
    }
})

login.onclick = function(){
    client.clickLogin();
}
register.onclick = function(){
    client.clickRegister();
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
    loading.classList.add('active');
    const email = tag('.login-email').value;
    const password = tag('.login-password').value;
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
            userName.textContent = name;
            loading.classList.remove('active');

        }else{
            loading.classList.remove('active');
        }
    }
})

formRegister.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const email = tag('.register-email').value;
    const name = tag('.register-name').value;
    const password = tag('.register-password').value;
    if(email && password && name){
        loading.classList.add('active');
        const {res, data} = await client.Fetch('POST', 'auth/register', {email, password, name});
        if(res.ok){
            toastBody.textContent = 'Tạo tài khoản thành công'
            toast.classList.add('active');
            client.clickLogin();
            setTimeout(()=>{
                toast.classList.remove('active');
            }, 1500);
            loading.classList.remove('active');
        }else{
            console.log(res)
            
        }
    }
})
logout.onclick = async ()=>{
    loading.classList.add('active');
    let token = client.fnToken();
    const {res} = await client.Fetch('POST','logout', {}, token.accessToken );
    if(res.ok){
        localStorage.removeItem('token');
        userEl.style.display = 'none';
        btn.style.display = 'flex';
        user = undefined;
        loading.classList.remove('active');
    }else{
        console.log(res);
        loading.classList.remove('active');
    }
    post.style.display = 'none';
}
create.onclick = ()=>{
    post.style.display = 'block';
}
postForm.addEventListener('submit',async (e)=>{
    e.preventDefault();
    let token = client.fnToken();
    const title = tag('.posts-title').value;
    const content = tag('.posts-content').value;
    const dateTime = tag('#datepicker').value;
    console.log('dateTime', dateTime)
    const z = new Date(dateTime);
    console.log({title, content, date: z})
    let {res, data} = await client.Fetch('POST', 'blogs', {title, content}, token.accessToken)
    if(res.ok){
        blog.textContent = '';
        let {res, data} = await client.Fetch('GET', 'blogs');
        if(res.ok){
            blogs = data;
            loading.classList.remove('active');
            data.forEach(el=>client.renderBlog(el))
        }else{
            loading.classList.remove('active');
        }
        }else{
            console.log(res)
        }
})