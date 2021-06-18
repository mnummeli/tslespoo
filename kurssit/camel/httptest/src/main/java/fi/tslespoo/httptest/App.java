package fi.tslespoo.httptest;

import org.apache.camel.CamelContext;
import org.apache.camel.ProducerTemplate;
import org.apache.camel.impl.DefaultCamelContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class App {

    private static final Logger logger = LoggerFactory.getLogger(App.class);

    public static void main(String... args) {
        try (CamelContext camelContext = new DefaultCamelContext()) {
            logger.info("CamelContext was created.");
            camelContext.addRoutes(new MyRouteBuilder());
            ProducerTemplate template = camelContext.createProducerTemplate();
            camelContext.start();
            template.asyncSendBody("direct-vm:source", "TSL rules!");
        } catch (Exception e) {
            logger.error("Something went wrong with the Camel context.", e);
        }
    }
}
