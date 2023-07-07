import { fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import UnidadeConsumidora from './UnidadeConsumidora';

jest.mock('axios');

describe('UnidadeConsumidora', () => {
  const unidadesMock = [
    { id: 1, apelido: 'Unidade 1', local: 'Local 1', marca: 'Marca 1', modelo: 'Modelo 1', ativo: true },
    { id: 2, apelido: 'Unidade 2', local: 'Local 2', marca: 'Marca 2', modelo: 'Modelo 2', ativo: true },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: unidadesMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza o componente corretamente com título "Lista de Unidades"', () => {
    const { getByText } = render(<UnidadeConsumidora />);

    const titulo = getByText('Lista de Unidades');
    expect(titulo).toBeInTheDocument();
  });

  it('renderiza a tabela com o cabeçalho correto', () => {
    const { getByText } = render(<UnidadeConsumidora />);

    const cabecalhoId = getByText('ID');
    const cabecalhoApelido = getByText('Apelido');
    const cabecalhoLocal = getByText('Local');
    const cabecalhoMarca = getByText('Marca');
    const cabecalhoModelo = getByText('Modelo');
    const cabecalhoAcoes = getByText('Ações');

    expect(cabecalhoId).toBeInTheDocument();
    expect(cabecalhoApelido).toBeInTheDocument();
    expect(cabecalhoLocal).toBeInTheDocument();
    expect(cabecalhoMarca).toBeInTheDocument();
    expect(cabecalhoModelo).toBeInTheDocument();
    expect(cabecalhoAcoes).toBeInTheDocument();
  });

  it('renderiza a primeira linha da tabela corretamente', async () => {
    const { getByText } = render(<UnidadeConsumidora />);

    await waitFor(() => {
      const linha1Id = getByText(unidadesMock[0].id.toString());
      const linha1Apelido = getByText(unidadesMock[0].apelido);
      const linha1Local = getByText(unidadesMock[0].local);
      const linha1Marca = getByText(unidadesMock[0].marca);
      const linha1Modelo = getByText(unidadesMock[0].modelo);

      expect(linha1Id).toBeInTheDocument();
      expect(linha1Apelido).toBeInTheDocument();
      expect(linha1Local).toBeInTheDocument();
      expect(linha1Marca).toBeInTheDocument();
      expect(linha1Modelo).toBeInTheDocument();
    });
  });

  it('testa o comportamento do botão "Editar"', async () => {
    const { getByText } = render(<UnidadeConsumidora />);

    await waitFor(() => {
      const botaoEditar = getByText('Editar');
      fireEvent.click(botaoEditar);

      const editarUnidadeTitulo = getByText('Editar Unidade');
      expect(editarUnidadeTitulo).toBeInTheDocument();
    });
  });

  it('testa o comportamento do botão "Remover"', async () => {
    const { getByText, queryByText } = render(<UnidadeConsumidora />);

    await waitFor(() => {
      const botaoRemover = getByText('Remover');
      fireEvent.click(botaoRemover);

      const confirmarRemocao = getByText('Confirmar remoção');
      expect(confirmarRemocao).toBeInTheDocument();

      const botaoCancelarRemocao = getByText('Cancelar');
      fireEvent.click(botaoCancelarRemocao);

      const confirmarRemocaoAposCancelar = queryByText('Confirmar remoção');
      expect(confirmarRemocaoAposCancelar).not.toBeInTheDocument();
    });
  });

  it('testa o comportamento do botão "Nova Unidade"', () => {
    const { getByText, getByLabelText } = render(<UnidadeConsumidora />);

    const botaoNovaUnidade = getByText('Adicionar Unidade Consumidora');
    fireEvent.click(botaoNovaUnidade);

    const labelApelido = getByLabelText('Apelido');
    const labelLocal = getByLabelText('Local');
    const labelMarca = getByLabelText('Marca');
    const labelModelo = getByLabelText('Modelo');

    expect(labelApelido).toBeInTheDocument();
    expect(labelLocal).toBeInTheDocument();
    expect(labelMarca).toBeInTheDocument();
    expect(labelModelo).toBeInTheDocument();
  });
});

