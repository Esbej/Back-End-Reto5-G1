/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package Reto2_Web.interfaces;


import Reto2_Web.modelo.Gadget;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

/**
 *
 * @author USUARIO
 */
public interface InterfaceGadget extends MongoRepository<Gadget, Integer> {

    @Query("{description:{$regex:?0}}")
    List<Gadget> getDeviceByDescription(final String description);
    
    @Query("{price:{$lte:?0}}")
    List<Gadget> getDeviceByPrice(final double price);


}
