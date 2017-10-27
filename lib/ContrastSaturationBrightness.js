"use strict";

var GL = require("gl-react");
var React = require("react");
var PropTypes = require("prop-types");

var shaders = GL.Shaders.create({
  Saturate: {
    frag: "precision highp float;\nvarying vec2 uv;\nuniform sampler2D t;\n\nuniform float contrast;\nuniform float saturation;\nuniform float brightness;\n\nconst vec3 L = vec3(0.2125, 0.7154, 0.0721);\n\nvoid main () {\n  vec4 c = texture2D(t, uv);\n\tvec3 brt = c.rgb * brightness;\n\tgl_FragColor = vec4(mix(\n    vec3(0.5),\n    mix(vec3(dot(brt, L)), brt, saturation),\n    contrast), c.a);\n}"
  }
});

module.exports = GL.createComponent(function (_ref) {
  var t = _ref.children,
      contrast = _ref.contrast,
      saturation = _ref.saturation,
      brightness = _ref.brightness;
  return React.createElement(GL.Node, {
    shader: shaders.Saturate,
    uniforms: { t: t, contrast: contrast, saturation: saturation, brightness: brightness }
  });
}, {
  displayName: "Saturate",
  defaultProps: {
    contrast: 1,
    saturation: 1,
    brightness: 1
  },
  propTypes: {
    children: PropTypes.any.isRequired,
    contrast: PropTypes.number,
    saturation: PropTypes.number,
    brightness: PropTypes.number
  }
});
//# sourceMappingURL=ContrastSaturationBrightness.js.map