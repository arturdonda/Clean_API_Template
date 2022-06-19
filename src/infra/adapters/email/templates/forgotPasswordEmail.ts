export const makeForgotPasswordEmail = (name: string, resetToken: string) => ({
	subject: 'Redefinir senha',
	body: `<p>Olá, ${name}</p>
<br>
<p>Foi solicitada a alteração da sua senha. <a href="${process.env.API_BASE_URL}/auth/reset-password/${resetToken}" target="_blank">Clique aqui</a> para alterá-la (link válido por ${process.env.RESET_PASSWORD_TOKEN_EXPIRATION_IN_MINUTES} minutos).</p>
<p>Caso você não tenha solicitado a alteração da senha, por favor desconsidere este email.</p>`,
});
