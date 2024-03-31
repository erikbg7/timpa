import type { Customer, FlowSession, Workspace, Event } from '@prisma/client';

export interface IFlowSession extends FlowSession {
	events: Event[];
}
export interface IWorkspace extends Workspace {
	flowSessions: IFlowSession[];
}
export interface ICustomer extends Customer {
	workspaces: IWorkspace[];
}
