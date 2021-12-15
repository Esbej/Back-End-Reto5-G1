/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Reto2_Web.controlador;

import Reto2_Web.servicio.GadgetService;
import Reto2_Web.modelo.Gadget;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author USUARIO
 */
@RestController
@RequestMapping("/api/gadget")
@CrossOrigin("*")
public class GadgetController {
    @Autowired
    private GadgetService itemService;
       
    @GetMapping("/all")
    public List<Gadget> getAll() {
        return itemService.getAll();
    }
    
    @GetMapping("/{reference}")
    public Optional<Gadget> getDevice(@PathVariable("reference") Integer id) {
        return itemService.getDevice(id);
    }
    @GetMapping("/description/{description}")
    public List<Gadget> getDeviceByDescription(@PathVariable("description") String description){
        return itemService.getDeviceByDescription(description);
    }
    
    @GetMapping("/price/{price}")
    public List<Gadget> getDeviceByPrice(@PathVariable("price") double price){
        return itemService.getDeviceByPrice(price);
    }
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Gadget create(@RequestBody Gadget gadget) {
        return itemService.create(gadget);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Gadget update(@RequestBody Gadget gadget) {
        return itemService.update(gadget);
    }

    @DeleteMapping("/{reference}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("reference") Integer id) {
        return itemService.delete(id);
    } 
    
}
