var canvas,
  engine,
  createScene,
  scene,
  light,
  camera,
  sphere,
  box,
  r,
  g,
  b,
  inputElement,
  fileList,
  reader;

r = 184 / 255;
g = 184 / 255;
b = 184 / 255;

canvas = document.getElementById("renderCanvas");

engine = new BABYLON.Engine(canvas, true);

createScene = function() {
  scene = new BABYLON.Scene(engine);

  scene.clearColor = new BABYLON.Color3(0.85, 0.85, 0.85);

  scene.ambientColor = new BABYLON.Color3(0.75, 0.75, 0.75);
  camera = new BABYLON.ArcRotateCamera(
    "ArcRotateCamera",
    1,
    0.8,
    10,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );

  camera.setPosition(new BABYLON.Vector3(0, 400, -300));

  scene.activeCamera.alpha += 0.01;

  //camera.setTarget(BABYLON.Vector3.Zero(0, 5000, 0));

  camera.panningSensibility = 5;

  camera.wheelPrecision = 1;

  camera.attachControl(canvas, false, true);

  light = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  light.intensity = 0.7;

  inputElement = document.getElementById("fileUpload");

  inputElement.addEventListener(
    "change",
    function handleFiles(event) {
      fileList = this.files[0];
      reader = new FileReader();

      reader.addEventListener("loadend", function() {
        var data = reader.result;
        // The first parameter can be used to specify which mesh to import. Here we import all meshes
        var importedScene = BABYLON.SceneLoader.ImportMesh(
          "",
          "",
          "data:" + data,
          scene,
          function(newMeshes) {
            //newMeshes[0].scaling.x = .1;
            //Mesh comes in to large.  Use this to scale the mesh down
            newMeshes[0].scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
            newMeshes[0].position.y = 0;
            //newMeshes[0].positiion = new BABYLON.Vector3(0,0,0);
            camera.setTarget = newMeshes[2];
          }
        );
      });
      reader.readAsText(fileList);
    },
    false
  );

  //This is the debug layer.  Disable it upon completion.
  scene.debugLayer.show();
  BABYLON.DebugLayer.InspectorURL = "http://myurl/babylon.inspector.bundle.js";

  return scene;
};

/* function resetScene(){
  for(var index = scene.meshes.length -1;index >=0; index--){
      var m = this.scene.meshes[0];
      if(!m)
      continue;
      m.dispose();
  }
  return resetScene;
} */

var scene = createScene();

engine.runRenderLoop(function() {
  scene.render();
});

window.addEventListener("resize", function() {
  engine.resize();
});
