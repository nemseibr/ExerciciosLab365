import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DespesasService {

    private final DespesasRepository despesasRepository;

    @Autowired
    public DespesasService(DespesasRepository despesasRepository) {
        this.despesasRepository = despesasRepository;
    }

    public Despesas criarDespesa(Despesas despesa) {
        // Definir status padrão como "Pendente"
        despesa.setStatus("Pendente");
        return despesasRepository.save(despesa);
    }

    public Despesas buscarDespesaPorId(Long id) {
        return despesasRepository.findById(id);
    }

    public List<Despesas> buscarTodasDespesas() {
        return despesasRepository.findAll();
    }

    public void deletarDespesa(Long id) {
        Despesas despesa = despesasRepository.findById(id);
        if (despesa != null) {
            despesasRepository.delete(despesa);
        }

        public List<Despesas> buscarDespesasPorStatus(String status) {
            return despesasRepository.findByStatus(status);
        }

        public Despesas atualizarDespesa(Despesas despesa) {
            return despesasRepository.save(despesa);
        }


    }


}
