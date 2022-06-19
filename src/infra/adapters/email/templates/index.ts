import { makeForgotPasswordEmail } from './forgotPasswordEmail';
import { makeAccountConfirmationEmail } from './accountConfirmationEmail';
import { makePasswordChangeConfirmationEmail } from './passwordChangeConfirmationEmail';

export const makeEmail = {
	forgotPassword: makeForgotPasswordEmail,
	accountConfirmation: makeAccountConfirmationEmail,
	passwordChangeConfirmation: makePasswordChangeConfirmationEmail,
};
