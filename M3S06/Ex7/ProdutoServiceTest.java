import com.example.exerciciotestes.controller.request.ProdutoRequest;
import com.example.exerciciotestes.model.Produto;
import com.example.exerciciotestes.repository.ProdutoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class ProdutoServiceTest {
    @Mock
    private ProdutoRepository produtoRepository;

    private ProdutoService produtoService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        produtoService = new ProdutoService(produtoRepository);
    }

    @Test
    void buscaTodosProdutos_DeveRetornarListaVazia_QuandoNenhumProdutoExistir() {
        // Arrange
        when(produtoRepository.findAll()).thenReturn(new ArrayList<>());

        // Act
        List<Produto> produtos = produtoService.buscaTodosProdutos();

        // Assert
        assertTrue(produtos.isEmpty());
        verify(produtoRepository, times(1)).findAll();
    }

    @Test
    void buscaProdutoPorId_DeveRetornarProdutoCorreto_QuandoProdutoExistir() {
        // Arrange
        Long produtoId = 1L;
        Produto produto = new Produto("Nome do Produto", 10.0);
        when(produtoRepository.findById(produtoId)).thenReturn(Optional.of(produto));

        // Act
        Produto produtoEncontrado = produtoService.buscaProdutoPorId(produtoId);

        // Assert
        assertNotNull(produtoEncontrado);
        assertEquals(produtoId, produtoEncontrado.getId());
        assertEquals(produto.getNomeProduto(), produtoEncontrado.getNomeProduto());
        assertEquals(produto.getValorProduto(), produtoEncontrado.getValorProduto());
        verify(produtoRepository, times(1)).findById(produtoId);
    }

    @Test
    void salvarProduto_DeveRetornarProdutoSalvo_QuandoDadosValidos() {
        // Arrange
        ProdutoRequest produtoRequest = new ProdutoRequest();
        produtoRequest.setNomeProduto("Nome do Produto");
        produtoRequest.setValorProduto(10.0);

        Produto produtoSalvo = new Produto("Nome do Produto", 10.0);
        when(produtoRepository.save(any(Produto.class))).thenReturn(produtoSalvo);

        // Act
        Produto produtoRetornado = produtoService.salvarProduto(produtoRequest);

        // Assert
        assertNotNull(produtoRetornado);
        assertEquals(produtoSalvo.getNomeProduto(), produtoRetornado.getNomeProduto());
        assertEquals(produtoSalvo.getValorProduto(), produtoRetornado.getValorProduto());
        verify(produtoRepository, times(1)).save(any(Produto.class));
    }

    @Test
    void atualizarProduto_DeveRetornarProdutoAtualizado_QuandoProdutoExistir() {
        // Arrange
        Long produtoId = 1L;
        ProdutoRequest produtoRequest = new ProdutoRequest();
        produtoRequest.setNomeProduto("Nome Atualizado");
        produtoRequest.setValorProduto(20.0);

        Produto produtoAtual = new Produto("Nome Antigo", 10.0);
        when(produtoRepository.findById(produtoId)).thenReturn(Optional.of(produtoAtual));

        Produto produtoAtualizado = new Produto("Nome Atualizado", 20.0);
        when(produtoRepository.save(any(Produto.class))).thenReturn(produtoAtualizado);

        // Act
        Produto produtoRetornado = produtoService.atualizarProduto(produtoId, produtoRequest);

        // Assert
        assertNotNull(produtoRetornado);
        assertEquals(produtoId, produtoRetornado.getId());
        assertEquals(produtoRequest.getNomeProduto(), produtoRetornado.getNomeProduto());
        assertEquals(produtoRequest.getValorProduto(), produtoRetornado.getValorProduto());
        verify(produtoRepository, times(1)).findById(produtoId);
        verify(produtoRepository, times(1)).save(any(Produto.class));
    }
}
