export type Introduction_Ack =
	| {
			success: true;
	  }
	| {
			success: false;
			error: string;
	  };

export type ForwardableEvent = {
	qrcode: string;
};

export type ForwardedEvent<ForwardedEvName extends keyof ForwardableEvent = any> = {
	eventName: ForwardedEvName;
	payload: ForwardableEvent[ForwardedEvName];
};

export type ForwardEventRequest = {
	sourceId: string;
	destination: {
		id: string;
		type: string;
	};
	eventName: string;
};

export type EventMap = {
	introduction_ack: Introduction_Ack;
	forwarded_event: ForwardedEvent;
};

export type EventDispatchMap = {
	event_forward_request: ForwardEventRequest;
};
