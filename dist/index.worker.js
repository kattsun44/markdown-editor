(()=>{const e=self;e.addEventListener("message",(s=>{console.log("Worker Received: ",s.data),e.postMessage({result:s.data})}))})();