type Email = {
    email: string;
    name?: string;
};
type Personalization = {
    to: Array<Email>;
} & Partial<{
    cc: Array<Email>;
    bcc: Array<Email>;
    from: Email;
    subject: string;
    headers: Record<string, string>;
    send_at: number;
}>;
export type SendGridRequestBody = {
    personalizations: Array<Personalization>;
    from: Email;
    subject: string;
    content: Array<{
        type: 'text/plain' | 'text/html';
        value: string;
    }>;
} & Partial<{
    reply_to: Email;
    reply_to_list: Array<Email>;
    attachments: Array<{
        content: string;
        filename: string;
    } & Partial<{
        type: string;
        disposition: 'inline' | 'attachment';
    }>>;
    template_id: string;
    headers: Record<string, string>;
    categories: Array<string>;
    custom_args: string;
    send_at: number;
    batch_id: string;
    asm: {
        group_id: number;
        groups_to_display?: Array<number>;
    };
    ip_pool_name: string;
}>;
export declare const generateSgSendBody: (requestBody: SendGridRequestBody) => SendGridRequestBody;
export declare const generateSgSendRequest: (requestBody: SendGridRequestBody, apiKey: string) => Request;
export {};
