import { loadGLTF } from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/targets.mind'
    });
    const { renderer, scene, camera } = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const model0 = await loadGLTF('./assets/models/house/sakana.gltf');
    const model1 = await loadGLTF('./assets/models/house/usi.gltf');
    const model2 = await loadGLTF('./assets/models/house/hituzi.gltf');
    const model3 = await loadGLTF('./assets/models/house/tori.gltf');
    const model4 = await loadGLTF('./assets/models/house/sakana2.gltf');
    


    
    model0.scene.scale.set(0.2, 0.2, 0.2);
    model0.scene.position.set(0, 0, -1);
    model0.scene.rotation.set(0, 0, 0);

    model1.scene.scale.set(0.4, 0.4, 0.4);
    model1.scene.position.set(0, 0, -1);
    model1.scene.rotation.set(0, 0, 0);

    model2.scene.scale.set(0.5, 0.5, 0.5);
    model2.scene.position.set(0, 0, 0);
    model2.scene.rotation.set(10, 0, 0);

    model3.scene.scale.set(0.1, 0.1, 0.1);
    model3.scene.position.set(0, 2, 0);
    model3.scene.rotation.set(0, 0, 0);

    model4.scene.scale.set(0.3,0.3, 0.3);
    model4.scene.position.set(0, 0, -1);
    model4.scene.rotation.set(0, 0, 0);

    const model0Ancor = mindarThree.addAnchor(0);
    const model1Ancor = mindarThree.addAnchor(1);
    const model2Ancor = mindarThree.addAnchor(2);
    const model3Ancor = mindarThree.addAnchor(3);
    const model4Ancor = mindarThree.addAnchor(4);

    model0Ancor.group.add(model0.scene);
    model1Ancor.group.add(model1.scene);
    model2Ancor.group.add(model2.scene);
    model3Ancor.group.add(model3.scene);
    model4Ancor.group.add(model4.scene);

    //animation1
    const mixer = new THREE.AnimationMixer(model1.scene);
    const action = mixer.clipAction(model1.animations[0]);
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