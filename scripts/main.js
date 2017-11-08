const canvas = document.getElementById("renderCanvas"); // Get the canvas element

const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

/******* Add the create scene function ******/
const createScene = () => {
  // Create the scene space
  let scene = new BABYLON.Scene(engine);

  //allows for the use of simple rgb values in the scene
  const r = 184 / 255;
  const g = 184 / 255;
  const b = 184 / 255;

  scene.clearColor = new BABYLON.Color3(0.85, 0.85, 0.85);

  scene.ambientColor = new BABYLON.Color3(0.75, 0.75, 0.75);

  // Add a camera to the scene and attach it to the canvas
  let camera = new BABYLON.ArcRotateCamera(
    "Camera",
    Math.PI / 2,
    Math.PI / 2,
    10,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);

  camera.setPosition(new BABYLON.Vector3(5, 1, -10));

  camera.wheelPrecision = 5;

  // Add lights to the scene
  light = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  light.intensity = 0.7;

  //import a file from a local directory
  const inputElement = document.getElementById("fileUpload");

  inputElement.addEventListener(
    "change",
    function handleFiles(event) {
      let fileList = this.files[0];
      let reader = new FileReader();

      reader.addEventListener("loadend", function() {
        let data = reader.result;
        // The first parameter can be used to specify which mesh to import. Here we import all meshes
        BABYLON.SceneLoader.ImportMesh("", "", "data:" + data, scene, function(
          newMeshes
        ) {
          //newMeshes[0].scaling.x = .1;
          //Mesh comes in to large.  Use this to scale the mesh down
          newMeshes[0].scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
          newMeshes[0].position.y = 0;
          //newMeshes[0].positiion = new BABYLON.Vector3(0,0,0);
          camera.setTarget = newMeshes[0];
        });
      });
      reader.readAsText(fileList);
    },
    false
  );

  return scene;
};

/******* End of the create scene function ******/

let scene = createScene(); //Call the createScene function

engine.runRenderLoop(() => {
  // Register a render loop to repeatedly render the scene
  scene.render();
});

window.addEventListener("resize", () => {
  // Watch for browser/canvas resize events
  engine.resize();
});
