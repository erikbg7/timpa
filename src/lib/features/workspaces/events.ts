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
		const start = this.events[0].createdAt;
		const end = this.events.find((e) => e.eventType === EventType.END)?.createdAt;

		if (!end) return 0;
		return Math.floor((end.getTime() - start.getTime()) / 1000);
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
