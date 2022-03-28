import { adaptRoute } from '@main/adapters';
import { authorize } from '@main/middlewares';
import { makeRenewAccessController, makeSignOutController } from '@main/factories/session';
import { makeActivateUserController, makeForgotPasswordController, makeSignInController, makeUpdateForgottenPasswordController } from '@main/factories/user';
import { Router } from 'express';

export default (router: Router): void => {
	const prefix = 'auth';

	router.get(`/${prefix}/activate/:confirmationCode`, adaptRoute(makeActivateUserController()));

	router.get(`/${prefix}/refresh`, authorize, adaptRoute(makeRenewAccessController()));

	router.get(`/${prefix}/sign-out`, authorize, adaptRoute(makeSignOutController()));

	router.post(`/${prefix}/sign-in`, adaptRoute(makeSignInController()));

	router.post(`/${prefix}/forgot-password`, adaptRoute(makeForgotPasswordController()));

	router.post(`/${prefix}/reset-password`, adaptRoute(makeUpdateForgottenPasswordController()));
};
