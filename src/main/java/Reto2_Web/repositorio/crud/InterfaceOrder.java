package Reto2_Web.repositorio.crud;

import Reto2_Web.modelo.Order;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
/**
 *
 * @author Lenovo
 */
public interface InterfaceOrder extends MongoRepository<Order, Integer> {
    
    //Retorna las ordenes de pedido que coincidad con la zona recibida como parametro
    @Query("{'salesMan.zone': ?0}")
    List<Order> findByZone(final String country);

    @Query("{id: ?0}")
    Optional<Order> findById(final Integer id);
    
    //Retorna las ordenes x estado
    @Query("{status: ?0}")
    List<Order> findByStatus(final String status);

    @Query("{'salesMan.id': ?0}")
    List<Order> findOrdersSalesManById(Integer id);

    @Query("{$and:[{registerDay:?0},{'salesMan.id':?1}]}")
    List<Order> findOrdersSalesManByDate(Date date, Integer id);

    @Query("{$and:[{status:?0},{'salesMan.id':?1}]}")
    List<Order> findOrdersSalesManByState(String status, Integer id);
    
    //Para seleccionar la orden con el id maximo
    Optional<Order> findTopByOrderByIdDesc();
}