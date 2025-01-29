export type EventHandler<EventName extends keyof EventArgs> = (
	ev: Event,
	args: EventArgs[EventName]
) => any;

export type EventArgs = {};

export type EventMap = {
	[key in keyof EventArgs]: EventHandler<key>;
};

export const eventMap: EventMap = {};
