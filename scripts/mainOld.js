var canvas, engine, createScene, scene, light, camera, sphere, box;

 canvas = document.querySelector("#renderCanvas");

 engine = new BABYLON.Engine(canvas, true);

 createScene = function() {
  scene = new BABYLON.Scene(engine);

  scene.clearColor = new BABYLON.Color3(0.85, 0.85, 0.85);

  scene.ambientColor = new BABYLON.Color3(0.75, 0.75, 0.75);

  //var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

  camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 10, new BABYLON.Vector3.Zero(0, 0, 0), scene);

  //camera.radius = 5000;

  camera.setPosition(new BABYLON.Vector3(0, 5000, -10));

  camera.setTarget(BABYLON.Vector3.Zero(0, 5000, 0));

  camera.attachControl(canvas, true);

  camera.wheelPrecision = .1;

  light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

  light.intensity = 1.6;

  //sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 500, scene);

  //var box = BABYLON.Mesh.CreateBox("box", 6.0, scene, false, BABYLON.Mesh.DEFAULTSIDE);

  //sphere.position.y = 1;

  //var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

   var meshVar = BABYLON.SceneLoader.ImportMesh("","scenes/31375_ElliotFabricMicrofiber2PieceSectionalSofa_Graphite/test/", "ElliotMicrofiber2PieceSectionalSofa.babylon", scene, function(newMeshes) {
      camera.target = newMeshes[2];
     
      //create the custom textures    
      var graphite1 = new BABYLON.StandardMaterial("Graphite Fabric 1", scene);
      graphite1.diffuseTexture = new BABYLON.Texture("scenes/31375_ElliotFabricMicrofiber2PieceSectionalSofa_Graphite/test/fabric.dif.jpg", scene);

      newMeshes[2].material= graphite1;

      var darkBrownWood1 = new BABYLON.StandardMaterial("Dark Brown Wood 1", scene);
      darkBrownWood1.diffuseTexture = new BABYLON.Texture("scenes/31375_ElliotFabricMicrofiber2PieceSectionalSofa_Graphite/test/wood.dif.jpg", scene);
 
      newMeshes[1].material= graphite1;
      
     }
        
  ); 
   

  //sphere.dispose();
  
  //This is the debug layer 
  scene.debugLayer.show();
  BABYLON.DebugLayer.InspectorURL = 'http://myurl/babylon.inspector.bundle.js';

  

  return scene;
};

scene = createScene();

engine.runRenderLoop(function() {
  scene.render();
});

window.addEventListener("resize", function() {
  engine.resize();
});


































 /* // This creates a 2D gui overlay
   var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
   advancedTexture.idealWidth = 600;
   
   var rect1 = new BABYLON.GUI.Rectangle();
   rect1.width = 0.2;
   rect1.height = "40px";
   rect1.cornerRadius = 2;
   rect1.color = "Orange";
   rect1.thickness = 4;
   rect1.background = "green";
   advancedTexture.addControl(rect1);
   rect1.linkWithMesh(sphere);   
   rect1.linkOffsetY = -50;

   var label = new BABYLON.GUI.TextBlock();
   label.text = "Sphere";
   rect1.addControl(label);

   var target = new BABYLON.GUI.Ellipse();
   target.width = "40px";
   target.height = "40px";
   target.color = "Orange";
   target.thickness = 4;
   target.background = "green";
   advancedTexture.addControl(target);
   rect1.linkWithMesh = meshVar;  

   var line = new BABYLON.GUI.Line();
   line.lineWidth = 4;
   line.color = "Orange";
   line.y2 = 20;
   line.linkOffsetY = -20;
   advancedTexture.addControl(line);
   line.linkWithMesh(sphere); 
   line.connectedControl = rect1;   */
