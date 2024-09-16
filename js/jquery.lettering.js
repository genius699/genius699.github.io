/* Pace.js - Cargador de progreso */
/* Funciones relacionadas con el progreso de carga */

(function() {
	// Variables globales y configuración inicial
	var Bar, Pace, defaultOptions, requestAnimationFrame, cancelAnimationFrame, extend, now, bar;
  
	// Configuración predeterminada
	defaultOptions = {
	  startOnPageLoad: true,  // Inicia al cargar la página
	  restartOnPushState: true,
	  target: 'body',  // Aplicar a todo el body
	  minTime: 250  // Tiempo mínimo en ms
	};
  
	// Obtener el tiempo actual
	now = function() {
	  var _ref;
	  return (_ref = typeof performance !== "undefined" && performance !== null ? typeof performance.now === "function" ? performance.now() : void 0 : void 0) != null ? _ref : +(new Date);
	};
  
	// Funciones de animación
	requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
  
	if (!requestAnimationFrame) {
	  requestAnimationFrame = function(fn) {
		return setTimeout(fn, 50);
	  };
	  cancelAnimationFrame = function(id) {
		return clearTimeout(id);
	  };
	}
  
	// Extender objetos (utilizado para opciones de configuración)
	extend = function(out) {
	  for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];
		if (source) {
		  for (var key in source) {
			if (source.hasOwnProperty(key)) {
			  if (typeof source[key] === 'object') {
				out[key] = extend(out[key], source[key]);
			  } else {
				out[key] = source[key];
			  }
			}
		  }
		}
	  }
	  return out;
	};
  
	// Barra de progreso
	Bar = (function() {
	  function Bar() {
		this.progress = 0;
	  }
  
	  Bar.prototype.getElement = function() {
		var targetElement;
		if (!this.el) {
		  targetElement = document.querySelector(defaultOptions.target);
		  this.el = document.createElement('div');
		  this.el.className = "pace pace-active";
		  this.el.innerHTML = '<div class="pace-progress"><div class="pace-progress-inner"></div></div>';
		  targetElement.appendChild(this.el);
		}
		return this.el;
	  };
  
	  Bar.prototype.update = function(prog) {
		this.progress = prog;
		this.render();
	  };
  
	  Bar.prototype.render = function() {
		var el = this.getElement();
		el.children[0].style.transform = "translate3d(" + this.progress + "%, 0, 0)";
		el.children[0].setAttribute('data-progress-text', "" + (this.progress | 0) + "%");
	  };
  
	  return Bar;
  
	})();
  
	// Objeto Pace principal
	Pace = {
	  start: function() {
		Pace.running = true;
		bar = new Bar();
		bar.render();
	  },
  
	  go: function() {
		Pace.running = true;
		bar.render();
		runAnimation(function(frameTime) {
		  bar.update(100);
		});
	  }
	};
  
	// Iniciar el progreso en la carga de la página si está habilitado
	if (defaultOptions.startOnPageLoad) {
	  Pace.start();
	}
  
  }).call(this);
  