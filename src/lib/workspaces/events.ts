import { EventType } from '$lib/enums';
import type { Event } from '@prisma/client';

export class FlowEvents {
	events: Event[];
	length: number;

	constructor(events: Event[] = []) {
		this.events = events;
		this.length = events.length;
	}

	hasEvents() {
		return this.length > 0;
	}

	getCurrentEvent() {
		return this.events[this.events.length - 1];
	}

	getCurrentEventDate() {
		return this.getCurrentEvent()?.createdAt;
	}

	getCurrentEventDuration() {
		const currentEvent = this.getCurrentEvent();
		if (!currentEvent) return 0;
		const start = currentEvent.createdAt;
		const end = new Date();
		return Math.floor((end.getTime() - start.getTime()) / 1000);
	}

	getCurrentEventType(): EventType {
		return this.getCurrentEvent()?.eventType as EventType;
	}

	isActive() {
		return this.getCurrentEventType() === EventType.ACTIVE;
	}

	isPaused() {
		const currentEventType = this.getCurrentEventType();

		return currentEventType === EventType.BREAK || currentEventType === EventType.INTERRUPTION;
	}

	isEnded() {
		return this.getCurrentEventType() === EventType.END;
	}

	getEventsNumber() {
		return this.events.length;
	}

	getSessionDuration() {
		const start = this.events[0]?.createdAt;
		const end = this.events.find((e) => e.eventType === EventType.END)?.createdAt;

		if (!end) return 0;
		return Math.ceil((end.getTime() - start.getTime()) / 1000);
	}

	getFlowAnalytics() {
		return {
			sessionDuration: this.getSessionDuration(),
			averageFlowTime: this.getAverageEventDuration(EventType.ACTIVE),
			averageBreakTime: this.getAverageEventDuration(EventType.BREAK),
			interruptions: this.events.filter((e) => e.eventType === EventType.INTERRUPTION).length,
		};
	}

	getAverageEventDuration(eventType: EventType) {
		return this.events.reduce((acc, curr, index) => {
			if (curr.eventType !== eventType) return acc;
			const nextEvent = this.events[index + 1];
			if (!nextEvent) return acc;
			return acc + Math.ceil((nextEvent.createdAt.getTime() - curr.createdAt.getTime()) / 1000);
		}, 0);
	}

	getMappedEvents() {
		return this.events.map((event, index) => {
			const nextEvent = this.events[index + 1];
			return {
				...event,
				duration: nextEvent
					? Math.ceil((nextEvent.createdAt.getTime() - event.createdAt.getTime()) / 1000)
					: 0,
			};
		});
	}
}

export const FlowEventsF = (events: Event[] = []) => ({
	hasEvents: () => events.length > 0,

	getCurrentEvent: () => events[events.length - 1],

	getCurrentEventDate: function () {
		return this.getCurrentEvent()?.createdAt;
	},

	getCurrentEventDuration: function () {
		const currentEvent = this.getCurrentEvent();
		if (!currentEvent) return 0;
		const start = currentEvent.createdAt;
		const end = new Date();
		return Math.floor((end.getTime() - start.getTime()) / 1000);
	},

	getCurrentEventType: function () {
		return this.getCurrentEvent()?.eventType as EventType;
	},

	isActive: function () {
		return this.getCurrentEventType() === EventType.ACTIVE;
	},

	isPaused: function () {
		const currentEventType = this.getCurrentEventType();
		return currentEventType === EventType.BREAK || currentEventType === EventType.INTERRUPTION;
	},

	isEnded: function () {
		return this.getCurrentEventType() === EventType.END;
	},

	getEventsNumber: () => events.length,

	getSessionDuration: () => {
		const start = events[0]?.createdAt;
		const end = events.find((e) => e.eventType === EventType.END)?.createdAt;
		if (!end) return 0;
		return Math.ceil((end.getTime() - start.getTime()) / 1000);
	},
	getFlowAnalytics: function () {
		return {
			sessionDuration: this.getSessionDuration(),
			averageFlowTime: this.getAverageEventDuration(EventType.ACTIVE),
			averageBreakTime: this.getAverageEventDuration(EventType.BREAK),
			interruptions: events.filter((e) => e.eventType === EventType.INTERRUPTION).length,
		};
	},
	getAverageEventDuration: function (eventType: EventType) {
		return events.reduce((acc, curr, index) => {
			if (curr.eventType !== eventType) return acc;
			const nextEvent = events[index + 1];
			if (!nextEvent) return acc;
			return acc + Math.ceil((nextEvent.createdAt.getTime() - curr.createdAt.getTime()) / 1000);
		}, 0);
	},

	getMappedEvents: function () {
		return events.map((event, index) => {
			const nextEvent = events[index + 1];
			return {
				...event,
				duration: nextEvent
					? Math.ceil((nextEvent.createdAt.getTime() - event.createdAt.getTime()) / 1000)
					: 0,
			};
		});
	},
});

