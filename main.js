import {loadGLTF} from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/open2.mind'
      // imageTargetSrc: './assets/targets/usi.mind'
    });
    const {renderer, scene, camera} = mindarThree;

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    const house = await loadGLTF('./assets/models/house/usi.gltf');

    house.scene.scale.set(0.5, 0.5, 0.5);
    house.scene.position.set(0, -1, 0.2);
    house.scene.rotation.set(0, 0, 90);

    const houseAncor = mindarThree.addAnchor(0);

    houseAncor.group.add(house.scene);

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  //start();
  const startButton = document.createElement("button");
  startButton.textContent = "Start";
  startButton.addEventListener("click", start);
  document.body.appendChild(startButton);
});