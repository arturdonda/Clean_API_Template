import { IEmailService } from '@application/protocols/utils';

export class MockEmailService implements IEmailService {
	send = async ({ to, cc, bcc, subject, body }: IEmailService.Params): Promise<IEmailService.Result> => {
		return new Promise((resolve, reject) => resolve());
	};
}
