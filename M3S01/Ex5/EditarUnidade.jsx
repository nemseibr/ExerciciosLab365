import React, { useState } from 'react';


function EditarUnidade({ unidade, handleSaveUnidade, handleCancelEdit }) {
  const [apelido, setApelido] = useState(unidade.apelido);
  const [local, setLocal] = useState(unidade.local);
  const [marca, setMarca] = useState(unidade.marca);
  const [modelo, setModelo] = useState(unidade.modelo);
  const [ativo, setAtivo] = useState(unidade.ativo); // Novo estado para controlar o valor do checkbox

  const handleSubmit = (e) => {
    e.preventDefault();
    const unidadeAtualizada = {
      id: unidade.id,
      apelido,
      local,
      marca,
      modelo,
      ativo, // Inclua o valor do checkbox no objeto atualizado
    };
    handleSaveUnidade(unidadeAtualizada);
  };

  return (
    <div>
      <h2>Editar Unidade</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Apelido: </label>
          <input type="text" value={apelido} onChange={(e) => setApelido(e.target.value)} required />
        </div>
        <div>
          <label>Local: </label>
          <input type="text" value={local} onChange={(e) => setLocal(e.target.value)} required />
        </div>
        <div>
          <label>Marca: </label>
          <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} required />
        </div>
        <div>
          <label>Modelo: </label>
          <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} required />
        </div>
        <div>
          <label>Ativo: </label>
          <input
            type="checkbox"
            checked={ativo} // Use o estado "ativo" para definir o valor do checkbox
            onChange={(e) => setAtivo(e.target.checked)} // Atualize o estado "ativo" quando o valor do checkbox mudar
            className="checkbox-custom"
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default EditarUnidade;
