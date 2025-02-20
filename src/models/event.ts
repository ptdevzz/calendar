import { EVENT_TYPE } from "../constant";



export interface EventModel {
    id: number;
    type: 'appointment' | 'event';
    title: string;
    location: string;
    time: string;
    description: string;
    url?: string;
    recurrence: 'monthly' | 'weekly' | 'daily' | 'yearly' | 'none'
    status: EventType
}

export interface CalendarDay {
    date: string;
    events: EventModel[];
}




export type EventType = typeof EVENT_TYPE[keyof typeof EVENT_TYPE]