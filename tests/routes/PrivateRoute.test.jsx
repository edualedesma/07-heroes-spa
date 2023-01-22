import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/routes/PrivateRoute";

describe('Testing on <PrivateRoute />', () => {

    test('should show children when user is logged in', () => {

        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Alfonso'
            }
        }

        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Private route</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Private route') ).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith("lastPath", "/search?q=batman");

    });

});