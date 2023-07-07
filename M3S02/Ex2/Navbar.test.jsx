import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renderiza corretamente com logo e 3 botões/links', () => {
    const { getByAltText, getAllByRole } = render(
      <Router>
        <Navbar />
      </Router>
    );

    const logo = getByAltText('logo');
    expect(logo).toBeInTheDocument();

    const buttons = getAllByRole('link');
    expect(buttons.length).toBe(3);
  });



  it('o botão da rota default inicia selecionado e os demais não selecionados', () => {
    const { getByText } = render(
      <Router>
        <Navbar selectedButton="dashboard" />
      </Router>
    );

    const dashboardButton = getByText('Dashboard');
    const unidadeConsumidoraButton = getByText('Unidade Consumidora');
    const energiaGeradaButton = getByText('Cadastro de Energia Gerada');

    expect(dashboardButton).toHaveClass('selected');
    expect(unidadeConsumidoraButton).not.toHaveClass('selected');
    expect(energiaGeradaButton).not.toHaveClass('selected');
  });



  it('a página é alterada corretamente quando clica em algum botão', () => {
    const setSelectedButton = jest.fn();
    const { getByText } = render(
      <Router>
        <Navbar selectedButton="dashboard" setSelectedButton={setSelectedButton} />
      </Router>
    );

    const unidadeConsumidoraButton = getByText('Unidade Consumidora');
    fireEvent.click(unidadeConsumidoraButton);

    expect(setSelectedButton).toHaveBeenCalledWith('unidadeConsumidora');
  });
  

  it('a página é alterada para a default quando clica no logo', () => {
    const setSelectedButton = jest.fn();
    const { getByAltText } = render(
      <Router>
        <Navbar selectedButton="unidadeConsumidora" setSelectedButton={setSelectedButton} />
      </Router>
    );

    const logo = getByAltText('logo');
    fireEvent.click(logo);

    expect(setSelectedButton).toHaveBeenCalledWith('dashboard');
  });
});
