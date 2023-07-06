import {loadGLTF} from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/open2.mind'
    });
    const {renderer, scene, camera} = mindarThree;

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    const usi = await loadGLTF('./assets/models/house/usi.gltf');
    const sakana = await loadGLTF('./assets/models/house/usi.gltf');
    usi.scene.scale.set(1, 1, 1);
    usi.scene.position.set(0, -1, 0.2);
    usi.scene.rotation.set(0, 0, 0);

    sakana.scene.scale.set(1, 1, 1);
    sakana.scene.position.set(0, -1, 0.2);
    sakana.scene.rotation.set(0, 0, 0);

    const usiAncor = mindarThree.addAnchor(0);
    const sakanaAncor = mindarThree.addAnchor(1);

    usiAncor.group.add(usi.scene);
    sakanaAncor.group.add(sakana.scene);

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

