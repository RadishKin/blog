console.log("load foo js")

if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker.register('/sw.js', {
				scope: '/'
			})
			.then(function(registration) {
				// 注册成功
				console.log('ServiceWorker registration successful with scope: ', registration.scope)
			})
			.catch(function(err) {
				// 注册失败:(
				console.log('ServiceWorker registration failed: ', err)
			})
	})
}

fetch("https://v1.hitokoto.cn/?c=a").then(res => {
    return res.json()
}).then(res => {
    try {
        if(res.from_who===null){
            
            document.getElementById("oneword").innerText = res.hitokoto+"     ————《"+res.from+"》"
        }else{
            document.getElementById("oneword").innerText = res.hitokoto+"     ————"+res.from_who+"《"+res.from+"》"
        }
        console.log(res.hitokoto)
      } catch(err) {}
    try{
        document.getElementById("busuanzi_container_site_uv").innerText = res.uv
    }catch(err){}
    try{
        document.getElementById("busuanzi_container_site_pv").innerText = res.total
    }catch(err){}
})


let parm1 = ''
if (document.cookie.indexOf("uv=false") == -1) {
    parm1 = "&uv=true"
    var t = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
    document.cookie = "uv=false; expires=" + t.toGMTString() + ";path=/";
}
fetch("https://analytics.radishkin.workers.dev/api?url=" + window.btoa(location.href) + parm1).then(res => {
    return res.json()
}).then(res => {
    try {
        document.getElementById("busuanzi_value_page_pv").innerText = res.pv
      } catch(err) {}
    try{
        document.getElementById("busuanzi_container_site_uv").innerText = res.uv
    }catch(err){}
    try{
        document.getElementById("busuanzi_container_site_pv").innerText = res.total
    }catch(err){}
})
