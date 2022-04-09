import { SignUp } from '@application/services/user';
import { MockHashService, MockUserRepository, MockUuidService } from '@application/__tests__/mock';
import { SignUpController } from '@presentation/controllers/user';
import { MissingParamError } from '@presentation/errors';
import { UserViewModel } from '@presentation/viewModels';

describe('Sign Up Controller', () => {
	const mockUserRespository = new MockUserRepository();
	const uuidService = new MockUuidService();
	const passwordHashService = new MockHashService();
	const signUpService = new SignUp(mockUserRespository, uuidService, passwordHashService);
	const signUpController = new SignUpController(signUpService);

	test('With required parameter', async () => {
		const serviceSpy = jest.spyOn(signUpService, 'exec');

		expect(
			await signUpController.handle({
				ip: '0.0.0.0',
				userId: '',
				query: null,
				cookies: null,
				headers: null,
				body: { name: 'John Doe', email: 'john_doe@hotmail.com', password: 'John@123', confirmationPassword: 'John@123' },
			})
		).toMatchObject(
			expect.objectContaining({
				statusCode: 201,
				body: {
					success: true,
					message: 'Usuário criado com sucesso.',
					result: expect.any(UserViewModel),
				},
			})
		);

		expect(serviceSpy).toHaveBeenCalledTimes(1);

		serviceSpy.mockRestore();
	});

	test('Without required parameter - name', async () => {
		expect(
			signUpController.handle({
				ip: '0.0.0.0',
				userId: '',
				query: null,
				cookies: null,
				headers: null,
				body: { email: 'john_doe@hotmail.com', password: 'John@123', confirmationPassword: 'John@123' },
			})
		).resolves.toMatchObject(
			expect.objectContaining({
				statusCode: 400,
				body: {
					success: false,
					message: 'Erro ao criar usuário.',
					result: expect.objectContaining({
						name: 'MissingParamError',
						message: "O parâmetro 'name' é obrigatório.",
						stack: expect.any(String),
					}),
				},
			})
		);
	});

	test('Without required parameter - email', async () => {
		expect(
			signUpController.handle({
				ip: '0.0.0.0',
				userId: '',
				query: null,
				cookies: null,
				headers: null,
				body: { name: 'John Doe', password: 'John@123', confirmationPassword: 'John@123' },
			})
		).resolves.toMatchObject(
			expect.objectContaining({
				statusCode: 400,
				body: {
					success: false,
					message: 'Erro ao criar usuário.',
					result: expect.objectContaining({
						name: 'MissingParamError',
						message: "O parâmetro 'email' é obrigatório.",
						stack: expect.any(String),
					}),
				},
			})
		);
	});

	test('Without required parameter - password', async () => {
		expect(
			signUpController.handle({
				ip: '0.0.0.0',
				userId: '',
				query: null,
				cookies: null,
				headers: null,
				body: { name: 'John Doe', email: 'john_doe@hotmail.com', confirmationPassword: 'John@123' },
			})
		).resolves.toMatchObject(
			expect.objectContaining({
				statusCode: 400,
				body: {
					success: false,
					message: 'Erro ao criar usuário.',
					result: expect.objectContaining({
						name: 'MissingParamError',
						message: "O parâmetro 'password' é obrigatório.",
						stack: expect.any(String),
					}),
				},
			})
		);
	});

	test('Without required parameter - confirmationPassword', async () => {
		expect(
			signUpController.handle({
				ip: '0.0.0.0',
				userId: '',
				query: null,
				cookies: null,
				headers: null,
				body: { name: 'John Doe', email: 'john_doe@hotmail.com', password: 'John@123' },
			})
		).resolves.toMatchObject(
			expect.objectContaining({
				statusCode: 400,
				body: {
					success: false,
					message: 'Erro ao criar usuário.',
					result: expect.objectContaining({
						name: 'MissingParamError',
						message: "O parâmetro 'confirmationPassword' é obrigatório.",
						stack: expect.any(String),
					}),
				},
			})
		);
	});
});
