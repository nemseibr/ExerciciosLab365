import com.example.exerciciotestes.controller.request.ClienteRequest;
import com.example.exerciciotestes.model.Cliente;
import com.example.exerciciotestes.repository.ClienteRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest
@AutoConfigureMockMvc
public class ClienteControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ClienteRepository clienteRepository;

    @Test
    public void getAllClientes_ShouldReturnOk() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/clientes")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(print());
    }

    @Test
    public void getClienteById_ExistingId_ShouldReturnOk() throws Exception {
        // Arrange
        Cliente cliente = new Cliente("Nome do Cliente", 100.0);
        clienteRepository.save(cliente);

        // Act & Assert
        mockMvc.perform(MockMvcRequestBuilders.get("/clientes/{id}", cliente.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(print());
    }

    @Test
    public void getClienteById_NonExistingId_ShouldReturnNotFound() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/clientes/{id}", 9999)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andDo(print());
    }

    @Test
    public void saveCliente_ValidRequest_ShouldReturnCreated() throws Exception {
        // Arrange
        ClienteRequest clienteRequest = new ClienteRequest();
        clienteRequest.setNomeCliente("Novo Cliente");
        clienteRequest.setSaldoCliente(200.0);

        // Act & Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/clientes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(JsonUtil.toJson(clienteRequest)))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(print());
    }

    @Test
    public void saveCliente_InvalidRequest_ShouldReturnBadRequest() throws Exception {
        // Arrange
        ClienteRequest clienteRequest = new ClienteRequest();
        clienteRequest.setNomeCliente(""); // Empty name, invalid request

        // Act & Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/clientes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(JsonUtil.toJson(clienteRequest)))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andDo(print());
    }
}
