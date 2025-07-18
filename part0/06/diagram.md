```mermaid
sequenceDiagram
    Note right of Browser: User submit form
    Browser->>+Server: POST /exampleapp/new_note_spa
    Server-->>-Browser: 201 Created
    Note left of Server: JSON Content {"content":"test","date":"2025-07-13T12:00:06.410Z"}
```