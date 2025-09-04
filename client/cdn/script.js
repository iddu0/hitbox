var baseappurl = 'https://teamhitbox.github.io/hitbox/src/routes';

function piklload() {
    return new Promise((resolve,reject)=>{
        var modalbox = document.getElementsByClassName('pikl-maincontainer')[0];

        setTimeout(function() {
            var loadingicon = document.createElement('div');
            loadingicon.classList.add('pikl-loadingimg');

            // list of gifs
            var gifs = [
                "https://teamhitbox.github.io/hitbox/static/gif/180.gif",
                "https://teamhitbox.github.io/hitbox/static/gif/360.gif",
                "https://teamhitbox.github.io/hitbox/static/gif/thick360.gif"
            ];

            // pick random gif
            var chosen = gifs[Math.floor(Math.random() * gifs.length)];

            // put it inside loading div
            loadingicon.innerHTML = `<img src="${chosen}" alt="loading..." style="max-width:100%; height:auto; display:block; margin:0 auto;">`;

            modalbox.appendChild(loadingicon);

            setTimeout(function(){
                const windowelems = document.getElementsByClassName('pikl-window');
                for(var i =0, il = windowelems.length;i<il;i++){
                    windowelems[i].style.setProperty('--pikl-window-translate','0');
                }
                const taskbarelems = document.getElementsByClassName('pikl-taskbar')[0];
                taskbarelems.style.setProperty('--pikl-taskbar-translate','0');

                loadingicon.style.opacity = '0';
                setTimeout(function(){
                    console.log("Loaded!");
                    loadingicon.parentNode.removeChild(loadingicon);
                },300);
            },2000);
        },500);

        modalbox.innerHTML = `<div class="pikl-taskbar"><div class="pikl-piklicon"><img src="https://teamhitbox.github.io/hitbox/static/img/pickle.svg" width="30px" height="30px"></img></div></div>`;

        var jamlib = document.createElement('link');
        jamlib.rel = 'stylesheet';
        jamlib.href = 'https://teamhitbox.github.io/hitbox/client/cdn/jam/jam.min.css';
        document.head.appendChild(jamlib);

        fetch('https://teamhitbox.github.io/hitbox/client/cdn/apps.json')
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
