<template>
  <div class="container">
    <!-- {{ count }}
    <button @click="increment">+</button>
    <button @click="decrement">-</button> -->
  </div>
</template>

<script setup>
import * as THREE from "three";
// 鼠标控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
let scene = new THREE.Scene();
// 创建一个相机
let camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
camera.position.set(-50, 50, 50);
camera.lookAt(0, 0, 0);

// 要更新旋转角度的对象数组
const objects = [];

// 一球多用
const radius = 1;
const widthSegments = 6;
const heightSegments = 6;
const sphereGeometry = new THREE.SphereGeometry(
  radius,
  widthSegments,
  heightSegments
);

const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5); // 扩大太阳的大小
scene.add(sunMesh);
objects.push(sunMesh);

// 创建渲染器
let renderer = new THREE.WebGLRenderer();
renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearAlpha(0.2);

renderer.setSize(window.innerWidth, window.innerHeight);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
// import {countMixin} from '@/mixins/count.js'
// export default{
//   mixins:[countMixin]
// }
// import { defineComponent } from "vue";
// import { ref, reactive,onMounted } from 'vue'
// const a = ref(1)
// const obj = reactive({count:0})
// // console.log(obj.count);
// function add(){
//   obj.count++
//   a.value++
// }

// class Student{
// 	fullName:string;
// 	constructor(public firstName,public middleInitial,public lastName){
// 		this.fullName = firstName+""+middleInitial+""+lastName;
// 	}
// }

// interface Person{
// 	firstName:string;
// 	lastName:string;
// }
// function hello(person:Person){
// 	console.log('hello '+person.firstName+person.lastName);
// }
// let user = new Student("yao","1234","zicha")
// hello(user)

// let list:number[] = [1,2,3]
// console.log(list);

// enum Color {Red = 1, Green, Blue}
// let c: Color = Color.Red;
// console.log(c);
</script>