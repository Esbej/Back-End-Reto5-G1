/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package Reto2_Web.web;

import Reto2_Web.modelo.Order;
import Reto2_Web.servicio.OrderService;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.text.SimpleDateFormat;
import java.text.ParseException;
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
 * @author 
 */
@RestController
@RequestMapping("/api/order")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/all")
    public List<Order> getAll() {
        return orderService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Order> getOrder(@PathVariable("id") int id) {
        return orderService.getOrder(id);
    }
    @GetMapping("/zona/{ZONA}")
    public List<Order> getOrderZona(@PathVariable("ZONA") String zona){
        return orderService.findByZone(zona);
    }
    @GetMapping("/salesman/{id}")
    public List<Order> getOrdersSalesManById(@PathVariable("id") int id){
        return orderService.findOrdersSalesManById(id);
    }

    @GetMapping("/date/{date}/{id}")
    public List<Order> getOrdersSalesManByDate(@PathVariable("date") String date, @PathVariable("id") int id){
        return orderService.findOrdersSalesManByDate(ParseFecha(date), id);
    }
    @GetMapping("/state/{state}/{id}")
    public List<Order> getOrdersSalesManByState(@PathVariable("state") String state, @PathVariable("id") int id){
        return orderService.findOrdersSalesManByState(state, id);
    }
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Order create(@RequestBody Order gadget) {
        return orderService.create(gadget);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Order update(@RequestBody Order gadget) {
        return orderService.update(gadget);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id) {
        return orderService.delete(id);
    }

        /**
     * Permite convertir un String en fecha (Date).
     * @param fecha Cadena de fecha dd/MM/yyyy
     * @return Objeto Date
     */
    public static Date ParseFecha(String fecha)
    {
     try {
            return (new SimpleDateFormat("yyyy-MM-dd").parse(fecha));
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }
    
}
