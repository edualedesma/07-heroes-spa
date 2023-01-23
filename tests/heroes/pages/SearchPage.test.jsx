import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

describe('Testing on <SearchPage />', () => {

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

});