import com.example.exerciciotestes.controller.request.VendaRequest;
import com.example.exerciciotestes.model.Cliente;
import com.example.exerciciotestes.model.Produto;
import com.example.exerciciotestes.model.Venda;
import com.example.exerciciotestes.repository.VendaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class VendaServiceTest {
    @Mock
    private VendaRepository vendaRepository;

    @Mock
    private ClienteService clienteService;

    @Mock
    private ProdutoService produtoService;

    private VendaService vendaService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        vendaService = new VendaService(vendaRepository, clienteService, produtoService);
    }

    @Test
    void realizarVenda_DeveRetornarVendaCriada_QuandoDadosValidos() {
        // Arrange
        Long clienteId = 1L;
        List<Long> produtosIds = List.of(1L, 2L);
        Double valorVenda = 100.0;

        Cliente cliente = new Cliente("Nome do Cliente", 200.0);
        when(clienteService.buscaClientePorId(clienteId)).thenReturn(cliente);

        List<Produto> produtos = new ArrayList<>();
        Produto produto1 = new Produto("Produto 1", 50.0);
        Produto produto2 = new Produto("Produto 2", 40.0);
        produtos.add(produto1);
        produtos.add(produto2);
        when(produtoService.buscaProdutosPorIds(produtosIds)).thenReturn(produtos);

        VendaRequest vendaRequest = new VendaRequest(clienteId, produtosIds, valorVenda);

        Venda vendaSalva = new Venda(1L, valorVenda, cliente, produtos);
        when(vendaRepository.save(any(Venda.class))).thenReturn(vendaSalva);

        // Act
        Venda vendaCriada = vendaService.realizarVenda(vendaRequest);

        // Assert
        assertNotNull(vendaCriada);
        assertEquals(vendaSalva.getId(), vendaCriada.getId());
        assertEquals(valorVenda, vendaCriada.getValorVenda());
        assertEquals(cliente, vendaCriada.getCliente());
        assertEquals(produtos, vendaCriada.getProdutos());
        verify(clienteService, times(1)).buscaClientePorId(clienteId);
        verify(produtoService, times(1)).buscaProdutosPorIds(produtosIds);
        verify(vendaRepository, times(1)).save(any(Venda.class));
    }
}
