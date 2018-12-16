define(["Tone/core/Tone","Tone/core/Type"],function(Tone){"use strict";Tone.CtrlRandom=function(){var options=this.optionsObject(arguments,["min","max"],Tone.CtrlRandom.defaults);this.min=options.min;this.max=options.max;this.integer=options.integer};Tone.extend(Tone.CtrlRandom);Tone.CtrlRandom.defaults={"min":0,"max":1,"integer":!1};Object.defineProperty(Tone.CtrlRandom.prototype,"value",{get:function(){var min=this.toSeconds(this.min);var max=this.toSeconds(this.max);var rand=Math.random();var val=rand*min+(1-rand)*max;if(this.integer){val=Math.floor(val)}
return val}});return Tone.CtrlRandom})