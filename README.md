# ProMage Project Management System

The ProMage Project Management System is designed to facilitate project tracking, task management, and team coordination with a focus on interconnectivity through webhooks for real-time updates.

### Prerequisites

Before running the ProMage system, ensure you have the following installed:

Node.js (v14.x or newer)
MongoDB (v4.x or newer)
npm (v6.x or newer)

### Installing

The main ProMage application is developed with TypeScript, offering robust typing and development features.

### Running the Main Application (TypeScript)

1. Install dependencies:

   `npm install`

2. Start the application:
   `npm run build`
   `npm run dev`

3. For unit tests
   `npm run build`
   `npm run test`

### Running the Logger Application (Node.js JavaScript)

Running the Logger Application (Node.js JavaScript)

1. npm install
2. npm run start

## Api Postman collection

Postman Api collection is given in postmen_collections

### Architecture and Design

The ProMage system adopts a microservice-oriented architecture to ensure scalability and flexibility. The system is divided into two main components:

Main Application: Handles project and task management, leveraging TypeScript for safer and more maintainable code.
Logger Application: A Node.js JavaScript application that listens for webhook events from the main application and logs them for auditing purposes.

### Key Design Decisions

Webhook Integration: Enables real-time logging and external integrations, facilitating an event-driven architecture.
Microservice Approach: By separating the logger as an independent application, we ensure that the system is modular and services can be scaled independently.
TypeScript for Core Application: Offers compile-time type checking, enhancing code reliability and maintainability.
