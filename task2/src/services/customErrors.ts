export class EnvironmentVariableError extends Error { //create a custom error class for missing environment variables
    // This class extends the built-in Error class to provide a specific error for missing environment variables      
    constructor(variable: string){
        super(`Missing required environment variable: ${variable}`); // Construct the error message with the variable name
        this.name = `EnvironmentVariableError`; 
    }
}

export class MissingHeaderError extends Error { // Custom error for missing headers
    // This error is thrown when a required header is missing in the request.
    constructor(userAgent: string){ // Constructor accepts the name of the missing header
        super(`Missing required header: ${userAgent}`);
        this.name = `MissingHeaderError`;
    }
}

