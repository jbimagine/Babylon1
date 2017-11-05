var inputElement = document.getElementById("load");     

inputElement.addEventListener("change", function handleFiles(event) {                            
var fileList = this.files[0];                            
var reader = new FileReader();                            
reader.addEventListener("loadend", function () {                                
var data = reader.result;                                

// The first parameter can be used to specify which mesh to import. Here we import all meshes                                
BABYLON.SceneLoader.ImportMesh("", "", "data:" + data, scene, function (newMeshes) {                                

});                            
});                            
reader.readAsText(fileList);                      
}, false);
