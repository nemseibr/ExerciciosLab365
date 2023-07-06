import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../assets/NovaUnidade.css';


function NovaUnidade({ handleAddUnidade }) {
  const [apelido, setApelido] = useState('');
  const [local, setLocal] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ativo, setAtivo] = useState(false); // Novo estado para controlar o valor do checkbox


  

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaUnidade = {
      id: uuidv4().substr(0, 10), // Gera um ID único e o trunca para no máximo 10 caracteres
      apelido,
      local,
      marca,
      modelo,
      ativo, // Inclua o valor do checkbox no objeto novaUnidade
    };
    handleAddUnidade(novaUnidade);
    setApelido('');
    setLocal('');
    setMarca('');
    setModelo('');
    setAtivo(false); // Reinicie o estado do checkbox para desmarcado
  };

  return (
        
    <div className="novaunid">
      <h2>Cadastro de Unidade Geradora</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Apelido:</label>
          <input type="text" value={apelido} onChange={(e) => setApelido(e.target.value)} required placeholder="Painel 1" />
        </div>
        <div>
          <label>Local:</label>
          <input type="text" value={local} onChange={(e) => setLocal(e.target.value)} required placeholder="Rua Alberto 430" />
        </div>
        <div>
          <label>Marca:</label>
          <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} required placeholder="Resun" />
        </div>
        <div>
          <label>Modelo:</label>
          <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} required placeholder="115w" />
        </div>
        <div>
          <label>Ativo: </label>
          <input
            type="checkbox"
            checked={ativo} // Use o estado "ativo" para definir o valor do checkbox
            onChange={(e) => setAtivo(e.target.checked)} // Atualize o estado "ativo" quando o valor do checkbox mudar
            className="checkbox-custom"
          />
        </div >
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default NovaUnidade;