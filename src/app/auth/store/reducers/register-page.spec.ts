import { reducer } from './register-page';
import * as fromRegisterPage from './register-page';
import { Register, RegisterSuccess, RegisterFailure, Logout } from '../actions/auth';
import { Authenticate, AuthResponse, User, SignUp } from '../models/user';

describe('RegisterPageReducer', () => {
  const user: User = {
    name: 'test_user',
    groups: [{ id: 1, name: 'test_group' }],
    email: 'test_email',
  };
  const authResp: AuthResponse = { user: user, token: 'test_token' };
  const authenticate: Authenticate = { email: 'test', password: 'password' };
  const signup: SignUp = {name: 'test_name', email: 'test@test.com', password: 'test_password' };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('REGISTER', () => {
    it('should make pending to true', () => {
      const createAction = new Register(signup);

      const expectedResult = {
        error: null,
        pending: true,
      };

      const result = reducer(fromRegisterPage.initialState, createAction);

      expect(result).toMatchSnapshot();
    });
  });

  describe('REGISTER_SUCCESS', () => {
    it('should have no error and no pending state', () => {
      const createAction = new RegisterSuccess(authResp);

      const expectedResult = {
        error: null,
        pending: false,
      };

      const result = reducer(fromRegisterPage.initialState, createAction);

      expect(result).toMatchSnapshot();
    });
  });

  describe('REGISTER_FAILURE', () => {
    it('should have an error and no pending state', () => {
      const error = 'register failed';
      const createAction = new RegisterFailure(error);

      const expectedResult = {
        error: error,
        pending: false,
      };

      const result = reducer(fromRegisterPage.initialState, createAction);

      expect(result).toMatchSnapshot();
    });
  });
});
