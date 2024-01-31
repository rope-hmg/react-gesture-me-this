(function(l,a){typeof exports=="object"&&typeof module<"u"?a(exports,require("react")):typeof define=="function"&&define.amd?define(["exports","react"],a):(l=typeof globalThis<"u"?globalThis:l||self,a(l["react-gesture-me-this"]={},l.React))})(this,function(l,a){"use strict";class c{constructor(t,e){this.x=t,this.y=e}add(t,e=new c(0,0)){return e.x=this.x+t.x,e.y=this.y+t.y,e}add_assign(t){return this.add(t,this)}sub(t,e=new c(0,0)){return e.x=this.x-t.x,e.y=this.y-t.y,e}sub_assign(t){return this.sub(t,this)}mul(t,e=new c(0,0)){return e.x=this.x*t,e.y=this.y*t,e}mul_assign(t){return this.mul(t,this)}div(t,e=new c(0,0)){return this.mul(1/t,e)}div_assign(t){return this.mul_assign(1/t)}neg(t=new c(0,0)){return this.mul(-1,t)}neg_assign(){return this.mul_assign(-1)}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}length_sq(){return this.dot(this)}length(){return Math.sqrt(this.length_sq())}normalise(t=new c(0,0)){return this.mul(1/this.length(),t)}normalise_assign(){return this.mul_assign(1/this.length())}copy_from(t){return this.x=t.x,this.y=t.y,this}set(t,e){this.x=t,this.y=e}}class m{constructor(){this.finger_count=0,this.fingers=new Map,this.centroid=new c(0,0)}}class g{constructor(t,e){this.position_delta=new c(0,0),this.centroid_direction=new c(0,0),this.position=new c(t,e)}is_moving_toward_centroid(){return this.position_delta.dot(this.centroid_direction)>0}angle_delta_around_point(t){const e=this.position.sub(this.position_delta).sub_assign(t).normalise_assign(),s=this.position.sub(t).normalise_assign();return Math.acos(e.dot(s))}}class v{constructor(t,e){this.element=t,this.metrics=new m;const s=i=>{var n;i.preventDefault(),this.initialise_touches(i.changedTouches),(n=e.on_start)==null||n.call(e,this.metrics,i)},r=i=>{var n;i.preventDefault(),this.update_touches(i.changedTouches),(n=e.on_move)==null||n.call(e,this.metrics,i)},u=i=>{var n;i.preventDefault(),this.remove_touches(i.changedTouches),(n=e.on_end)==null||n.call(e,this.metrics,i)},h=i=>{var n;i.preventDefault(),this.remove_all_touches(),(n=e.on_cancel)==null||n.call(e,this.metrics,i)};t.addEventListener("touchstart",s),t.addEventListener("touchmove",r),t.addEventListener("touchend",u),t.addEventListener("touchcancel",h),this.on_start=s,this.on_move=r,this.on_end=u,this.on_cancel=h}disableGestures(){this.element.removeEventListener("touchstart",this.on_start),this.element.removeEventListener("touchmove",this.on_move),this.element.removeEventListener("touchmove",this.on_end),this.element.removeEventListener("touchmove",this.on_cancel)}initialise_touches(t){this.metrics.finger_count+=t.length;for(const e of t){const s=new g(e.clientX,e.clientY);this.metrics.fingers.set(e.identifier,s)}this.calculate_centroid()}update_touches(t){for(const e of t){const s=this.metrics.fingers.get(e.identifier);s&&(s.position_delta.set(e.clientX-s.position.x,e.clientY-s.position.y),s.position.set(e.clientX,e.clientY))}this.calculate_centroid()}remove_touches(t){this.metrics.finger_count-=t.length;for(const e of t)this.metrics.fingers.delete(e.identifier);this.calculate_centroid()}remove_all_touches(){this.metrics.finger_count=0,this.metrics.fingers.clear(),this.metrics.centroid.set(0,0)}calculate_centroid(){const{finger_count:t,fingers:e,centroid:s}=this.metrics;s.set(0,0);for(const r of e.values())s.add_assign(r.position);t>1&&s.div_assign(t);for(const r of e.values())s.sub(r.position,r.centroid_direction)}}const p={sensitivity:.5},y=(o,t)=>{const{exact_finger_count:e,sensitivity:s=.5}=t??p,r=!!e&&o.finger_count===e||!e&&o.finger_count>1;let u;if(r){const h=o.fingers.values();let{value:i,done:n}=h.next(),f=i.is_moving_toward_centroid(),_=!0;for(;!n&&_;)_=f===i.is_moving_toward_centroid(),{value:i,done:n}=h.next();if(_){const w=f?0:1;let d=0;for(const b of o.fingers.values())d+=b.position_delta.length();d/=o.finger_count,d*=s,u={strength:d,direction:w}}}return u?{is_recognised:!0,metrics:u}:{is_recognised:!1}};function x(o){const t=a.useRef(),[e,s]=a.useState();return a.useEffect(()=>{if(t.current){const r={};o.onPinch&&(r.on_move=u=>{var i;const h=y(u);h.is_recognised&&((i=o.onPinch)==null||i.call(o,h.metrics))}),s(new v(t.current,r))}return()=>{e==null||e.disableGestures()}},[t]),[t,e]}l.useGestures=x,Object.defineProperty(l,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=react-gesture-me-this.umd.js.map
