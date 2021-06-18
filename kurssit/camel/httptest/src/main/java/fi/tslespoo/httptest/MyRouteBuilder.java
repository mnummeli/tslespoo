package fi.tslespoo.httptest;

import org.apache.camel.builder.RouteBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MyRouteBuilder extends RouteBuilder {

    private static final Logger logger = LoggerFactory.getLogger(MyRouteBuilder.class);

    @Override
    public void configure() throws Exception {
        from("direct:start")
                .to("http://localhost:3000/kissat")
                .process(exchange -> {
                    logger.info(exchange.getMessage().toString());
                });
    }
}
