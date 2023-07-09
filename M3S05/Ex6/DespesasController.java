import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/despesas")
public class DespesasController {

    private final DespesasService despesasService;

    @Autowired
    public DespesasController(DespesasService despesasService) {
        this.despesasService = despesasService;
    }

    @PostMapping
    public ResponseEntity<Despesas> criarDespesa(@RequestBody Despesas despesa) {
        Despesas novaDespesa = despesasService.criarDespesa(despesa);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaDespesa);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Despesas> buscarDespesaPorId(@PathVariable Long id) {
        Despesas despesa = despesasService.buscarDespesaPorId(id);
        if (despesa != null) {
            return ResponseEntity.ok(despesa);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Despesas>> buscarTodasDespesas() {
        List<Despesas> despesas = despesasService.buscarTodasDespesas();
        return ResponseEntity.ok(despesas);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarDespesa(@PathVariable Long id) {
        despesasService.deletarDespesa(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Despesas> atualizarDespesa(@PathVariable Long id, @RequestBody Despesas despesa) {
        Despesas despesaExistente = despesasService.buscarDespesaPorId(id);

        if (despesaExistente == null) {
            return ResponseEntity.notFound().build();
        }

        // Verificar se a despesa está paga e não permitir a alteração
        if ("Pago".equals(despesaExistente.getStatus())) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }

        // Copiar os atributos permitidos da despesa recebida para a despesa existente
        despesaExistente.setDescricao(despesa.getDescricao());
        despesaExistente.setValor(despesa.getValor());

        // Salvar a despesa atualizada no banco de dados
        Despesas despesaAtualizada = despesasService.atualizarDespesa(despesaExistente);

        return ResponseEntity.ok(despesaAtualizada);
    }

    @GetMapping("/por-status/{status}")
    public ResponseEntity<List<Despesas>> buscarDespesasPorStatus(@PathVariable String status) {
        List<Despesas> despesas = despesasService.buscarDespesasPorStatus(status);
        if (despesas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(despesas);
    }

    @PutMapping("/{id}/estornar")
    public ResponseEntity<Despesas> estornarDespesa(@PathVariable Long id) {
        Despesas despesa = despesasService.buscarDespesaPorId(id);
        if (despesa == null) {
            return ResponseEntity.notFound().build();
        }

        // Atualizar a data de pagamento para null
        despesa.setDataPagamento(null);

        // Atualizar o status para "Pendente"
        despesa.setStatus("Pendente");

        Despesas despesaEstornada = despesasService.atualizarDespesa(despesa);
        return ResponseEntity.ok(despesaEstornada);
    }

}

