import React, { useState, useEffect } from 'react';


const EnergiaGerada = ({ unidades }) => {
  const [unidade, setUnidade] = useState('');
  const [data, setData] = useState('');
  const [kwGerado, setKwGerado] = useState('');
  const [totalCadastros, setTotalCadastros] = useState(0);
  const [totalKwGerado, setTotalKwGerado] = useState(0);

  const handleUnidadeChange = (event) => {
    setUnidade(event.target.value);
  };

  const handleDataChange = (event) => {
    setData(event.target.value);
  };

  const handleKwGeradoChange = (event) => {
    setKwGerado(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const novoCadastro = {
      unidade: unidade,
      data: data,
      kwGerado: parseFloat(kwGerado),
    };

    try {
      const response = await fetch('http://localhost:3000/cadastros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoCadastro),
      });

      if (response.ok) {
        console.log('Cadastro realizado com sucesso!');
        setTotalCadastros(totalCadastros + 1);
        setTotalKwGerado(totalKwGerado + parseFloat(kwGerado));
      } else {
        console.log('Erro ao realizar o cadastro.');
      }
    } catch (error) {
      console.log('Erro ao conectar com o servidor:', error);
    }
  };

  const calcularMediaEnergia = () => {
    if (totalCadastros === 0) {
      return 0;
    } else {
      const media = totalKwGerado / totalCadastros;
      return media.toFixed(3).replace('.', ',');
    }
  };

  const reiniciarValores = () => {
    setTotalCadastros(0);
    setTotalKwGerado(0);
  };

  useEffect(() => {
    const fetchCadastros = async () => {
      try {
        const response = await fetch('http://localhost:3000/cadastros');
        const data = await response.json();
        setTotalCadastros(data.length);

        let totalKW = 0;
        for (const cadastro of data) {
          totalKW += cadastro.kwGerado;
        }
        setTotalKwGerado(totalKW);
      } catch (error) {
        console.log('Erro ao conectar com o servidor:', error);
      }
    };

    fetchCadastros();
  }, []);

  return (
      <div>
        <h2>Lançamento de geração mensal</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="unidade">Unidade geradora:</label>
            <select id="unidade" value={unidade} onChange={handleUnidadeChange}>
              <option value="">Selecione uma unidade</option>
              {unidades.map((unidade) => (
                  <option key={unidade.id} value={unidade.apelido}>
                    {unidade.apelido}
                  </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="data">Mês/ano:</label>
            <input type="date" id="data" value={data} onChange={handleDataChange} />
          </div>
          <div>
            <label htmlFor="kwGerado">Total KW Gerado:</label>
            <input type="number" id="kwGerado" value={kwGerado} onChange={handleKwGeradoChange} />
          </div>
          <button type="submit">Cadastrar</button>
        </form>

        <p>Total de Cadastros: {totalCadastros}</p>
        <p>Total de KW Gerado: {totalKwGerado}</p>
        <span>Média de Energia: {calcularMediaEnergia()}</span>
        <div style={{ paddingTop: '5px' }}>
          <button onClick={reiniciarValores}>Reiniciar</button>
        </div>
      </div>
  );
};

export default EnergiaGerada;






