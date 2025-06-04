
export type TCampaign = {
    id: number;
    name: string;
    provider_name: string;
    status: "sent" | "scheduled" | "draft" | "failed";
    channel: string;
    scheduled_at: string;
}