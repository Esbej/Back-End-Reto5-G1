/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Reto2_Web.repositorio;

import Reto2_Web.interfaces.InterfaceGadget;
import Reto2_Web.modelo.Gadget;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author USUARIO
 */
@Repository
public class GadgetRepositorio {
    @Autowired
    private InterfaceGadget repo;
    public List<Gadget> getAll() {
        return repo.findAll();
    }

    public Optional<Gadget> getDevice(Integer id) {
        return repo.findById(id);
    }

    public List<Gadget> getDeviceByDescription(String description){
        return repo.getDeviceByDescription(description);
    }
    
    public List<Gadget> getDeviceByPrice(double price){
        return repo.getDeviceByPrice(price);
    }
    public Gadget create(Gadget device) {
        return repo.save(device);
    }

    public void update(Gadget device) {
        repo.save(device);
    }
    
    public void delete(Gadget device) {
        repo.delete(device);
    }
}
