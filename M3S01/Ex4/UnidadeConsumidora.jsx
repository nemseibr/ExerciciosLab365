import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NovaUnidade from '../components/NovaUnidade';
import EditarUnidade from '../components/EditarUnidade';
import '../assets/UnidadeConsumidora.css';

const UnidadeConsumidora = () => {
  const [showListaUnidades, setShowListaUnidades] = useState(true);
  const [id, setId] = useState('');
  const [apelido, setApelido] = useState('');
  const [local, setLocal] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [unidades, setUnidades] = useState([]);
  const [editando, setEditando] = useState(false);
  const [unidadeEditando, setUnidadeEditando] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/units');
      setUnidades(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddUnidade = async (novaUnidade) => {
    try {
      const response = await axios.post('http://localhost:3000/units', novaUnidade);
      setUnidades([...unidades, response.data]);
      clearForm();
      setShowListaUnidades(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditUnidade = (unidade) => {
    setUnidadeEditando(unidade);
    setEditando(true);
    setShowListaUnidades(false);
  };

  const handleSaveUnidade = async (unidadeAtualizada) => {
    try {
      const response = await axios.put(`http://localhost:3000/units/${unidadeAtualizada.id}`, unidadeAtualizada);
      const updatedUnidades = unidades.map((unidade) => {
        if (unidade.id === unidadeAtualizada.id) {
          return response.data;
        }
        return unidade;
      });
      setUnidades(updatedUnidades);
      clearForm();
      setEditando(false);
      setShowListaUnidades(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveUnidade = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/units/${id}`);
      const updatedUnidades = unidades.filter((unidade) => unidade.id !== id);
      setUnidades(updatedUnidades);
    } catch (error) {
      console.error(error);
    }
  };

  const clearForm = () => {
    setId('');
    setApelido('');
    setLocal('');
    setMarca('');
    setModelo('');
  };

  const handleToggleView = () => {
    setShowListaUnidades(!showListaUnidades);
  };

  return (
      <div className="container">
        <header>
          <h1>Unidades</h1>
        </header>
        {showListaUnidades ? (
            <div>
              <h2>Lista de Unidades</h2>
              <div className="table-container">
                <table className="custom-table">
                  <thead>
                  <tr>
                    <th>Ativo?</th>
                    <th>ID</th>
                    <th>Apelido</th>
                    <th>Local</th>
                    <th>Marca</th>
                    <th>Modelo</th>

                    <th>Ações</th>
                  </tr>
                  </thead>
                  <tbody>
                  {unidades.map((unidade) => (
                      <tr key={unidade.id}>
                        <td className={unidade.ativo ? 'ativo' : 'inativo'}>
                          {unidade.ativo ? 'Ativo' : 'Inativo'}
                        </td>
                        <td>{unidade.id}</td>
                        <td>{unidade.apelido}</td>
                        <td>{unidade.local}</td>
                        <td>{unidade.marca}</td>
                        <td>{unidade.modelo}</td>
                        <td className="action-cell">
                          <button className="action-button edit-button" onClick={() => handleEditUnidade(unidade)}>Editar</button>
                          <button className="action-button remove-button" onClick={() => handleRemoveUnidade(unidade.id)}>Remover</button>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
                <button className="center-button" onClick={handleToggleView}>Adicionar Unidade Consumidora</button>
              </div>
            </div>
        ) : (
            <div>
              {editando ? (
                  <EditarUnidade
                      unidade={unidadeEditando}
                      handleSaveUnidade={handleSaveUnidade}
                      handleCancelEdit={() => {
                        setEditando(false);
                        setShowListaUnidades(true);
                      }}
                  />
              ) : (
                  <NovaUnidade
                      apelido={apelido}
                      local={local}
                      marca={marca}
                      modelo={modelo}
                      setApelido={setApelido}
                      setLocal={setLocal}
                      setMarca={setMarca}
                      setModelo={setModelo}
                      handleAddUnidade={handleAddUnidade}
                      clearForm={clearForm}
                  />
              )}
              <button onClick={handleToggleView}>Voltar</button>
            </div>
        )}
      </div>
  );
};

export default UnidadeConsumidora;
