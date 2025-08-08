# parser-template
Parser Template
This is a generated template based on your parser config created from the Notifi Admin Panel

## Prerequisites
- Docker and VS Code installed
- Notifi Admin Portal credentials
- Valid Fusion Source ID and Smart Link ID

## Installation

Create a new parser project using the following command:

```bash
npx @notifi-network/create-parser --fusionSourceId {fusionSourceId}
```

Replace:
- `{fusionSourceId}` with your actual Fusion Source ID (also referred to as parser ID)

This command will create a new project with all necessary dependencies and configuration files.

## Setup Steps

### 1. Authentication
First, authenticate with your Notifi credentials:
```bash
npm run auth
```
This will prompt you to log in using your Notifi Admin Portal credentials and will update your `notifi-config` accordingly.

### 2. Initialize parser
Set up the basic project structure:
```bash
npm run init-parser
```
This command will:
- Generate basic unit tests
- Create an index file in the `/src` directory with automatically configured inputs based on your parser ID
- Set up basic project scaffolding

### 3. Development and Testing

To verify your code builds correctly:
```bash
npm run build
```
This command compiles the TypeScript code and bundles it using Rollup, helping you identify any build issues.

### 4. Deployment

To deploy your parser to Notifi's Fusion hosting:
```bash
npm run upload
```
This command will:
1. Build your project
2. Upload the compiled action to the Notifi platform

## Additional Scripts

The template includes several other useful scripts:
- `npm test`: Run Jest tests


## Project Structure

After initialization, your project will include:
- `/src`: Source code directory containing your parser implementation
- Unit tests for your parser
- Configuration files (TypeScript, Rollup, etc.)
- Package.json with all necessary dependencies

## Development Dependencies

The template comes pre-configured with essential development dependencies including:
- TypeScript support
- Rollup for bundling
- Jest for testing
- Notifi development utilities


