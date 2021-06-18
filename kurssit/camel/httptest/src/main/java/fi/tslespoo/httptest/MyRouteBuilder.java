package fi.tslespoo.httptest;

import org.apache.camel.builder.RouteBuilder;

public class MyRouteBuilder extends RouteBuilder {

    @Override
    public void configure() throws Exception {
        from("direct-vm:source")
                .bean(new Object() {
                    public void sayHello(String message) {
                        System.out.println(message);
                    }
                });
    }
}
