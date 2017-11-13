if (BABYLON.Engine.isSupported()) {
  const canvas = document.getElementById("renderCanvas");
  const engine = new BABYLON.Engine(canvas, true, { stencil: true });

  //create the inputElement for DOM to interact with Babylon
  const inputElement = document.getElementById("fileUpload");

  inputElement.addEventListener(
    "change",
    function handleFiles(event) {
      const fileList = this.files[0];
      const reader = new FileReader();

      reader.addEventListener("loadend", () => {
        let data = reader.result;

        //loads a new babylon scene file
        BABYLON.SceneLoader.Load(
          "",
          "data:" + data,
          engine,
          function(newScene) {
            // Wait for textures and shaders to be ready
            newScene.executeWhenReady(function() {
              var camera = new BABYLON.ArcRotateCamera(
                "ArcRotateCamera",
                0,
                0,
                0,
                BABYLON.Vector3.Zero(),
                newScene
              );
              camera.setPosition(new BABYLON.Vector3(5, 50, -450));
              newScene.activeCamera = camera;
              newScene.activeCamera.attachControl(canvas);
              newScene.clearColor = new BABYLON.Color3(1, 1, 1);

              camera.panningSensibility = 10;

              camera.wheelPrecision = 1;

              let light0 = new BABYLON.HemisphericLight(
                "Hemi0",
                new BABYLON.Vector3(0, 1, 0),
                newScene
              );
              light0.intensity = 0.4;
              light0.diffuse = new BABYLON.Color3(1, 1, 1);
              light0.specular = new BABYLON.Color3(0, 0, 0);
              light0.groundColor = new BABYLON.Color3(0, 0, 0);

              const enableDebug = document.getElementById("enableDebug");

              const newMeshes = newScene.meshes;

              newMeshes[0].scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
              newMeshes[0].position.y = 0;
              camera.setTarget = newMeshes[2];

              //enables the scene debugger
              enableDebug.addEventListener("click", function() {
                if (newScene) {
                  if (newScene.debugLayer.isVisible()) {
                    newScene.debugLayer.hide();
                  } else {
                    newScene.debugLayer.show({
                      initialTab: 4
                    });
                  }
                }
              });

              // Once the scene is loaded, just register a render loop to render it
              engine.runRenderLoop(function() {
                newScene.render();
              });
              //resizes the window
              window.addEventListener("resize", () => {
                engine.resize();
              });
            });
          },
          function(progress) {}
        );
      });
      reader.readAsText(fileList);
    },
    false
  );
}

//highlight mesh example
/* var hl = new BABYLON.HighlightLayer("hl1", newScene);

              let pickedMeshes = [];
              window.addEventListener("click", () => {
                var pickResult = newScene.pick(
                  newScene.pointerX,
                  newScene.pointerY
                );
                if (pickResult.hit) {
                  if (pickedMeshes.indexOf(pickResult.pickedMesh.name) < 0) {
                    hl.addMesh(pickResult.pickedMesh, BABYLON.Color3.Green());
                    pickedMeshes.push(pickResult.pickedMesh.name);
                  } else if (
                    pickedMeshes.indexOf(pickResult.pickedMesh.name) > 0
                  ) {
                    hl.addMesh(pickResult.pickedMesh, BABYLON.Color3.Green());
                    pickedMeshes.push(pickResult.pickedMesh.name);
                  } else {
                    hl.removeMesh(pickResult.pickedMesh);
                    pickedMeshes.splice(
                      pickedMeshes.indexOf(pickResult.pickedMesh.name),
                      1
                    );
                  }
                }
                console.log(pickedMeshes);
              }); */
