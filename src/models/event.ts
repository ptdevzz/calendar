import { EVENT_TYPE } from "../constant";


export type EventType = typeof EVENT_TYPE[keyof typeof EVENT_TYPE]