// // Convert FlowEvents class to functional
// export function FlowEventsFunctional(events: Event[] = []) {
// 	const hasEvents = () => {
// 		return events.length > 0;
// 	};

// 	const getCurrentEvent = () => {
// 		return events[events.length - 1];
// 	};

// 	const getCurrentEventDate = () => {
// 		return getCurrentEvent()?.createdAt;
// 	};

// 	const getCurrentEventDuration = () => {
// 		const currentEvent = getCurrentEvent();
// 		if (!currentEvent) return 0;
// 		const start = currentEvent.createdAt;
// 		const end = new Date();
// 		return Math.floor((end.getTime() - start.getTime()) / 1000);
// 	};

// 	const getCurrentEventType = () => {
// 		return getCurrentEvent()?.eventType as EventType;
// 	};

// 	const isActive = () => {
// 		return getCurrentEventType() === EventType.ACTIVE;
// 	};

// 	const isPaused = () => {
// 		const currentEventType = getCurrentEventType();

// 		return currentEventType === EventType.BREAK || currentEventType === EventType.INTERRUPTION;
// 	};

// 	const isEnded = () => {
// 		return getCurrentEventType() === EventType.END;
// 	};

// 	const getEventsNumber = () => {
// 		return events.length;
// 	};

// 	const getSessionDuration = () => {
// 		const start = events[0]?.createdAt;
// 		const end = events.find((e) => e.eventType === EventType.END)?.createdAt;

// 		if (!end) return 0;
// 		return Math.ceil((end.getTime() - start.getTime()) / 1000);
// 	};

// 	const getFlowAnalytics = () => {
// 		return {
// 			sessionDuration: getSessionDuration(),
// 			averageFlowTime: getAverageEventDuration(EventType.ACTIVE),
// 			averageBreakTime: getAverageEventDuration(EventType.BREAK),
// 			interruptions: events.filter((e) => e.eventType === EventType.INTERRUPTION).length,
// 		};
// 	};

// 	const getAverageEventDuration = (eventType: EventType) => {
// 		return events.reduce((acc, curr, index) => {
// 			if (curr.eventType !== eventType) return acc;
// 			const nextEvent = events[index + 1];
// 			if (!nextEvent) return acc;
// 			return acc + Math.ceil((nextEvent.createdAt.getTime() - curr.createdAt.getTime()) / 1000);
// 		}, 0);
// 	};

// 	const getMappedEvents = () => {
// 		return events.map((event, index) => {
// 			const nextEvent = events[index + 1];
// 			return {
// 				...event,
// 				duration: nextEvent
// 					? Math.ceil((nextEvent.createdAt.getTime() - event.createdAt.getTime()) / 1000)
// 					: 0,
// 			};
// 		});
// 	};

// 	return {
// 		hasEvents,
// 		getCurrentEvent,
// 		getCurrentEventDate,
// 		getCurrentEventDuration,
// 		getCurrentEventType,
// 		isActive,
// 		isPaused,
// 		isEnded,
// 		getEventsNumber,
// 		getSessionDuration,
// 		getFlowAnalytics,
// 		getAverageEventDuration,
// 		getMappedEvents,
// 	};
// }

// export class FlowEvents2 {
// 	events: Event[];
// 	length: number;
// 	subscribers = new Set();

// 	constructor(events: Event[] = []) {
// 		this.events = events;
// 		this.length = events.length;
// 	}

// 	notify = () => {
// 		this.subscribers.forEach((sub: any) => sub(this));
// 	};

// 	subscribe = (sub: any) => {
// 		this.subscribers.add(sub);
// 		sub(this);
// 		return () => this.subscribers.delete(sub);
// 	};

// 	getCurrentEvent() {
// 		return this.events[this.events.length - 1];
// 	}
// }
