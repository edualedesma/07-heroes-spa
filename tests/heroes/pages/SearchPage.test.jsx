import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Testing on <SearchPage />', () => {

    beforeEach( () => jest.clearAllMocks() );

    test('should show with default values', () => {

        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        expect( container ).toMatchSnapshot();
        // screen.debug();

    })

    test('should show Batman heroe and the input with the query string value', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect( input.value ).toBe('batman');

        const img = screen.getByRole('img');
        expect( img.src ).toContain('/heroes/dc-batman.jpg')

        const divSearchAlert = screen.getByLabelText('search-hero-alert');
        expect ( divSearchAlert.style.display ).toBe('none');
        // screen.debug();

    })

    test('should show an error if hero "batman123" does not exists', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );

        const divNoHeroAlert = screen.getByLabelText('no-hero-alert');
        expect ( divNoHeroAlert.style.display ).not.toBe('none');
        // screen.debug();

    });

    test('should call navigate method to the new page', () => {

        const inputValue = 'superman';

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );

        // add value to input
        const inputSearch = screen.getByRole('textbox');
        fireEvent.change(inputSearch, { target: { name: 'searchText', value: inputValue }});
        
        // get form and fire submit form
        const form = screen.getByRole('form');
        fireEvent.submit(form);

        // call navigate
        expect( mockedUseNavigate ).toHaveBeenCalledWith(`?q=${ inputValue }`);

        // screen.debug();

    });

});