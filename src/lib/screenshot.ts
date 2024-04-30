// place files you want to import through the `$lib` alias in this folder.

import html2canvas from 'html2canvas-pro';
import Jimp from 'jimp';

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
	const img = new Image();
	img.src = image;
	await new Promise((resolve) => {
		img.onload = resolve;
	});
	drawToCanvas(canvas, img);
}

function drawToCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement) {
	const ctx = canvas?.getContext('2d')!;
	canvas.width = image.width;
	canvas.height = image.height;
	ctx.drawImage(image, 0, 0, image.width, image.height);
}

async function calculateSnapshotDiff(a: string, b: string) {
	const imageBaselineData = a.split(',').pop();
	const imageBaseline = await Jimp.read(Buffer.from(imageBaselineData, 'base64'));

	const imageCurrentData = b.split(',').pop();
	const imageCurrent = await Jimp.read(Buffer.from(imageCurrentData, 'base64'));

	return calculateScreenshotDiff(imageBaseline.bitmap, imageCurrent.bitmap);
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

export { calculateScreenshotDiff, drawToCanvas, drawImageToCanvas, takeScreenshot };
