/**
 * @file multiselect.js
 * @author Andrea Sessa <andrea.sessa@gmail.com>
 */

import "./multiselect.scss";

(function () {
  this.multiselect = (selector, options) => {
    let defaults = {
      element: typeof selector === "object" ? selector : document.querySelector(selector),
      search: true,
      placeholder: "select",
      selected: "{N} selected",
    };

    options = { ...defaults, ...options };

    options.element.style.display = "none";

    var div = createElement("div", {
      class: ["dropdown", "multiselect-dropdown"],
    });
    options.element.parentNode.insertBefore(div, options.element.nextSibling);

    var btn = createElement("a", {
      class: ["btn", "btn-primary", "dropdown-toggle"],
      href: "#",
      role: "button",
      "data-bs-toggle": "dropdown",
      "aria-expanded": false,
      "data-bs-auto-close": "outside",
      id: "dropdownMenu" + options.element.id,
    });
    div.appendChild(btn);

    var ul = createElement("ul", { class: ["dropdown-menu", "p-2"], "aria-labelledby": btn.id });

    Array.from(options.element.options).map((o) => {
      let li = createElement("li");
      var a = createElement("a", { "data-value": o.value });
      var label = createElement("label", { title: o.text });
      let checkboxOptions = { class: ["form-check-input", "me-1"], type: "checkbox" };
      if (o.selected) checkboxOptions["checked"] = "checked";
      var ic = createElement("input", checkboxOptions);
      ic.oe = o;
      label.textContent = o.text;
      label.prepend(ic);
      a.appendChild(label);
      li.appendChild(a);

      ic.addEventListener("change", (e) => {
        e.target.oe.selected = e.target.checked;
        div.refresh();
      });

      ul.appendChild(li);
    });

    div.refresh = () => {
      var selectedOptions = Array.from(options.element.selectedOptions);
      let selectedOptionsText = "";
      console.log(selectedOptions.length);
      if (selectedOptions.length == 0) selectedOptionsText = options.placeholder;
      else if (selectedOptions.length >= 4)
        selectedOptionsText = String(options.selected).replace("{N}", selectedOptions.length);
      else
        selectedOptions.map((x) => {
          if (selectedOptionsText.length > 0) selectedOptionsText += ", ";
          selectedOptionsText += x.text;
        });

      btn.text = selectedOptionsText;
    };
    div.refresh();

    div.appendChild(ul);
  };

  function createElement(tag, attrs) {
    var e = document.createElement(tag);
    if (attrs !== undefined)
      Object.keys(attrs).forEach((k) => {
        if (k === "class") attrs[k].forEach((o) => e.classList.add(o));
        else if (k === "style")
          Object.keys(attrs[k]).forEach((ks) => {
            e.style[ks] = attrs[k][ks];
          });
        else if (k === "text") attrs[k] === "" ? (e.innerHTML = "&nbsp;") : (e.innerText = attrs[k]);
        else e.setAttribute(k, attrs[k]);
      });
    return e;
  }
})();
