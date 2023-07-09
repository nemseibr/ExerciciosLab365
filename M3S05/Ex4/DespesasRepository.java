import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DespesasRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public Despesas save(Despesas despesa) {
        entityManager.persist(despesa);
        return despesa;
    }

    public Despesas findById(Long id) {
        return entityManager.find(Despesas.class, id);
    }

    public List<Despesas> findAll() {
        TypedQuery<Despesas> query = entityManager.createQuery("SELECT d FROM Despesas d", Despesas.class);
        return query.getResultList();
    }

    public void delete(Despesas despesa) {
        entityManager.remove(despesa);
    }

    public List<Despesas> findByStatus(String status) {
        TypedQuery<Despesas> query = entityManager.createQuery("SELECT d FROM Despesas d WHERE d.status = :status", Despesas.class);
        query.setParameter("status", status);
        return query.getResultList();
    }

}
