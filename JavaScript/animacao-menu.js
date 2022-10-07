// Visual da pagina
window.onload = function(){
    //making sure burger is at 0 initially
    document.getElementsByClassName("burger")[0].style.left = "0px";
    //Btn on click
    document.getElementById("burgerBtn").onclick = function(){
    //If burger is 0px left...i.e initial...show the CMenu.
        if(document.getElementsByClassName("burger")[0].style.left === "0px"){
            show();
        }
        //else hide the CMenu i.e. when already shown.
        else{
            hide();
        }
    };
    //On click on CMain body hide CMenu.
    document.getElementsByClassName("CMain")[0].onclick = function(){
        if(document.getElementsByClassName("burger")[0].style.left == "200px"){
            hide();
        }
    }
    //testing ... just testing...nothing
    document.getElementsByClassName("burger")[0].ondragstart = function(){
        this.style.opacity = "0";
    }
    document.getElementsByClassName("burger")[0].ondragend = function(){
        this.style.opacity = "1";
    }//testing
    //show method...get and change
    function show(){
        document.getElementById("burgerBtn").innerHTML = "x";
        document.getElementById("body").style.overflow = "hidden";
        document.getElementsByClassName("CMain")[0].style.transform = "translate(200px,0)";
        document.getElementsByClassName("CMain")[0].style.opacity = "0.5";
        document.getElementsByClassName("burger")[0].style.left = "200px";
        document.getElementsByClassName("CMenu")[0].style.left = "0";
    }
    //hide method similar.
    function hide(){
        document.getElementById("burgerBtn").innerHTML = "≡";
        document.getElementsByClassName("CMain")[0].style.transform = "translate(0,0)";
        document.getElementsByClassName("CMain")[0].style.opacity = "1";
        document.getElementsByClassName("burger")[0].style.left = "0px";
        document.getElementsByClassName("CMenu")[0].style.left = "-200px";
        document.getElementById("body").style.overflow = "visible";
    } 
}