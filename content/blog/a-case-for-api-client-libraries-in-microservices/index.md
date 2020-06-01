---
title: "A case for API client libraries in microservices architecture"
date: "2020-05-31T20:39:30.508Z"
description: "In this post, I will make a case for maintaining API client libraries for inter-process communication in microservices. I will present the benefits they will have for a team maintaining multiple services, and how it can improve the team collaboration."
---

In this post, I will make a case for maintaining API client libraries for inter-process communication in microservices. I will present the benefits they will have for a team maintaining multiple services, and how it can improve the team collaboration.

Microservices architecture is quite popular. Once you have microservices, you certainly have a few internal communication mechanisms. The interaction can be synchronous, asynchronous; it can be one-to-one or even one-to-many. Developing and integrating the integration is achieved with limited hurdles, and as often the case with engineering, the maintenance and collaboration are challenging.

With the teams I have worked, we often used HTTP based REST APIs for synchronous interactions. And, for asynchronous calls, we used SQS or Apache Kafka. Services were distributed across many small squads to develop and maintain. We would collaborate on inter-service dependency through postman collections or swagger documentation or a document spec with the payload details and examples.

For integrating third-party external APIs, an official client library by that target service comes in convenient. So, the question is, can the same notion be applied within a company for the internal services. Here are some points in its favour, and how to implement it effectively --

- Client libraries provide simple, `intuitive to use` interfaces.

- They can `abstract the implementation` of communication mechanism.
  For example, libraries can handle the implementation of REST, or gRPC or pushing queue messages.

- All the other services using client libraries can `avoid the boilerplate code` needed to implement the communication mechanism.

- In typed languages, the library can provide pre-defined `entity classes for the requests and responses`. So, they are essentially self-documented out of the box. And, with a good IDE, implementing such method calls is instinctual.

- Service authors can abstract the `error handling` boilerplate code and have custom, defined error classes.

- It provides control over the `versioning` of internal calls.

- Ease of pushing updates.

- Client libraries can provide `instrumentation`, by including logging of calls, events, errors. Such logs, traces will be useful information to measure performance, latency.

- Authors can use code generators to create API client libraries.
  For example, for REST APIs, you can check these ー
  - [openapi-generator](https://github.com/OpenAPITools/openapi-generator)
  - [swagger-codegen](https://github.com/swagger-api/swagger-codegen)

### Here is an example --

**Without a client:**

```javascript
const fetch = require("node-fetch")

async function createNewBlog() {
  const content = {
    title: "A case for API client libraries....",
    content: "Deal or No Deal....",
  }

  const response = await fetch("https://example.com/blogs", {
    method: "post",
    body: JSON.stringify(content),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    if (response.status === 400) {
      throw new ValidationError()
    }

    throw new MyCustomError(response.statusText)
  }

  return response.json()
}
```

\
**And, with a client:**

```javascript
const client = require("awesome-blog-client")

async function createNewBlog() {
  const content = {
    title: "A case for API client libraries....",
    content: "Deal or No Deal....",
  }

  try {
    const blog = await client.createBlog(content)
  } catch (err) {
    if (err instanceof ValidationError) {
      // handle validation error;
    } else {
      // handle other errors;
    }
  }
}
```

### So, is this worth the extra engineering effort?

Yes, I like to think so. It'll make my teammates happy to collaborate, and it'll certainly make me happy to maintain codebases.

What do you think? I will love to hear your thoughts on this topic.

_**#TODO** Link to a service boilerplate repo with API client library setup._
