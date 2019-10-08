var axrengine = document.createElement("script");  // create a script DOM node
axrengine.src = "http://localhost:6969/local-exokit-web/exokit-web/src/a-xr-engine.js";  // set its src to the provided URL

document.head.appendChild(axrengine);  

window.mainCanvas = null;

AFRAME.registerSystem('bind-exokit-aframe-canvas', {
    init: function() {
      console.info('AFRAME.system.init')
      var sceneEl = this.sceneEl;
      
      console.info(document.getElementsByClassName("a-canvas")[0]);
      window.mainCanvas = document.getElementsByClassName("a-canvas")[0];
      // if(0) setTimeout(function() {
      try {
      navigator.xr.requestSession('immersive-vr').then((session)=> {
         console.info('got session', session)
      console.info('exiting VR')
          sceneEl.exitVR();
      }).catch((err)=>console.error('crashless-vrless error:' + err));
      } catch(e) { console.warn('navigator.xr error:'+e); }
      // }, 500);
    },
    tick: function() {
      // this.sceneEl.camera.rotation.y+=.01;
    },
  });
    
   AFRAME.registerComponent('wireframe', {
     dependencies: ['material'],
     init: function () {
       this.el.components.material.material.wireframe = true;
     }
   });
   
   function generateXREngine(context) {
     
     const xrEngine = new XREngine();
     top.xrEngine = xrEngine;
     xrEngine.canvas = window.mainCanvas;
     xrEngine.context = window.mainCanvas.$webgl;
     // alert(xrEngine.canvas);
     xrEngine.innerHTML = '<xr-site><xr-iframe src="https://webvr.info/samples/04b-simple-mirroring-2.html?polyfill=1"></xr-iframe></xr-site>';
     context.appendChild(xrEngine);
     xrEngine.addEventListener('load', function() { console.log("XR ENGINE LOADED : : : ---")});
     xrEngine.enterXr();

   }
   
   AFRAME.registerComponent('xr-engine', {
     init: function() {
       var context = this.el;
       console.info('a-xr-engine', this.data)
       
        setTimeout(function() {
         generateXREngine(context);
        }, 1000);
     },
     tick: function() {
       //this.el.object3D.rotation.y+=.05;
     },
   });

  AFRAME.registerElement("a-xr-engine", { prototype: AFRAME.AEntity.prototype });
  AFRAME.registerElement("a-xr-site", { prototype: AFRAME.AEntity.prototype });
  AFRAME.registerElement("a-xr-iframe", { prototype: AFRAME.AEntity.prototype });