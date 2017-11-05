/* 

// Set the width of the side navigation to 250px 
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

// Set the width of the side navigation to 0 
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
} */

//function will open and close the intially hidden menu bar

function togNav() {
    var nav = document.getElementById("mySidenav");
    if (nav.style.width == '250px') {
      nav.style.width = '0';
      nav.style.opacity = 0;
    } else {
      nav.style.width = "250px";
      nav.style.opacity = 1;
    }
  }