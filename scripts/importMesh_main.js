//this is the importMesh variation of loading a babylon.js scene

const canvas = document.getElementById('renderCanvas');

const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {
	const r = 184 / 255;
	const g = 184 / 255;
	const b = 184 / 255;

	const scene = new BABYLON.Scene(engine);

	scene.clearColor = new BABYLON.Color3(0.85, 0.85, 0.85);

	scene.ambientColor = new BABYLON.Color3(0.75, 0.75, 0.75);
	let camera = new BABYLON.ArcRotateCamera('ArcRotateCamera', 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);

	camera.setPosition(new BABYLON.Vector3(5, 50, -450));

	scene.activeCamera.alpha += 0.01;

	//camera.setTarget(BABYLON.Vector3.Zero(0, 5000, 0));

	camera.panningSensibility = 5;

	camera.wheelPrecision = 1;

	camera.attachControl(canvas, false, true);

	let light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
	light.intensity = 0.7;

	//this will allow for the user to import a .babylon file from the local directory
	const inputElement = document.getElementById('fileUpload');

	inputElement.addEventListener(
		'change',
		function handleFiles(event) {
			const fileList = this.files[0];
			const reader = new FileReader();

			reader.addEventListener('loadend', () => {
				let data = reader.result;
				// The first parameter can be used to specify which mesh to import. Here we import all meshes
				BABYLON.SceneLoader.ImportMesh('', '', 'data:' + data, scene, function(newMeshes) {
					//newMeshes[0].scaling.x = .1;
					//Mesh comes in to large.  Use this to scale the mesh down
					newMeshes[0].scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
					newMeshes[0].position.y = 0;
					//newMeshes[0].positiion = new BABYLON.Vector3(0,0,0);
					camera.setTarget = newMeshes[2];
				});
			});
			reader.readAsText(fileList);
		},
		false
	);

	return scene;
};
var scene = createScene();

engine.runRenderLoop(() => {
	scene.render();
});

window.addEventListener('resize', () => {
	engine.resize();
});
