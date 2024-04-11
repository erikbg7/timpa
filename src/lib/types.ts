import type { Customer, FlowSession, Workspace, Event } from '@prisma/client';
import type { Session } from '@supabase/supabase-js';

export interface IFlowSession extends FlowSession {
	events: Event[];
}
export interface IWorkspace extends Workspace {
	flowSessions: IFlowSession[];
}
export interface ICustomer extends Customer {
	workspaces: IWorkspace[];
}

export interface LeadContext {
	isCustomer: false;
	session: null;
}
export interface UserContext {
	session: Session;
	isCustomer: false;
}

export interface CustomerContext extends Omit<UserContext, 'isCustomer'> {
	customer: ICustomer;
	isCustomer: true;
}
