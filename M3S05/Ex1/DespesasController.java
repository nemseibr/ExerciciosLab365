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



}
