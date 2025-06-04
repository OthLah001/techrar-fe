
export type TCampaign = {
    id: number;
    name: string;
    provider_name: string;
    status: "sent" | "scheduled" | "draft" | "failed";
    channel: string;
    scheduled_at: string;
}

export type TTemplate = {
    id: number;
    name: string;
    body: string;
}

export type TProvider = {
    id: number;
    name: string;
    channel: string[];
}

export type TNotification = {
    id: number;
    recipient: string;
    status: "sent" | "failed" | "pending";
    created_at: string;
}