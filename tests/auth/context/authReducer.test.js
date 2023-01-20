import { authReducer, types } from "../../../src/auth";

describe('Testing on authReducer', () => {

    test('should return default state', () => {

        const state = authReducer({ logged: false }, {});
        expect( state ).toEqual( { logged: false } );

    });

    test('should login', () => {

        const action = {
            type: types.login,
            payload: {
                id: 'ABC',
                name: 'Eduardo Ac'
            }
        };
        const state = authReducer({ logged: false }, action);
        expect( state ).toEqual({ 
            logged: true, 
            user: action.payload 
        });

    });

    test('should logout', () => {

        const initialState = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Eduardo Ac'
            }
        };
        const action = {
            type: types.logout
        };
        const state = authReducer(initialState, action);
        expect( state ).toEqual({ logged: false });

    });

});