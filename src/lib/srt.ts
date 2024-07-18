import type { Segment } from '@prisma/client';

const output = {
	detected_language: 'catalan',
	segments: [
		{
			avg_logprob: -0.14031417347560418,
			compression_ratio: 1.4235807860262009,
			end: 5.26,
			id: 0,
			no_speech_prob: 0.0001669529447099194,
			seek: 0,
			start: 0,
			temperature: 0,
			text: " En exercici del legítim dret a l'autodeterminació",
			tokens: [null],
		},
		{
			avg_logprob: -0.14031417347560418,
			compression_ratio: 1.4235807860262009,
			end: 7.8,
			id: 1,
			no_speech_prob: 0.0001669529447099194,
			seek: 0,
			start: 5.26,
			temperature: 0,
			text: ' que té una nació mil·lenària com Catalunya,',
			tokens: [null],
		},
		{
			avg_logprob: -0.14031417347560418,
			compression_ratio: 1.4235807860262009,
			end: 15.700000000000001,
			id: 2,
			no_speech_prob: 0.0001669529447099194,
			seek: 0,
			start: 9.620000000000001,
			temperature: 0,
			text: " a un referèndum que se celebrarà el diumenge, dia 1 d'octubre d'enguany.",
			tokens: [null],
		},
		{
			avg_logprob: -0.14031417347560418,
			compression_ratio: 1.4235807860262009,
			end: 18.32,
			id: 3,
			no_speech_prob: 0.0001669529447099194,
			seek: 0,
			start: 17.1,
			temperature: 0,
			text: ' Amb la pregunta,',
			tokens: [null],
		},
		{
			avg_logprob: -0.14031417347560418,
			compression_ratio: 1.4235807860262009,
			end: 23.84,
			id: 4,
			no_speech_prob: 0.0001669529447099194,
			seek: 0,
			start: 19.6,
			temperature: 0,
			text: ' voleu que Catalunya sigui un estat independent en forma de república?',
			tokens: [null],
		},
		{
			avg_logprob: -0.14031417347560418,
			compression_ratio: 1.4235807860262009,
			end: 29.02,
			id: 5,
			no_speech_prob: 0.0001669529447099194,
			seek: 0,
			start: 25.44,
			temperature: 0,
			text: ' Aquesta pregunta estarà formulada en els tres idiomes oficials',
			tokens: [null],
		},
		{
			avg_logprob: -0.13974516868591308,
			compression_ratio: 1.4532019704433496,
			end: 30.7,
			id: 6,
			no_speech_prob: 0.000015566985894110985,
			seek: 2902,
			start: 29.02,
			temperature: 0,
			text: ' que hi ha al Principat de Catalunya,',
			tokens: [null],
		},
		{
			avg_logprob: -0.13974516868591308,
			compression_ratio: 1.4532019704433496,
			end: 34.9,
			id: 7,
			no_speech_prob: 0.000015566985894110985,
			seek: 2902,
			start: 31.419999999999998,
			temperature: 0,
			text: " el català, el castellà i també l'aranès a la Vall d'Aran.",
			tokens: [null],
		},
		{
			avg_logprob: -0.13974516868591308,
			compression_ratio: 1.4532019704433496,
			end: 38.980000000000004,
			id: 8,
			no_speech_prob: 0.000015566985894110985,
			seek: 2902,
			start: 35.96,
			temperature: 0,
			text: ' I la resposta que hi donin els nostres conciutadans,',
			tokens: [null],
		},
		{
			avg_logprob: -0.13974516868591308,
			compression_ratio: 1.4532019704433496,
			end: 41.84,
			id: 9,
			no_speech_prob: 0.000015566985894110985,
			seek: 2902,
			start: 39.84,
			temperature: 0,
			text: ' en forma de sí o de no,',
			tokens: [null],
		},
		{
			avg_logprob: -0.13974516868591308,
			compression_ratio: 1.4532019704433496,
			end: 46.28,
			id: 10,
			no_speech_prob: 0.000015566985894110985,
			seek: 2902,
			start: 42.76,
			temperature: 0,
			text: ' serà un mandat que aquest govern es compromet a aplicar.',
			tokens: [null],
		},
		{
			avg_logprob: -0.13974516868591308,
			compression_ratio: 1.4532019704433496,
			end: 51.16,
			id: 11,
			no_speech_prob: 0.000015566985894110985,
			seek: 2902,
			start: 48.14,
			temperature: 0,
			text: ' Toca a les catalanes i els catalans de decidir el seu futur.',
			tokens: [null],
		},
	],
	transcription:
		" En exercici del legítim dret a l'autodeterminació que té una nació mil·lenària com Catalunya, a un referèndum que se celebrarà el diumenge, dia 1 d'octubre d'enguany. Amb la pregunta, voleu que Catalunya sigui un estat independent en forma de república? Aquesta pregunta estarà formulada en els tres idiomes oficials que hi ha al Principat de Catalunya, el català, el castellà i també l'aranès a la Vall d'Aran. I la resposta que hi donin els nostres conciutadans, en forma de sí o de no, serà un mandat que aquest govern es compromet a aplicar. Toca a les catalanes i els catalans de decidir el seu futur.",
	translation: null,
};

// function buildTimecode(data: any): string {
// 	return `${toTimecode(data.start)} --> ${toTimecode(data.end)}`;
// }

export type SubtitleFileFormat = 'srt' | 'vtt';
export type TimeCodeParserOptions = {
	withMilliseconds?: boolean;
};

const defaultOptions: TimeCodeParserOptions = {
	withMilliseconds: true,
};

export class TimeCodeParser {
	constructor(
		public format: SubtitleFileFormat,
		public options: TimeCodeParserOptions = defaultOptions,
	) {}

	fromSeconds(seconds: number): string {
		const intMinutes = Math.floor(seconds / 60)
			.toString()
			.padStart(2, '0');
		const intSeconds = Math.floor(seconds % 60)
			.toString()
			.padStart(2, '0');
		const millis = (seconds % 1).toFixed(3).replace('0.', '');
		const millisSeparator = { srt: ',', vtt: '.' }[this.format] || ',';

		if (!this.options.withMilliseconds) {
			return `00:${intMinutes}:${intSeconds}`;
		}

		return `00:${intMinutes}:${intSeconds}${millisSeparator}${millis}`;
	}

	toSeconds(timecode: string) {
		const parts = timecode.split(/[:,]/).map(parseFloat);
		return parts[2] + parts[1] * 60 + parts[0] * 3600 + parts[3] / 1000;
	}
}

function buildTimecode(data: Segment, format: SubtitleFileFormat): string {
	const timecode = new TimeCodeParser(format);
	return `${timecode.fromSeconds(data.start)} --> ${timecode.fromSeconds(data.end)}`;
}

function toTimecode(seconds: number): string {
	const millis = (seconds % 1).toFixed(3).replace('0.', '');
	return `00:00:${Math.floor(seconds).toString().padStart(2, '0')},${millis}`;
}

export const toSrt = () => {
	const segments = output.segments;
	let rst = '';

	for (let i = 0; i < segments.length; i++) {
		rst += `${i + 1}\n`;
		rst += buildTimecode(segments[i], 'srt') + '\n';
		rst += segments[i].text + '\n\n';
	}

	return rst;
};

export const toVtt = (segments: Segment[]) => {
	let rst = '';

	rst += 'WEBVTT\n\n';

	for (let i = 0; i < segments.length; i++) {
		rst += `${i + 1}\n`;
		rst += buildTimecode(segments[i], 'vtt') + '\n';
		rst += segments[i].text + '\n\n';
	}

	return rst;
};
