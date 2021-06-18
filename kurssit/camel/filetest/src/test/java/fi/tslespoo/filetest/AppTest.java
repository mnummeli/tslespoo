package fi.tslespoo.filetest;

import org.apache.camel.CamelContext;
import org.apache.camel.ProducerTemplate;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.impl.DefaultCamelContext;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AppTest {

    private static final Logger logger = LoggerFactory.getLogger(AppTest.class);

    @Test
    public void testFile() throws Exception {
        logger.info("Creating Camel context.");
        CamelContext context = new DefaultCamelContext();
        context.addRoutes(new RouteBuilder() {
            @Override
            public void configure() {
                from("test-jms:queue:test.queue").to("file://test");
            }
        });
        context.start();
        ProducerTemplate template = context.createProducerTemplate();
        for (int i = 0; i < 10; i++) {
            template.sendBody("test-jms:queue:test.queue", "Test Message: " + i);
        }
        context.stop();
        logger.info("Stopping Camel context.");
    }
}
