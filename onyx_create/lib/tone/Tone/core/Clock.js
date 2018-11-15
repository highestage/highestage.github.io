define(["Tone/core/Tone","Tone/signal/TimelineSignal","Tone/core/TimelineState"],function(Tone){"use strict";Tone.Clock=function(){var options=this.optionsObject(arguments,["callback","frequency"],Tone.Clock.defaults);this.callback=options.callback;this._lookAhead="auto";this._computedLookAhead=1/60;this._threshold=0.5;this._nextTick=-1;this._lastUpdate=0;this._loopID=-1;this.frequency=new Tone.TimelineSignal(options.frequency,Tone.Type.Frequency);this.ticks=0;this._state=new Tone.TimelineState(Tone.State.Stopped);this._boundLoop=this._loop.bind(this);this._readOnly("frequency");this._loop()};Tone.extend(Tone.Clock);Tone.Clock.defaults={"callback":Tone.noOp,"frequency":1,"lookAhead":"auto",};Object.defineProperty(Tone.Clock.prototype,"state",{get:function(){return this._state.getStateAtTime(this.now())}});Object.defineProperty(Tone.Clock.prototype,"lookAhead",{get:function(){return this._lookAhead},set:function(val){if(val==="auto"){this._lookAhead="auto"}else{this._lookAhead=this.toSeconds(val)}}});Tone.Clock.prototype.start=function(time,offset){time=this.toSeconds(time);if(this._state.getStateAtTime(time)!==Tone.State.Started){this._state.addEvent({"state":Tone.State.Started,"time":time,"offset":offset})}
return this};Tone.Clock.prototype.stop=function(time){time=this.toSeconds(time);if(this._state.getStateAtTime(time)!==Tone.State.Stopped){this._state.setStateAtTime(Tone.State.Stopped,time)}
return this};Tone.Clock.prototype.pause=function(time){time=this.toSeconds(time);if(this._state.getStateAtTime(time)===Tone.State.Started){this._state.setStateAtTime(Tone.State.Paused,time)}
return this};Tone.Clock.prototype._loop=function(time){this._loopID=requestAnimationFrame(this._boundLoop);if(this._lookAhead==="auto"){if(!this.isUndef(time)){var diff=(time-this._lastUpdate)/1000;this._lastUpdate=time;if(diff<this._threshold){this._computedLookAhead=(9*this._computedLookAhead+diff)/10}}}else{this._computedLookAhead=this._lookAhead}
var now=this.now();var lookAhead=this._computedLookAhead*2;var event=this._state.getEvent(now+lookAhead);var state=Tone.State.Stopped;if(event){state=event.state;if(this._nextTick===-1&&state===Tone.State.Started){this._nextTick=event.time;if(!this.isUndef(event.offset)){this.ticks=event.offset}}}
if(state===Tone.State.Started){while(now+lookAhead>this._nextTick){if(now>this._nextTick+this._threshold){this._nextTick=now}
var tickTime=this._nextTick;this._nextTick+=1/this.frequency.getValueAtTime(this._nextTick);this.callback(tickTime);this.ticks++}}else if(state===Tone.State.Stopped){this._nextTick=-1;this.ticks=0}};Tone.Clock.prototype.getStateAtTime=function(time){return this._state.getStateAtTime(time)};Tone.Clock.prototype.dispose=function(){cancelAnimationFrame(this._loopID);Tone.TimelineState.prototype.dispose.call(this);this._writable("frequency");this.frequency.dispose();this.frequency=null;this._boundLoop=Tone.noOp;this._nextTick=Infinity;this.callback=null;this._state.dispose();this._state=null};return Tone.Clock})