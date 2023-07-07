import { fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import EnergiaGerada from './EnergiaGerada';

jest.mock('axios');

describe('EnergiaGerada', () => {
  const unidadesMock = [
    { id: 1, apelido: 'Unidade 1' },
    { id: 2, apelido: 'Unidade 2' },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: unidadesMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza o componente corretamente com título "Cadastro de Energia Gerada"', () => {
    const { getByText } = render(<EnergiaGerada unidades={unidadesMock} />);

    const titulo = getByText('Lançamento de geração mensal');
    expect(titulo).toBeInTheDocument();
  });

  it('não chama a função handleSubmit se algum campo obrigatório não estiver preenchido', () => {
    const { getByText } = render(<EnergiaGerada unidades={unidadesMock} />);
    const salvarBotao = getByText('Cadastrar');

    fireEvent.click(salvarBotao);

    expect(axios.post).not.toHaveBeenCalled();
  });

  it('chama a função handleSubmit e limpa o formulário ao salvar com todos os campos preenchidos', async () => {
    const { getByText, getByLabelText } = render(<EnergiaGerada unidades={unidadesMock} />);
    const unidadeSelect = getByLabelText('Unidade geradora:');
    const dataInput = getByLabelText('Mês/ano:');
    const kwGeradoInput = getByLabelText('Total KW Gerado:');
    const salvarBotao = getByText('Cadastrar');

    fireEvent.change(unidadeSelect, { target: { value: 'Unidade 1' } });
    fireEvent.change(dataInput, { target: { value: '2023-01-01' } });
    fireEvent.change(kwGeradoInput, { target: { value: '100' } });

    fireEvent.click(salvarBotao);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/cadastros', {
        unidade: 'Unidade 1',
        data: '2023-01-01',
        kwGerado: 100,
      });

      expect(unidadeSelect.value).toBe('');
      expect(dataInput.value).toBe('');
      expect(kwGeradoInput.value).toBe('');
    });
  });

  it('altera o estado do checkbox ao clicar', () => {
    const { getByLabelText } = render(<EnergiaGerada unidades={unidadesMock} />);
    const checkbox = getByLabelText('Checkbox');

    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(false);
  });

  it('inicia o formulário com campos vazios quando não houver unidade selecionada', () => {
    const { getByLabelText } = render(<EnergiaGerada unidades={unidadesMock} />);
    const unidadeSelect = getByLabelText('Unidade geradora:');
    const dataInput = getByLabelText('Mês/ano:');
    const kwGeradoInput = getByLabelText('Total KW Gerado:');

    expect(unidadeSelect.value).toBe('');
    expect(dataInput.value).toBe('');
    expect(kwGeradoInput.value).toBe('');
  });

  it('inicia o formulário com campos preenchidos com os valores da unidade selecionada', () => {
    const { getByLabelText } = render(<EnergiaGerada unidades={unidadesMock} />);
    const unidadeSelect = getByLabelText('Unidade geradora:');

    fireEvent.change(unidadeSelect, { target: { value: 'Unidade 1' } });

    const dataInput = getByLabelText('Mês/ano:');
    const kwGeradoInput = getByLabelText('Total KW Gerado:');

    expect(dataInput.value).toBe('Unidade 1');
    expect(kwGeradoInput.value).toBe('Unidade 1');
  });
});
