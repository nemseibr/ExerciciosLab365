import com.example.exerciciotestes.controller.request.ClienteRequest;
import com.example.exerciciotestes.model.Cliente;
import com.example.exerciciotestes.repository.ClienteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class ClienteServiceTest {
    @Mock
    private ClienteRepository clienteRepository;

    private ClienteService clienteService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        clienteService = new ClienteService(clienteRepository);
    }

    @Test
    void buscaTodosClientes_DeveRetornarListaVazia_QuandoNenhumClienteExistir() {
        // Arrange
        when(clienteRepository.findAll()).thenReturn(new ArrayList<>());

        // Act
        List<Cliente> clientes = clienteService.buscaTodosClientes();

        // Assert
        assertTrue(clientes.isEmpty());
        verify(clienteRepository, times(1)).findAll();
    }

    @Test
    void buscaClientePorId_DeveRetornarClienteCorreto_QuandoClienteExistir() {
        // Arrange
        Long clienteId = 1L;
        Cliente cliente = new Cliente("Nome do Cliente", 100.0);
        when(clienteRepository.findById(clienteId)).thenReturn(Optional.of(cliente));

        // Act
        Cliente clienteEncontrado = clienteService.buscaClientePorId(clienteId);

        // Assert
        assertNotNull(clienteEncontrado);
        assertEquals(clienteId, clienteEncontrado.getId());
        assertEquals(cliente.getNomeCliente(), clienteEncontrado.getNomeCliente());
        assertEquals(cliente.getSaldoCliente(), clienteEncontrado.getSaldoCliente());
        verify(clienteRepository, times(1)).findById(clienteId);
    }
}
