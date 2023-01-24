import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HeroPage } from "../../../src/heroes/pages/HeroPage";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Testing on <HeroPage />', () => {

    beforeEach( () => jest.clearAllMocks() );

    test('should show the initial state of the component', () => {

        const { container } = render(
            <MemoryRouter initialEntries={['/hero/dc-superman']}>
                <Routes>
                    <Route path='hero/:id' element={ <HeroPage /> } />
                </Routes>
            </MemoryRouter>
        );

        expect( container ).toMatchSnapshot();
        // screen.debug();

    });

    test('should show superman hero card', () => {

        render(
            <MemoryRouter initialEntries={['/hero/dc-superman']}>
                <Routes>
                    <Route path='hero/:id' element={ <HeroPage /> } />
                </Routes>
            </MemoryRouter>
        );

        const img = screen.getByRole('img');
        expect( img.alt ).toBe('Superman');
        expect( screen.getByText('Superman') ).toBeTruthy();
        // screen.debug();

    });

    test('should redirect to "/marvel" page if hero does not exist', () => {

        render(
            <MemoryRouter initialEntries={['/hero/dc-supermannn']}>
                <Routes>
                    <Route path='hero/:id' element={ <HeroPage /> } />
                    <Route path='/marvel' element={ <h1>Marvel Page</h1> } />
                </Routes>
            </MemoryRouter>
        );

        // expect( mockedUseNavigate ).toHaveBeenCalled();
        expect( screen.getByText('Marvel Page') ).toBeTruthy();
        // screen.debug();
    });

    test('should redirect to back page if click on back button', () => {

        render(
            <MemoryRouter initialEntries={['/hero/dc-superman']}>
                <Routes>
                    <Route path='hero/:id' element={ <HeroPage /> } />
                </Routes>
            </MemoryRouter>
        );

        const btn = screen.getByRole('button');
        fireEvent.click( btn );

        expect( mockedUseNavigate ).toHaveBeenCalled();
        // screen.debug();
    });

});