import fastify from "fastify";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";

import cors from "@fastify/cors";

import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

import { createTrip } from "./routes/create-trip";
import { confirmTrip } from "./routes/confirm-trip";
import { confirmParticipants } from "./routes/confirm-participants";
import { createActivity } from "./routes/create-activity";
import { createLink } from "./routes/create-link";
import { getActivities } from "./routes/get-activities";
import { getLinks } from "./routes/get-links";
import { getParticipant } from "./routes/get-participant";
import { getParticipants } from "./routes/get-participants";
import { getTripDetails } from "./routes/get-trip-details";
import { updateTrip } from "./routes/update-trip";
import { createInvite } from "./routes/create-invite";

import { env } from "./env";

import { errorHandler } from "./error-handler";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler);

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'NLW Journey',
            description: 'Especificações da API para o back-end da aplicação plann.er construída durante o NLW Journey da Rocketseat.',
            version: '1.0.0',
        },
        servers: [],
    },

    transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
    routePrefix: '/reference',
})

app.register(cors, {
    origin: "*"
})

app.register(createTrip);
app.register(confirmTrip);
app.register(confirmParticipants);
app.register(createActivity);
app.register(getActivities);
app.register(createLink);
app.register(getLinks);
app.register(getParticipants);
app.register(createInvite);
app.register(updateTrip);
app.register(getTripDetails);
app.register(getParticipant);

app.listen({
    port: env.PORT,
    host: "0.0.0.0"
}).then(() => console.log(`🔥 HTTP server running at localhost:${env.PORT}`))