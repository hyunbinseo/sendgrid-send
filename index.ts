type Email = {
	email: string;
	name?: string;
};

// Reference https://docs.sendgrid.com/for-developers/sending-email/personalizations
type Personalization = { to: Array<Email> } & Partial<{
	cc: Array<Email>;
	bcc: Array<Email>;
	from: Email;
	subject: string;
	headers: Record<string, string>;
	// substitutions
	// custom_args
	send_at: number;
}>;

// Reference https://docs.sendgrid.com/api-reference/mail-send/mail-send
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
	attachments: Array<
		{
			content: string;
			filename: string;
		} & Partial<{
			type: string;
			disposition: 'inline' | 'attachment';
		}>
	>;
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
	// mail_settings
	// tracking_settings
}>;

export const generateSgSendBody = (requestBody: SendGridRequestBody) => requestBody;

export const generateSgSendRequest = (requestBody: SendGridRequestBody, apiKey: string) =>
	new Request('https://api.sendgrid.com/v3/mail/send', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestBody),
	});
