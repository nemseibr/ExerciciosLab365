import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../assets/Dashboard.css';

const Dashboard = ({ totalUnidades, unidadesAtivas, unidadesInativas, calcularMediaEnergia }) => {
    const data = [
        { name: 'Ativas', unidades: unidadesAtivas },
        { name: 'Inativas', unidades: unidadesInativas },
    ];

    return (
        <div className="container5">
            <div className="card-grafico">
            <div className="cards-container">
                <div className="card">
                    <div className="card-content">
                        <h2 className="card-title">Total de Unidades:</h2>
                        <h3 className="card-number">{totalUnidades}</h3>
                    </div>
                </div>

                <div className="card">
                    <div className="card-content">
                        <h2 className="card-title">Unidades Ativas:</h2>
                        <h3 className="card-number">{unidadesAtivas}</h3>
                    </div>
                </div>

                <div className="card">
                    <div className="card-content">
                        <h2 className="card-title">Unidades Inativas:</h2>
                        <h3 className="card-number">{unidadesInativas}</h3>
                    </div>
                </div>

                <div className="card">
                    <div className="card-content">
                        <h2 className="card-title">Média de Energia:</h2>
                        <h3 className="card-number">{calcularMediaEnergia()}</h3>
                    </div>
                </div>
            </div>

            <div className="chart-container">
                <BarChart className="custom-chart" width={900} height={600} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="unidades" fill="#8884d8" />
                </BarChart>
            </div>
            </div>
        </div>
    );
};

export default Dashboard;



