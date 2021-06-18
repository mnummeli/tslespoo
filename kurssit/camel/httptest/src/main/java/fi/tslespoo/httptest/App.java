package fi.tslespoo.httptest;

import org.apache.camel.CamelContext;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.impl.DefaultCamelContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class App {

    private static final Logger logger = LoggerFactory.getLogger(App.class);

    public static void main(String... args) {
        try (CamelContext camelContext = new DefaultCamelContext()) {
            logger.info("CamelContext was created.");
            // camelContext.addRoutes(new MyRouteBuilder());
            // ProducerTemplate template = camelContext.createProducerTemplate();
            camelContext.addRoutes(new RouteBuilder() {
                @Override
                public void configure() {
                    from("timer:foo")
                            .to("http://localhost:3000/kissat")
                            .process(exchange -> {
                                logger.info(exchange.getMessage().getBody().toString());
                            });
                }
            });
            camelContext.start();
            Thread.sleep(10_000);
            camelContext.stop();
        } catch (Exception e) {
            logger.error("Something went wrong with the Camel context.", e);
        }
    }
}
