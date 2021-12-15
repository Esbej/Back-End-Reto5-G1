package Reto2_Web.servicio;

import Reto2_Web.modelo.Gadget;
import Reto2_Web.repositorio.GadgetRepositorio;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author USUARIO
 */
@Service
public class GadgetService {
     @Autowired
    private GadgetRepositorio product;

    public List<Gadget> getAll() {
        return product.getAll();
    }
    public Optional<Gadget> getDevice(Integer id) {
        return product.getDevice(id);
    }
    public List<Gadget> getDeviceByDescription(String description){
        return product.getDeviceByDescription(description);
    }
//Antes Optional
    public List<Gadget> getDeviceByPrice(double price){
        return product.getDeviceByPrice(price);
    }
    public Gadget create(Gadget item) {
        if (item.getId() == null) {
            return item;
        } else {
            return product.create(item);
        }
    }

    public Gadget update(Gadget item) {

        if (item.getId() != null) {
            Optional<Gadget> itemDb = product.getDevice(item.getId());
            if (!itemDb.isEmpty()) {
                
                if (item.getBrand()!= null) {
                    itemDb.get().setBrand(item.getBrand());
                }
                
                if (item.getCategory() != null) {
                    itemDb.get().setCategory(item.getCategory());
                }
                if (item.getName() != null) {
                    itemDb.get().setName(item.getName());
                }                
                if (item.getDescription() != null) {
                    itemDb.get().setDescription(item.getDescription());
                }
                if (item.getPrice() != 0.0) {
                    itemDb.get().setPrice(item.getPrice());
                }
                if (item.getQuantity() != 0) {
                    itemDb.get().setQuantity(item.getQuantity());
                }
                if (item.getPhotography() != null) {
                    itemDb.get().setPhotography(item.getPhotography());
                }
                itemDb.get().setAvailability(item.isAvailability());
                product.update(itemDb.get());
                return itemDb.get();
            } else {
                return item;
            }
        } else {
            return item;
        }
    }

    public boolean delete(Integer id) {
        Boolean aBoolean = getDevice(id).map(item -> {
            product.delete(item);
            return true;
        }).orElse(false);
        return aBoolean;
    }
    
    
}
