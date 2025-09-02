var baseappurl = 'https://picklebox';
function piklload() {
    return new Promise((resolve,reject)=>{
        var modalbox = document.getElementsByClassName('pikl-maincontainer')[0];
        setTimeout(function() {
            var loadingicon = document.createElement('div');
            loadingicon.classList.add('pikl-loadingimg');
            loadingicon.innerHTML = `<?xml version="1.0" encoding="utf-8"?><svg viewBox="-10 -10 530 530" width="512" height="512" xmlns="http://www.w3.org/2000/svg"><path style="opacity: 0.992; stroke: rgb(34, 197, 94); fill: none;" d="M 385.5,-0.5 C 394.167,-0.5 402.833,-0.5 411.5,-0.5C 464.616,8.4488 496.116,39.4488 506,92.5C 507.75,110.168 506.084,127.501 501,144.5C 496.485,158.188 491.985,171.855 487.5,185.5C 488.873,185.343 490.207,185.51 491.5,186C 501.295,190.782 507.962,198.282 511.5,208.5C 511.5,213.833 511.5,219.167 511.5,224.5C 504.233,243.974 490.233,251.808 469.5,248C 466.246,246.973 463.246,245.473 460.5,243.5C 451.333,259.171 441.667,274.504 431.5,289.5C 443.96,303.171 445.793,318.171 437,334.5C 427.764,345.802 415.93,349.969 401.5,347C 397.408,345.483 393.408,344.149 389.5,343C 363.046,372.634 333.712,398.8 301.5,421.5C 308.977,440.233 304.31,455.067 287.5,466C 271.652,472.432 257.986,469.432 246.5,457C 245.5,456.333 244.5,456.333 243.5,457C 223.089,467.706 202.089,477.04 180.5,485C 180.604,497.696 174.938,506.529 163.5,511.5C 159.5,511.5 155.5,511.5 151.5,511.5C 145.015,508.857 139.848,504.524 136,498.5C 83.3309,509.984 42.3309,493.318 13,448.5C 6.36996,436.106 1.86996,423.106 -0.5,409.5C -0.5,399.833 -0.5,390.167 -0.5,380.5C 6.86098,340.622 28.861,311.789 65.5,294C 148.44,273.67 212.94,227.836 259,156.5C 275.736,128.355 288.069,98.3547 296,66.5C 314.304,28.6879 344.137,6.3546 385.5,-0.5 Z"/></svg>`;
            modalbox.appendChild(loadingicon);
            setTimeout(function(){
                const windowelems = document.getElementsByClassName('pikl-window');
                for(var i =0, il = windowelems.length;i<il;i++){
                    windowelems[i].style.setProperty('--pikl-window-translate','0');
                }
                const taskbarelems = document.getElementsByClassName('pikl-taskbar')[0];
                taskbarelems.style.setProperty('--pikl-taskbar-translate','0');
                loadingicon.style.opacity = '0';
                loadingicon.style.width = '400px';
                loadingicon.style.height = '400px';
                loadingicon.style.padding = '90px';
                setTimeout(function(){
                    console.log("Loaded!");
                    loadingicon.parentNode.removeChild(loadingicon);
                },300);
            },2000);
        },500);
		modalbox.innerHTML = `<div class="pikl-taskbar"><div class="pikl-piklicon"><img src="./cdn/pickle.svg" width="30px" height="30px"></img></div></div>`;
        var jamlib = document.createElement('link');
        jamlib.rel = 'stylesheet';
        jamlib.href = './cdn/jam/jam.min.css'
        document.head.appendChild(jamlib);
        fetch('./cdn/apps.json')
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                var taskbar = document.getElementsByClassName('pikl-taskbar')[0];
                var window = document.createElement('div');
                var div = document.createElement('div');
                var app = document.createElement('span');
                var tooltip = document.createElement('div');
                tooltip.classList.add('pikl-tasktooltip');
                tooltip.innerHTML = data[i].displayname + `<div></div>`;
                window.classList.add('pikl-window');
                window.id = 'pikl-' + data[i].displayname.toLowerCase() + 'win';
                switch(data[i].status) {
                    case 'running':
                        var frame = document.createElement('iframe');
                        frame.classList.add('pikl-appframe');
                        window.appendChild(frame);
                        break;
                    case 'dev':
                        window.innerHTML = `<div class='pikl-devalert'><h1>This service is in development.</h1>This service is in development. Our team is tirelessly working to bring you this feature and it will be out soon. Check back later or follow our github for updates.</div>`;
                        break;
                    case 'down':
                        window.innerHTML = `<div class='pikl-downalert'><h1>This service is currently down.</h1>This service is currently down. The servers for this service are currently not functioning properly. Don't worry, your data won't be deleted. Just check back later when we fix the issue.</div>`;
                        break;
                }
                div.classList.add('pikl-taskicon');
                app.classList.add('jam');
                app.classList.add(data[i].icon);
                taskbar.appendChild(div);
                div.appendChild(app);
                div.appendChild(tooltip);
                modalbox.appendChild(window);
                document.getElementById('pikl-homewin').classList.add('active');
                taskbar.getElementsByClassName('jam-home')[0].parentNode.classList.add('active');
                var theframe = document.querySelector('#pikl-' + data[i].displayname.toLowerCase() + 'win > .pikl-appframe');
                theframe.src = 'https://edupoint.com/';
                theframe.contentDocument.location = baseappurl + data[i].url;
                div.addEventListener('mouseenter', (event) => {
                    if(event.target.classList.contains('pikl-taskicon')) {
                        event.target.lastChild.style.setProperty('--tw-scale-x','1');
                        event.target.lastChild.style.setProperty('--tw-scale-y','1');
                    } else {
                        event.target.parentNode.lastChild.style.setProperty('--tw-scale-x','1');
                        event.target.parentNode.lastChild.style.setProperty('--tw-scale-y','1');
                    }
                });
                div.addEventListener('mouseleave', (event) => {
                    if(event.target.classList.contains('pikl-taskicon')) {
                        event.target.lastChild.style.setProperty('--tw-scale-x','0');
                        event.target.lastChild.style.setProperty('--tw-scale-y','0');
                    } else {
                        event.target.parentNode.lastChild.style.setProperty('--tw-scale-x','0');
                        event.target.parentNode.lastChild.style.setProperty('--tw-scale-y','0');
                    }
                });
                div.addEventListener('click',(event) => {
                    document.getElementsByClassName('pikl-window active')[0].classList.remove('active');
                    document.getElementById('pikl-' + data[i].displayname.toLowerCase() + 'win').classList.add('active');
                    if(event.target.classList.contains('pikl-taskicon')) {
                        document.getElementsByClassName('pikl-taskicon active')[0].classList.remove('active');
                        event.target.classList.add('active');
                    } else {
                        document.getElementsByClassName('pikl-taskicon active')[0].classList.remove('active');
                        event.target.parentNode.classList.add('active');
                    }
                })
                var pickleminimizebtn = document.getElementsByClassName('pikl-piklicon')[0];
                pickleminimizebtn.addEventListener('click',(event) => {
                    var piklbtn;
                    const windowelems = document.getElementsByClassName('pikl-window');
                    const taskbarelems = document.getElementsByClassName('pikl-taskbar')[0];
                    if(event.target.classList.contains('pikl-piklicon')) {
                        piklbtn = event.target;
                    } else {
                        piklbtn = event.target.parentNode;
                    }
                    if (document.body.classList.contains('pikl-winmaximized')) {
                        for(var i =0, il = windowelems.length;i<il;i++){
                            windowelems[i].style.setProperty('--pikl-window-scale','0');
                        }
                        taskbarelems.classList.add('minimized');
                        document.body.classList.remove('pikl-winmaximized');
                    } else {
                        for(var i =0, il = windowelems.length;i<il;i++){
                            windowelems[i].style.setProperty('--pikl-window-scale','1');
                        }
                        taskbarelems.classList.remove('minimized');
                        document.body.classList.add('pikl-winmaximized');
                    }
                });
            }
        });
        document.body.classList.add('pikl-winmaximized');
        resolve();
    });
}
async function piklinit() {
    var modalbox = document.createElement('div');
    modalbox.classList.add('pikl-maincontainer');
    document.body.appendChild(modalbox);
    await piklload();
    console.log('PickleHub is loading...');
}
piklinit();
