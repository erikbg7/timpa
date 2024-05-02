// place files you want to import through the `$lib` alias in this folder.

import html2canvas from 'html2canvas-pro';
// import Jimp from 'jimp';

async function takeScreenshot() {
	const elementToCapture = document.getElementById('test-section');
	const currentCanvas = await html2canvas(elementToCapture);
	return currentCanvas.toDataURL('image/png');
}

async function takeScreenshotAndGetBase64() {
	const currentCanvas = await html2canvas(document.body);
	return currentCanvas.toDataURL('image/png');
}

async function drawImageToCanvas(image: string, canvas: HTMLCanvasElement) {
	var img, tex, vloc, tloc, vertexBuff, texBuff;

	var cvs3d = document.getElementById('cvs');
	var ctx3d = canvas.getContext('experimental-webgl');
	var uLoc;

	if (!ctx3d) {
		return;
	}

	// create shaders
	var vertexShaderSrc =
		'attribute vec2 aVertex;' +
		'attribute vec2 aUV;' +
		'varying vec2 vTex;' +
		'uniform vec2 pos;' +
		'void main(void) {' +
		'  gl_Position = vec4(aVertex + pos, 0.0, 1.0);' +
		'  vTex = aUV;' +
		'}';

	var fragmentShaderSrc =
		'precision highp float;' +
		'varying vec2 vTex;' +
		'uniform sampler2D sampler0;' +
		'void main(void){' +
		'  gl_FragColor = texture2D(sampler0, vTex);' +
		'}';

	var vertShaderObj = ctx3d.createShader(ctx3d.VERTEX_SHADER);
	var fragShaderObj = ctx3d.createShader(ctx3d.FRAGMENT_SHADER);
	ctx3d.shaderSource(vertShaderObj, vertexShaderSrc);
	ctx3d.shaderSource(fragShaderObj, fragmentShaderSrc);
	ctx3d.compileShader(vertShaderObj);
	ctx3d.compileShader(fragShaderObj);

	var progObj = ctx3d.createProgram();
	ctx3d.attachShader(progObj, vertShaderObj);
	ctx3d.attachShader(progObj, fragShaderObj);

	ctx3d.linkProgram(progObj);
	ctx3d.useProgram(progObj);

	ctx3d.viewport(0, 0, 1024, 768);

	vertexBuff = ctx3d.createBuffer();
	ctx3d.bindBuffer(ctx3d.ARRAY_BUFFER, vertexBuff);
	ctx3d.bufferData(
		ctx3d.ARRAY_BUFFER,
		new Float32Array([-1, 1, -1, -1, 1, -1, 1, 1]),
		ctx3d.STATIC_DRAW,
	);

	texBuff = ctx3d.createBuffer();
	ctx3d.bindBuffer(ctx3d.ARRAY_BUFFER, texBuff);
	ctx3d.bufferData(
		ctx3d.ARRAY_BUFFER,
		new Float32Array([0, 1, 0, 0, 1, 0, 1, 1]),
		ctx3d.STATIC_DRAW,
	);

	vloc = ctx3d.getAttribLocation(progObj, 'aVertex');
	tloc = ctx3d.getAttribLocation(progObj, 'aUV');
	uLoc = ctx3d.getUniformLocation(progObj, 'pos');

	img = new Image();
	img.src = image;

	img.onload = function () {
		tex = ctx3d.createTexture();
		ctx3d.bindTexture(ctx3d.TEXTURE_2D, tex);
		ctx3d.texParameteri(ctx3d.TEXTURE_2D, ctx3d.TEXTURE_MIN_FILTER, ctx3d.NEAREST);
		ctx3d.texParameteri(ctx3d.TEXTURE_2D, ctx3d.TEXTURE_MAG_FILTER, ctx3d.NEAREST);
		ctx3d.texImage2D(ctx3d.TEXTURE_2D, 0, ctx3d.RGBA, ctx3d.RGBA, ctx3d.UNSIGNED_BYTE, this);

		ctx3d.enableVertexAttribArray(vloc);
		ctx3d.bindBuffer(ctx3d.ARRAY_BUFFER, vertexBuff);
		ctx3d.vertexAttribPointer(vloc, 2, ctx3d.FLOAT, false, 0, 0);

		ctx3d.enableVertexAttribArray(tloc);
		ctx3d.bindBuffer(ctx3d.ARRAY_BUFFER, texBuff);
		ctx3d.bindTexture(ctx3d.TEXTURE_2D, tex);
		ctx3d.vertexAttribPointer(tloc, 2, ctx3d.FLOAT, false, 0, 0);

		ctx3d.drawArrays(ctx3d.TRIANGLE_FAN, 0, 4);
	};
	// const img = new Image();
	// img.src = image;
	// await new Promise((resolve) => {
	// 	img.onload = resolve;
	// });
	// drawToCanvas(canvas, img);
}

function drawToCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement) {
	const gl = canvas?.getContext('webgl')!;
	// var textureId = gl.createTexture();
	var qTexture = gl.createTexture();

	gl.bindTexture(gl.TEXTURE_2D, qTexture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

	// gl.texImage2D(gl.TEXTURE_2D, /* ... */, image);

	// canvas.width = image.width;
	// canvas.height = image.height;
	// ctx.drawImage(image, 0, 0, image.width, image.height);
}

async function calculateSnapshotDiff(a: string, b: string) {
	// const imageBaselineData = a.split(',').pop();
	// const imageBaseline = await Jimp.read(Buffer.from(imageBaselineData, 'base64'));
	// const imageCurrentData = b.split(',').pop();
	// const imageCurrent = await Jimp.read(Buffer.from(imageCurrentData, 'base64'));
	// return calculateScreenshotDiff(imageBaseline.bitmap, imageCurrent.bitmap);
}

function calculateScreenshotDiff(a: ImageData | any, b: ImageData | any) {
	let diff = [];
	if (a.data.length !== b.data.length) {
		throw new Error('Images are not the same size');
	}

	for (let i = 0; i < a.data.length; i += 4) {
		const r1 = a.data[i];
		const g1 = a.data[i + 1];
		const b1 = a.data[i + 2];
		const a1 = a.data[i + 3];

		const r2 = b.data[i];
		const g2 = b.data[i + 1];
		const b2 = b.data[i + 2];
		const a2 = b.data[i + 3];

		if (r1 !== r2 || g1 !== g2 || b1 !== b2 || a1 !== a2) {
			diff.push(Math.round(i / 4));
		}
	}

	return diff;
}

export {
	calculateScreenshotDiff,
	drawToCanvas,
	drawImageToCanvas,
	takeScreenshot,
	calculateSnapshotDiff,
};
