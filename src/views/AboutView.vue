<template>
  <div class="demo">
    <div id="container" ref="content"></div>
  </div>
</template>

<script>
import * as THREE from "three";
// 鼠标控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

var scene,
  sunMesh,
  mercuryMesh,
  venuMesh,
  venuCloud,
  earthMesh,
  xiaoxin,
  earthCloud,
  moonMesh,
  marsMesh,
  jupiter,
  saturn,
  saturn_ring,
  uranus,
  neptune;
export default {
  name: "ThreeTest",
  data() {
    return {
      // 创建一个场景
      // scene: null,
      // 创建一个相机
      camera: null,
      // 创建一个渲染器
      renderer: null,
      // 模型对象
      // mesh: null,
      // 平面
      plane: null,
      // 点光源
      point: null,
      // step
      step: 0,
      controls: null,
    };
  },
  methods: {
    // 初始化
    init() {
      // 初始化容器
      var content = this.$refs.content;
      // 创建一个场景
      this.scene = new THREE.Scene();
      // 创建几何体
      var geometry = new THREE.SphereGeometry(30, 32, 32);
      var geometryEarth = new THREE.SphereGeometry(15, 32, 32);
      var geometryxiaoxin = new THREE.SphereGeometry(15, 32, 32);
      var geometryEarthCloud = new THREE.SphereGeometry(15.8,32,32);//地球云层
      var geometrymoon = new THREE.SphereGeometry(2, 32, 32);
      var geometryMercury = new THREE.SphereGeometry(10, 32, 32);
      var geometryMars = new THREE.SphereGeometry(13, 32, 32);
      var geometryVenu = new THREE.SphereGeometry(12, 32, 32);
      var geometryVenuCloud = new THREE.SphereGeometry(12.2, 32, 32);
      var geometryJupiter = new THREE.SphereGeometry(20, 32, 32);
      var geometrySaturn = new THREE.SphereGeometry(17, 32, 32);
      var geometrySaturnRing = new THREE.RingGeometry(18,20, 32);
      var geometryUranus = new THREE.SphereGeometry(12.2, 32, 32);
      var geometryNeptune = new THREE.SphereGeometry(12.2, 32, 32);
      // 纹理加载器 （ 此处加载贴图 ）

      var texture = new THREE.TextureLoader().load(
        require("../assets/sun.jpg")
      );
      var textureEarth = new THREE.TextureLoader().load(
        require("../assets/earth.jpg")
      );
      var textureXiaoxin = new THREE.TextureLoader().load(
        require("../assets/R-C.jpg")
      );
      var textureEarthCloud = new THREE.TextureLoader().load(
        require("../assets/earth_clouds.jpg")
      );
      var texturemoon = new THREE.TextureLoader().load(
        require("../assets/moon.jpg")
      );
      var textureMercury = new THREE.TextureLoader().load(
        require("../assets/mercury.jpg")
      );
      var textureMars = new THREE.TextureLoader().load(
        require("../assets/mars.jpg")
      );
      var textureVenu = new THREE.TextureLoader().load(
        require("../assets/venus_surface.jpg")
      );
      var textureVenuCloud = new THREE.TextureLoader().load(
        require("../assets/venus_atmosphere.jpg")
      );
      var textureJupiter = new THREE.TextureLoader().load(
        require("../assets/jupiter.jpg")
      );
      var textureSaturn = new THREE.TextureLoader().load(
        require("../assets/saturn.jpg")
      );
      var textureSaturnRing = new THREE.TextureLoader().load(
        require("../assets/saturn_ring.png")
      );
      var textureUranus = new THREE.TextureLoader().load(
        require("../assets/uranus.jpg")
      );
      var textureNeptune = new THREE.TextureLoader().load(
        require("../assets/neptune.jpg")
      );
      // 几何体材质对象
      var material = new THREE.MeshBasicMaterial({
        map: texture,
        emissive:0xffffff,
        emissiveMap:texture
      });
      var materialEarth = new THREE.MeshPhongMaterial({
        map: textureEarth,
        shininess:150,
      });
      var materialXiaoxin = new THREE.MeshPhongMaterial({
        map: textureXiaoxin,
      });
      var materialEarthCloud = new THREE.MeshPhongMaterial({
        map: textureEarthCloud,
        opacity:0.5,
        transparent:true
      });
      var materialmoon = new THREE.MeshPhongMaterial({
        map: texturemoon,
      });
      var materialmercury = new THREE.MeshPhongMaterial({
        map: textureMercury,
      });
      var materialmars = new THREE.MeshPhongMaterial({
        map: textureMars,
      });
      var materialvenu = new THREE.MeshPhongMaterial({
        map: textureVenu,
      });
      var materialvenuCloud = new THREE.MeshPhongMaterial({
        map: textureVenuCloud,
        opacity:0.4,
        transparent:true
      });
      var materialJupiter = new THREE.MeshPhongMaterial({
        map: textureJupiter,
      });
      var materialSaturn = new THREE.MeshPhongMaterial({
        map: textureSaturn,
      });
      var materialSaturnRing = new THREE.MeshBasicMaterial({
        map: textureSaturnRing,
        side:THREE.DoubleSide
      });
      var materialUranus = new THREE.MeshPhongMaterial({
        map: textureUranus,
      });
      var materialNeptune = new THREE.MeshPhongMaterial({
        map: textureNeptune,
      });
      // 创建网格模型对象
      this.sunMesh = new THREE.Mesh(geometry, material);
      //设置几何体位置
      //   this.mesh.position.x = 0;
      //   this.mesh.position.y = 10;
      //   this.mesh.position.z = 0;
      // this.sunMesh.position.set(0, 1, 0);
      this.earthMesh = new THREE.Mesh(geometryEarth, materialEarth);
      this.earthCloud = new THREE.Mesh(geometryEarthCloud,materialEarthCloud)
      this.xiaoxin = new THREE.Mesh(geometryxiaoxin, materialXiaoxin);
      // this.earthMesh.position.set(200, 0, 200);
      // this.earthMesh.position.x = 1000
      this.moonMesh = new THREE.Mesh(geometrymoon, materialmoon);
      // this.moonMesh.position.set(5, 10, 5);
      this.mercuryMesh = new THREE.Mesh(geometryMercury, materialmercury);
      this.marsMesh = new THREE.Mesh(geometryMars, materialmars);
      this.venuMesh = new THREE.Mesh(geometryVenu, materialvenu);
      this.venuCloud = new THREE.Mesh(geometryVenuCloud, materialvenuCloud);
      this.jupiter = new THREE.Mesh(geometryJupiter, materialJupiter);
      this.saturn = new THREE.Mesh(geometrySaturn, materialSaturn);
      this.saturn_ring = new THREE.Mesh(geometrySaturnRing, materialSaturnRing);
      this.uranus = new THREE.Mesh(geometryUranus, materialUranus);
      this.neptune = new THREE.Mesh(geometryNeptune, materialNeptune);
      this.saturn_ring.rotation.x = Math.PI/2
      // this.mercuryMesh.position.set(50, 10, 0);
      this.scene.add(this.sunMesh);
      this.scene.add(this.earthMesh);
      this.scene.add(this.xiaoxin)
      this.scene.add(this.mercuryMesh);
      this.scene.add(this.marsMesh);
      this.scene.add(this.venuMesh);
      this.scene.add(this.jupiter)
      this.scene.add(this.saturn)
      this.scene.add(this.saturn_ring)
      this.scene.add(this.uranus)
      this.scene.add(this.neptune)
      // this.saturn.add(this.saturn_ring)
      this.earthMesh.add(this.moonMesh);
      this.earthMesh.add(this.earthCloud);
      this.venuMesh.add(this.venuCloud)
      // this.sunMesh.add(this.earthMesh);
      // this.sunMesh.add(this.mercuryMesh);
      // 创建点光源
      var point = new THREE.PointLight(0xffffff,100000);
      point.position.set(0,0,0);
      this.point = point;
      console.log(this.point);
      this.scene.add(this.point);

      const sphereSize = 10;
      const pointLightHelper = new THREE.PointLightHelper(point, sphereSize);
      // const pointLightHelper = new THREE.DirectionalLightHelper(point, sphereSize);
      // const pointLightHelper = new THREE.SpotLightHelper(point, sphereSize);
      this.scene.add(pointLightHelper);

      //创建环境光
      var ambient = new THREE.AmbientLight(0xffffff);
      // this.scene.add(ambient);

      // 创建一个相机
      this.camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      this.camera.position.set(-50, 50, 50);
      this.camera.lookAt(0, 0, 0);

      // // 坐标轴辅助器，X,Y,Z长度30
      // var axes = new THREE.AxesHelper(300);
      // this.scene.add(axes);
      // // 辅助网格
      // let gridHelper = new THREE.GridHelper(100, 100);
      // this.scene.add(gridHelper);

      // 创建渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.shadowMap.enabled = true; //辅助线
      // this.renderer.shadowMapSoft = true; //柔和阴影
      this.renderer.setClearColor(0x000000, 0);
      // this.renderer.setClearAlpha(0.2);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      // this.renderer.setClearColor(0xb9d3ff, 1);
      //插入 dom 元素
      content.appendChild(this.renderer.domElement);
      console.log("1111", OrbitControls);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);

      this.controls.addEventListener("resize", this.render(), false);
    },
    render() {
      // 自动旋转动画
      requestAnimationFrame(this.render);
      // 自转
      this.sunMesh.rotateY(0.001);
      this.earthMesh.rotateY(0.01)
      this.xiaoxin.rotateY(0.01)
      this.mercuryMesh.rotateY(0.01)
      this.moonMesh.rotateY(0.005);
      this.marsMesh.rotateY(0.003)
      this.venuMesh.rotateY(0.004)
      // 公转
      this.mercuryMesh.position.x = 70 * Math.cos(Date.now() * 0.00005);
      this.mercuryMesh.position.z = 70 * Math.sin(Date.now() * 0.00005);
      this.venuMesh.position.x = 100 * Math.cos(Date.now() * 0.00009);
      this.venuMesh.position.z = 100 * Math.sin(Date.now() * 0.00009);
      this.moonMesh.position.x = 20 * Math.cos(Date.now() * 0.001);
      this.moonMesh.position.z = 20 * Math.sin(Date.now() * 0.001);
      this.xiaoxin.position.x = 200 * Math.cos(Math.PI+Date.now() * 0.0001);
      this.xiaoxin.position.z = 200 * Math.sin(Math.PI+Date.now() * 0.0001);
      this.earthMesh.position.x = 200 * Math.cos(Date.now() * 0.0001);
      this.earthMesh.position.z = 200 * Math.sin(Date.now() * 0.0001);
      this.marsMesh.position.x = 250 * Math.cos(Date.now() * 0.00015);
      this.marsMesh.position.z = 250 * Math.sin(Date.now() * 0.00015);
      this.jupiter.position.x = 300 * Math.cos(Date.now() * 0.0002);
      this.jupiter.position.z = 300 * Math.sin(Date.now() * 0.0002);
      this.saturn.position.x = 370 * Math.cos(Date.now() * 0.00025);
      this.saturn.position.z = 370 * Math.sin(Date.now() * 0.00025);
      this.saturn_ring.position.x = 370 * Math.cos(Date.now() * 0.00025);
      this.saturn_ring.position.z = 370 * Math.sin(Date.now() * 0.00025);
      this.uranus.position.x = 410 * Math.cos(Date.now() * 0.0003);
      this.uranus.position.z = 410 * Math.sin(Date.now() * 0.0003);
      this.neptune.position.x = 450 * Math.cos(Date.now() * 0.00035);
      this.neptune.position.z = 450 * Math.sin(Date.now() * 0.00035);
      this.renderer.render(this.scene, this.camera);
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.demo {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url("../assets/bg.jpg") center;
}
#container {
  height: 100%;
  overflow: hidden;
}
</style>