import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { AppRouter } from "../../src/routes/AppRouter";

describe('Testing on <AppRouter />', () => {

    test('should show login if user is not logged in', () => {

        const contextValue = {
            logged: false,
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}> 
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter /> 
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getAllByText('Login').length ).toBe(2);

    });

    test('should show Marvel component if user is logged in', () => {

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Fernando'
            }
        }

        render(
            <MemoryRouter initialEntries={['/login']}> 
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter /> 
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getByText('Spider Man') ).toBeTruthy();
        expect( screen.getAllByText('Marvel').length ).toBeGreaterThanOrEqual(1);

        // screen.debug();

    });

});