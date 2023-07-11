import { loadGLTF } from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/sakana.mind'
    });
    const { renderer, scene, camera } = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const usi = await loadGLTF('./assets/models/house/tori.gltf');
    const sakana = await loadGLTF('./assets/models/house/sakana.gltf');
    

    usi.scene.scale.set(0.1, 0.1, 0.1);
    usi.scene.position.set(0, 0.5, 0);
    usi.scene.rotation.set(90, 0, 0);

    sakana.scene.scale.set(0.1, 0.5, 0.5);
    sakana.scene.position.set(0, 0, 0);
    sakana.scene.rotation.set(0, 90, 0);

    const usiAncor = mindarThree.addAnchor(0);
    const sakanaAncor = mindarThree.addAnchor(1);

    usiAncor.group.add(usi.scene);
    sakanaAncor.group.add(sakana.scene);

    //animation1
    const mixer = new THREE.AnimationMixer(usi.scene);
    const action = mixer.clipAction(usi.animations[0]);
    action.play();

    const clock = new THREE.Clock();

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      //animation2
      const delta = clock.getDelta();
      // usi.scene.rotation.set(0, usi.scene.rotation.y + delta, 0);
      mixer.update(delta);
      renderer.render(scene, camera);
    });
  }
  // start();
  const startButton = document.createElement("button");
  startButton.textContent = "Start";
  startButton.addEventListener("click", start);
  document.body.appendChild(startButton);
});