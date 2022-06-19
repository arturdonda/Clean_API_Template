export const makePasswordChangeConfirmationEmail = (name: string) => ({
	subject: 'A sua senha foi alterada',
	body: `<p>Olá ${name},</p>
<br>
<p>A sua senha foi alterada recentemente. Se você não solicitou esta alteração, <a href="#">clique aqui</a> para alterá-la imediatamente.</p>`,
});
