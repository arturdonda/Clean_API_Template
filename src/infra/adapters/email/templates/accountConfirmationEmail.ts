export const makeAccountConfirmationEmail = (name: string, confirmationCode: string) => ({
	subject: 'Confirme a sua conta',
	body: `<p>Olá, ${name}!</p>
<br>
<p>Sua conta no API TEMPLATE está quase pronta. Para ativá-la, por favor confirme o seu endereço de email clicando no link abaixo.</p>
<br>
<a href="${process.env.API_BASE_URL}/auth/activate/${confirmationCode}" target="_blank">Ativar minha conta/Confirmar meu email</a>
<br>
<br>
<p>Sua conta não será ativada até que seu email seja confirmado.</p>
<br>
<p>Se você não se cadastrou no(a) API TEMPLATE recentemente, por favor ignore este email.</p>
<br>
<p>Obrigado,</p>
<p>Equipe API TEMPLATE</p>`,
});
