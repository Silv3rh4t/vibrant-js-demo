let v = new Vibrant("https://source.unsplash.com/random/");

var bodyS = document.getElementsByTagName('body')[0].style;
bodyS.background = 'url('+v._src+') no-repeat center center fixed';
bodyS["-webkit-background-size"] = "cover";

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
<div id="app">
    <div class="main">
        <%for(var i=0;i<6;i++){%>
            <div id="<%=opts[i]%>" class="col-4 blocks">
                <p><%=opts[i]%></p>
            </div>
            <div class="col-2"></div>            
        <%}%>
        </div>
    </div>
</div>
`;

let html = ejs.render(ejsCode, {opts:opts});
document.getElementsByTagName('body')[0].innerHTML += html; 

v.getPalette().then((palette) => {
    for(var i=0;i<6;i++){
        opt = opts[i];
        p = palette[opt];
        console.log(p);
        document.getElementById(opt).style.background = "rgba("+p.r+","+p.g+","+p.b+", 0.7)";
        document.getElementById(opt).style.color = p.titleTextColor;
    }
});

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

/*function enterPath(){
    path = prompt("Enter URL of image");
}*/
