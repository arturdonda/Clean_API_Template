import { adaptRoute } from '@main/adapters';
import { authorize } from '@main/middlewares';
import {
	makeGetActiveSessionsController,
	makeGetAllUsersController,
	makeGetUserByIdController,
	makeGetUserMeController,
	makeSignUpController,
	makeUpdateOptionalDataController,
	makeUpdatePasswordController,
} from '@main/factories/user';
import { Router } from 'express';
import { makeRevokeSessionController } from '@main/factories/session';

export default (router: Router): void => {
	const prefix = 'users';

	router.get(`/${prefix}`, authorize, adaptRoute(makeGetAllUsersController()));

	router.get(`/${prefix}/:userId`, authorize, adaptRoute(makeGetUserByIdController()));

	router.get(`/${prefix}/me`, authorize, adaptRoute(makeGetUserMeController()));

	router.get(`/${prefix}/me/session`, authorize, adaptRoute(makeGetActiveSessionsController()));

	router.post(`/${prefix}`, adaptRoute(makeSignUpController()));

	router.put(`/${prefix}/me`, authorize, adaptRoute(makeUpdateOptionalDataController()));

	router.put(`/${prefix}/me/password`, authorize, adaptRoute(makeUpdatePasswordController()));

	router.delete(`/${prefix}/session/:sessionToken`, authorize, adaptRoute(makeRevokeSessionController()));
};
