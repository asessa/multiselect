/*! multiselect 1.0.0 | andrea <andrea.sessa@gmail.com> !*/
!function(){function e(e,t){var l=document.createElement(e);return void 0!==t&&Object.keys(t).forEach((e=>{"class"===e?t[e].forEach((e=>l.classList.add(e))):"style"===e?Object.keys(t[e]).forEach((n=>{l.style[n]=t[e][n]})):"text"===e?""===t[e]?l.innerHTML="&nbsp;":l.innerText=t[e]:l.setAttribute(e,t[e])})),l}this.multiselect=(t,l)=>{let n={element:"object"==typeof t?t:document.querySelector(t),search:!0,placeholder:"select",selected:"{N} selected"};(l={...n,...l}).element.style.display="none";var a=e("div",{class:["dropdown","multiselect-dropdown"]});l.element.parentNode.insertBefore(a,l.element.nextSibling);var r=e("a",{class:["btn","btn-primary","dropdown-toggle"],href:"#",role:"button","data-bs-toggle":"dropdown","aria-expanded":!1,"data-bs-auto-close":"outside",id:"dropdownMenu"+l.element.id});a.appendChild(r);var d=e("ul",{class:["dropdown-menu","p-2"],"aria-labelledby":r.id});Array.from(l.element.options).map((t=>{let l=e("li");var n=e("a",{"data-value":t.value}),r=e("label",{title:t.text});let o={class:["form-check-input","me-1"],type:"checkbox"};t.selected&&(o.checked="checked");var c=e("input",o);c.oe=t,r.textContent=t.text,r.prepend(c),n.appendChild(r),l.appendChild(n),c.addEventListener("change",(e=>{e.target.oe.selected=e.target.checked,a.refresh()})),d.appendChild(l)})),a.refresh=()=>{var e=Array.from(l.element.selectedOptions);let t="";console.log(e.length),0==e.length?t=l.placeholder:e.length>=4?t=String(l.selected).replace("{N}",e.length):e.map((e=>{t.length>0&&(t+=", "),t+=e.text})),r.text=t},a.refresh(),a.appendChild(d)}}();
