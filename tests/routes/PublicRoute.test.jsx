import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PublicRoute } from "../../src/routes/PublicRoute";

describe('Testing on <PublicRoute />', () => {

    test('should show children when user is not logged in', () => {

        const contextValue = {
            logged: false
        }

        render( 
            <AuthContext.Provider value={ contextValue }>
                <PublicRoute>
                    <h1>Public route</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Public route') ).toBeTruthy();
        //  screen.debug();

    });

    test('should navigate if user is logged in', () => {

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Eduardo A.'
            }
        }

        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>

                    <Routes>
                        {/* public route */}
                        <Route path="login" element={
                            <PublicRoute>
                            <h1>Public route</h1>
                        </PublicRoute>
                        } />
                        {/* private route */}
                        <Route path="marvel" element={ <h1>Marvel page</h1> } />
                    </Routes>

                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Marvel page') ).toBeTruthy();
        // //  screen.debug();

    });

});