//use this to config the debug layer
const enableDebug = document.getElementById('enableDebug');

enableDebug.addEventListener('click', function() {
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
