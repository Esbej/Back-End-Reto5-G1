package Reto2_Web.repositorio;

import Reto2_Web.modelo.Order;
import Reto2_Web.repositorio.crud.InterfaceOrder;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Lenovo
 */
@Repository
public class OrderRepositorio {
    @Autowired
    private InterfaceOrder orderCrudRepository;

    public List<Order> getAll() {
        return (List<Order>) orderCrudRepository.findAll();
    }

    public Optional<Order> getOrder(int id) {
        return orderCrudRepository.findById(id);
    }
    public List<Order> findByZone(String zone){
        return orderCrudRepository.findByZone(zone);
    }

    public Order create(Order order) {
        return orderCrudRepository.save(order);
    }

    public void update(Order order) {
        orderCrudRepository.save(order);
    }

    public void delete(Order order) {
        orderCrudRepository.delete(order);
    }
    
    public List<Order> findOrdersSalesManById(int id){
        return orderCrudRepository.findOrdersSalesManById(id);
    }
    public List<Order> findOrdersSalesManByDate(Date date, int id){
        return orderCrudRepository.findOrdersSalesManByDate(date, id);
    }

    public List<Order> findOrdersSalesManByState(String state, int id){
        return orderCrudRepository.findOrdersSalesManByState(state, id);
    }
    public Optional<Order> lastUserId(){
        return orderCrudRepository.findTopByOrderByIdDesc();
    }

}
