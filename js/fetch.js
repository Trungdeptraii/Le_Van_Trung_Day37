const tag = (tag)=>document.querySelector(tag);
const blog = tag('.blog')
const h2type = tag('.type');
const login = tag('.login');
const register = tag('.register');
const formLogin = tag('.form-login');
const formRegister = tag('.form-register');
const toast = tag('.toast');
const toastBody = tag('.toast-body');
const loading = tag('.loading');

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
        redirect: "follow"
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
            toast.classList.add('active');
            toastBody.textContent = data.message;
            console.log(data.message)
            setTimeout(()=>{
                toast.classList.remove('active');
            }, 2000)
            return {res, data: data.message}
        }
    } catch (error) {
        console.log(error);
        if(loading.classList.contains('active')){
            loading.classList.remove('active');
        }
        return false;
    }
}

export const renderBlog = (data)=>{
    const timeRes = createTime(new Date(data.createdAt))
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

    const blogTime = document.createElement('div');
    blogTime.className = 'blog-date-time';

    const spanTimeNumber = document.createElement('span');
    spanTimeNumber.className = 'time-number';
    spanTimeNumber.textContent = timeRes.timeNumber;
    blogTime.append(spanTimeNumber);

    const spanTimeLetter = document.createElement('span');
    spanTimeLetter.className = 'time-letter'
    spanTimeLetter.textContent = timeRes.timeLetter;
    blogTime.append(spanTimeLetter);

    blogBody.append(blogTime);

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
function createTime(blog){
    const timeNow = new Date();
    const dayNow = timeNow.getDay();
    const hoursNow = timeNow.getHours();
    const minuteNow = timeNow.getMinutes();
    const secondsNow = timeNow.getSeconds();
    const dayBlog = blog.getDay();
    const hourseBlog = blog.getHours();
    const minuteBlog = blog.getMinutes();
    const secondsBlog = blog.getSeconds();
    let time;
    if(dayNow == dayBlog){
        if(hoursNow > hourseBlog){
            time = ` Khoảng ${hoursNow - hourseBlog} giờ trước `;
        }else if(hoursNow == hourseBlog){
            time = ` Khoảng ${minuteNow - minuteBlog} phút trước `;
        }else if(hoursNow == hourseBlog && minuteNow == minuteBlog){
            time = ` Khoảng ${secondsNow - secondsBlog} giây trước `;
        }
    }else if(dayNow > dayBlog){
        time = ` Khoảng ${dayNow - dayBlog} ngày trước `;
    }
    time = hoursNow > hourseBlog &&  dayNow == dayBlog ? ` Khoảng ${hoursNow - hourseBlog} giờ trước ` :   dayNow > dayBlog ? ` Khoảng ${dayNow - dayBlog} ngày trước ` : ''
    return({
        timeNumber: `${hourseBlog} giờ - ${minuteBlog} phút`,
        timeLetter: time
    }) 
}
export default apiServer