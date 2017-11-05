var canvas, engine, createScene, scene, light, camera, sphere, box;

canvas = document.getElementById("renderCanvas");
engine = new BABYLON.Engine(canvas, true);

createScene = function () {
    scene = new BABYLON.Scene(engine);

    scene.clearColor = new BABYLON.Color3(0.85, 0.85, 0.85);
    
    scene.ambientColor = new BABYLON.Color3(0.75, 0.75, 0.75);
    
    camera = new BABYLON.ArcRotateCamera('camera1', 0, 0, 0, null, scene);
    
    camera.setPosition(new BABYLON.Vector3(0, 3000, -4000));
    
    //camera.setTarget(BABYLON.Vector3.Zero(0, 5000, 0));
    
    
    camera.panningSensibility = 1;
    
    camera.wheelPrecision = .1;

    camera.attachControl(canvas, false, true);

    light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    
    //import a test object 
    var meshVar = BABYLON.SceneLoader.ImportMesh("","scenes/31375_ElliotFabricMicrofiber2PieceSectionalSofa_Graphite/test/", "ElliotMicrofiber2PieceSectionalSofa.babylon", scene, function(newMeshes) {
      camera.setTarget = newMeshes[2];
        //create the custom textures    
        var graphite1 = new BABYLON.StandardMaterial("Graphite Fabric 1", scene);
        graphite1.diffuseTexture = new BABYLON.Texture("scenes/31375_ElliotFabricMicrofiber2PieceSectionalSofa_Graphite/test/fabric.dif.jpg", scene);
  
        newMeshes[2].material= graphite1;
  
        var darkBrownWood1 = new BABYLON.StandardMaterial("Dark Brown Wood 1", scene);
        darkBrownWood1.diffuseTexture = new BABYLON.Texture("scenes/31375_ElliotFabricMicrofiber2PieceSectionalSofa_Graphite/test/wood.dif.jpg", scene);
   
        newMeshes[1].material= graphite1;
        
       }); 
        
         //This is the debug layer 
  scene.debugLayer.show();
  BABYLON.DebugLayer.InspectorURL = 'http://myurl/babylon.inspector.bundle.js';
      
    return scene;
};

var scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function() {
  engine.resize();
});