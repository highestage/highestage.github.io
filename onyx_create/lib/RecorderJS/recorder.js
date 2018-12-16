(function(window){var WORKER_PATH='recorderWorker.js';var RecorderJS=function(source,cfg){var config=cfg||{};var bufferLen=config.bufferLen||4096;this.context=source.context;if(!this.context.createScriptProcessor){this.node=this.context.createJavaScriptNode(bufferLen,2,2)}else{this.node=this.context.createScriptProcessor(bufferLen,2,2)}
var worker=new Worker(config.workerPath||WORKER_PATH);worker.postMessage({command:'init',config:{sampleRate:this.context.sampleRate}});var recording=!1,currCallback;this.node.onaudioprocess=function(e){if(!recording)return;worker.postMessage({command:'record',buffer:[e.inputBuffer.getChannelData(0),e.inputBuffer.getChannelData(1)]})}
this.configure=function(cfg){for(var prop in cfg){if(cfg.hasOwnProperty(prop)){config[prop]=cfg[prop]}}}
this.record=function(){recording=!0}
this.stop=function(){recording=!1}
this.clear=function(){worker.postMessage({command:'clear'})}
this.getBuffers=function(cb){currCallback=cb||config.callback;worker.postMessage({command:'getBuffers'})}
this.exportWAV=function(cb,type){currCallback=cb||config.callback;type=type||config.type||'audio/wav';if(!currCallback)throw new Error('Callback not set');worker.postMessage({command:'exportWAV',type:type})}
this.exportMonoWAV=function(cb,type){currCallback=cb||config.callback;type=type||config.type||'audio/wav';if(!currCallback)throw new Error('Callback not set');worker.postMessage({command:'exportMonoWAV',type:type})}
this.setupDownload=function(blob,filename){var url=(window.URL||window.webkitURL).createObjectURL(blob);var link=window.document.createElement('a');link.href=url;link.download=filename||'output.wav';var click=document.createEvent("Event");click.initEvent("click",!0,!0);link.dispatchEvent(click)}
worker.onmessage=function(e){var blob=e.data;currCallback(blob)}
source.connect(this.node);this.node.connect(this.context.destination)};window.RecorderJS=RecorderJS})(window)