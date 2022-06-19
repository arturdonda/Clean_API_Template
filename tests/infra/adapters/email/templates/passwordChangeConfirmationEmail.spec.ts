import { makePasswordChangeConfirmationEmail } from '@infra/adapters/email/templates/passwordChangeConfirmationEmail';

describe('Password Change Confirmation Email', () => {
	const name = 'Test';

	const PasswordChangeConfirmationEmail = makePasswordChangeConfirmationEmail(name);

	it('should return correct subject', () => {
		expect(PasswordChangeConfirmationEmail.subject).toBe('A sua senha foi alterada');
	});

	it('should return correct body', () => {
		expect(PasswordChangeConfirmationEmail.body).toBe(`<p>Olá ${name},</p>
<br>
<p>A sua senha foi alterada recentemente. Se você não solicitou esta alteração, <a href="#">clique aqui</a> para alterá-la imediatamente.</p>`);
	});
});
