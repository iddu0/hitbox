(async function(){
    var jselem = document.createElement('script');
    await fetch('https://teamhitbox.github.io/hitbox/client/cdn/script.js')
	.then((response) => response.text())
	.then((data) => {
		jselem.innerHTML = data;
	});
    document.body.appendChild(jselem);
    var csselem = document.createElement('style');
    await fetch('https://teamhitbox.github.io/hitbox/client/cdn/style.css')
	.then((response) => response.text())
	.then((data) => {
		csselem.innerHTML = data;
	});
    document.head.appendChild(csselem);
})();
