var bgurl = "";
fetch('https://source.unsplash.com/random/', {method: 'HEAD'}).then(r => {
    bgurl = r.url;
});

var bodyS = document.getElementsByTagName('body')[0].style;
var style = document.documentElement.style;

var opts = [
    "DarkVibrant",
    "DarkMuted",
    "Vibrant",
    "Muted",
    "LightVibrant",
    "LightMuted"
];
var ejsCode = `
<%for(var i=0;i<6;i++){%>
    <div id="<%=opts[i]%>" class="col-5 col-lg-4 blocks">
        <p><%=opts[i]%></p>
        <div class="colorTitle" id="<%=opts[i]%>Hex"></div>
    </div>
    <div class="col-2"></div>            
<%}%>
`;

let html = ejs.render(ejsCode, {opts:opts});
document.getElementById('main').innerHTML += html; 
setTheme("https://source.unsplash.com/random/");

var v;

function setTheme(url){
    v = new Vibrant(url);
    setBG();
    v.getPalette().then((palette) => {
        for(var i=0;i<6;i++){
            opt = opts[i];
            p = palette[opt];
            document.getElementById(opt).style.background = "rgba("+p.r+","+p.g+","+p.b+", 0.7)";
            document.getElementById(opt).style.color = p.titleTextColor;
            document.getElementById(opt+"Hex").innerHTML = p.hex;
            document.getElementById(opt+"Hex").style.background = p.hex;
        }
    });
    
}

function setBG(){
    bodyS.background = 'url('+v._src+') no-repeat center center fixed';
    bodyS["-webkit-background-size"] = "cover";
}

function toggleMode(){
    if(presentTheme === themePaletteDark){
        presentTheme = themePaletteLight;
        document.getElementById("app").style.background = "rgba(0,0,0,0)";
        console.log("light");
    }else{
        presentTheme = themePaletteDark;
        document.getElementById("app").style.background = "rgba(0,0,0,0.6)";
        console.log("dark");
    }
    setTheme();
}

var form = document.getElementById("uploadForm");
form.addEventListener('submit', enterPath);

function enterPath(e){
    e.preventDefault();
    var path = document.getElementById("urlEnter").value;
    if(path){
        var pattern = new RegExp('^(https?:\\/\\/)?'+ 
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ 
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
        '(\\?[;&amp;a-z\\d%_.~+=-]*)?'+ 
        '(\\#[-a-z\\d_]*)?$','i');
        if(pattern.test(path)){
            setTheme(path);
        } else enterPath();
    } else {
        var localURL = URL.createObjectURL(document.querySelector('input[type=file]')['files'][0]);
        setTheme(localURL);
    }
}

function formManager(){
    if(document.getElementById("urlEnter").value.length != 0){
        document.getElementById("fileEnter").disabled = true;
        document.getElementById("fileEnter").value = null;
    } else {
        document.getElementById("fileEnter").disabled = false;
    }
}

function formError(err){
    document.querySelector("#errMsg").innerHTML = err;
}

var nightMode = false;

function nightModeToggle(){
    var app = document.querySelector("#app");
    if(nightMode){
        nightMode = false;
        app.style.background = "rgba(0,0,0,0)";
        event.srcElement.innerHTML = "<i class='fa fa-moon-o'></i>";
    } else {
        nightMode = true;
        app.style.background = "rgba(0,0,0,0.5)";
        event.srcElement.innerHTML = "<i class='fa fa-sun-o'></i>";
    }
}