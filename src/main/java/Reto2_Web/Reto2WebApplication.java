package Reto2_Web;
import Reto2_Web.interfaces.InterfaceUser;
import Reto2_Web.interfaces.InterfaceGadget;
import Reto2_Web.repositorio.crud.InterfaceOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Reto2WebApplication implements CommandLineRunner {

        @Autowired
        private InterfaceUser usercrudRepository;
        @Autowired
        private InterfaceGadget gadgetCrudRepository;
        @Autowired
        private InterfaceOrder orderCrudRepository;

	public static void main(String[] args) {
		SpringApplication.run(Reto2WebApplication.class, args);
	}

            @Override
        public void run(String... args) throws Exception {

            usercrudRepository.deleteAll();
            gadgetCrudRepository.deleteAll();
            orderCrudRepository.deleteAll();
        }
            @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*");
            }
        };
    }
}
