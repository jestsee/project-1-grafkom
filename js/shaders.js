var vertexShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertexShader, [
  'attribute vec2 position;',
  'uniform vec2 u_resolution;',
  'uniform vec2 u_translation;',
  'uniform vec2 u_scale;',
  'uniform vec2 u_rotation;',

  'void main() {',
  '  vec2 scaledPosition = position * u_scale;',
    'vec2 rotatedPosition = vec2(',
      'scaledPosition.x * u_rotation.y + scaledPosition.y * u_rotation.x,',
      'scaledPosition.y * u_rotation.y - scaledPosition.x * u_rotation.x);',
    'vec2 newPosition = rotatedPosition + u_translation;',
    'vec2 zeroToOne = newPosition / u_resolution;',
    'vec2 zeroToTwo = zeroToOne * 2.0;',
    'vec2 clipSpace = zeroToTwo - 1.0;',
    'gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);',
  '}'
].join('\n'))
gl.compileShader(vertexShader)

var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, [
  'precision highp float;',
  'uniform vec4 color;',
  'void main() {',
    'gl_FragColor = color;',
  '}'
].join('\n'))
gl.compileShader(fragmentShader)

var program = gl.createProgram()
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)
gl.linkProgram(program)
gl.useProgram(program)