import {loadGLTF} from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      // imageTargetSrc: './assets/targets/kusa.mind'
      imageTargetSrc: './assets/targets/open2.mind'
      // imageTargetSrc: './assets/targets/usi.mind'
    });
    const {renderer, scene, camera} = mindarThree;

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    const house = await loadGLTF('./assets/models/house/usi2.gltf');

    house.scene.scale.set(0.1, 0.1, 0.1);
    house.scene.position.set(0, 0, 0);
    house.scene.rotation.set(90, 0, 0);
    const houseAncor = mindarThree.addAnchor(0);

    houseAncor.group.add(house.scene);

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  // start();
  const startButton = document.createElement("button");
  startButton.textContent = "Start";
  startButton.addEventListener("click", start);
  document.body.appendChild(startButton);
});

let mixer;
let clock = new THREE.Clock();
 
const gltfLoader = new GLTFLoader();
gltfLoader.load('./data/usi2.gltf',function(data){
    const gltf = data;
    const obj = gltf.scene;
    const animations = gltf.animations;
 
    if(animations && animations.length) {
 
        //Animation Mixerインスタンスを生成
        mixer = new THREE.AnimationMixer(obj);
 
        //全てのAnimation Clipに対して
        for (let i = 0; i < animations.length; i++) {
            let animation = animations[i];
 
            //Animation Actionを生成
            let action = mixer.clipAction(animation) ;
 
            //ループ設定（1回のみ）
            action.setLoop(THREE.LoopOnce);
 
            //アニメーションの最後のフレームでアニメーションが終了
            action.clampWhenFinished = true;
 
            //アニメーションを再生
            action.play();
        }
    }
    scene.add(obj);
});
 
function render() {
    requestAnimationFrame(render);
    renderer.render(scene,camera);
 
    //Animation Mixerを実行
    if(mixer){
        mixer.update(clock.getDelta());
    }
}