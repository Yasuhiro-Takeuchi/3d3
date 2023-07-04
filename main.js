import { loadGLTF } from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/open2.mind'
    });
    const { renderer, scene, camera } = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const usi = await loadGLTF('./assets/models/usi/usi.gltf');

    usi.scene.scale.set(1, 1, 1);
    usi.scene.position.set(0, -1, 0.2);
    usi.scene.rotation.set(0, 0, 0);

    const usiAncor = mindarThree.addAnchor(0);

    usiAncor.group.add(usi.scene);

    //アニメーション
    let mixer;
    let clock = new THREE.Clock();
    const actions = [];

    mixer = new THREE.AnimationMixer(model);
    // 複数のアクションすべてを再生
    gltf.animations.forEach(animation => {
      actions.push(mixer.clipAction(animation).play());
    })

    // animation
    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      mixer.update(delta);
      controls.update();
      renderer.render(scene, camera);
    }


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

