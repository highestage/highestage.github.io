define(["Tone/core/Tone"],function(Tone){"use strict";Tone.CtrlMarkov=function(values,initial){this.values=this.defaultArg(values,{});this.value=this.defaultArg(initial,Object.keys(this.values)[0])};Tone.extend(Tone.CtrlMarkov);Tone.CtrlMarkov.prototype.next=function(){if(this.values.hasOwnProperty(this.value)){var next=this.values[this.value];if(this.isArray(next)){var distribution=this._getProbDistribution(next);var rand=Math.random();var total=0;for(var i=0;i<distribution.length;i++){var dist=distribution[i];if(rand>total&&rand<total+dist){var chosen=next[i];if(this.isObject(chosen)){this.value=chosen.value}else{this.value=chosen}}
total+=dist}}else{this.value=next}}
return this.value};Tone.CtrlMarkov.prototype._getProbDistribution=function(options){var distribution=[];var total=0;var needsNormalizing=!1;for(var i=0;i<options.length;i++){var option=options[i];if(this.isObject(option)){needsNormalizing=!0;distribution[i]=option.probability}else{distribution[i]=1/options.length}
total+=distribution[i]}
if(needsNormalizing){for(var j=0;j<distribution.length;j++){distribution[j]=distribution[j]/total}}
return distribution};Tone.CtrlMarkov.prototype.dispose=function(){this.values=null};return Tone.CtrlMarkov})