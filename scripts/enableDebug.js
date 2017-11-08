//use this to config the debug layer
const enableDebug = document.getElementById("enableDebug");

enableDebug.addEventListener("click", function() {
  if (scene) {
    if (scene.debugLayer.isVisible()) {
      scene.debugLayer.hide();
    } else {
      scene.debugLayer.show();
    }
  }
});
