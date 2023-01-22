import { types } from "../../../src/auth/types/types";

describe('Testing on "types.js"', () => {

    test('should return types', () => {

        // console.log(types);
        expect( types ).toEqual({ 
            login: '[Auth] Login', 
            logout: '[Auth] Logout' 
        });

    });

});