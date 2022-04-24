import { MockEmailService } from './email';
import { MockHashService } from './hash';
import { MockIpService } from './ip';
import { MockTokenService } from './token';
import { MockUserRepository } from './userRepository';
import { MockUuidService } from './uuid';

export const mockEmailService = new MockEmailService();
export const mockHashService = new MockHashService();
export const mockIpService = new MockIpService();
export const mockTokenService = new MockTokenService();
export const mockUserRepository = new MockUserRepository();
export const mockUuidService = new MockUuidService();
