# smart-link-template
Smart Link Template
This is a generated template based on your smart links config created from the Notifi Admin Panel

## Prerequisites
- Node.js and npm installed
- Notifi Admin Portal credentials
- Valid Fusion Source ID and Smart Link ID

## Installation

Create a new Smart Link project using the following command:

```bash
npx @notifi-network/create-smart-link --actionSourceId {fusionSourceId} --smartLinkId {smartLinkId}
```

Replace:
- `{fusionSourceId}` with your actual Fusion Source ID
- `{smartLinkId}` with your actual Smart Link ID

This command will create a new project with all necessary dependencies and configuration files.

## Setup Steps

### 1. Authentication
First, authenticate with your Notifi credentials:
```bash
npm run auth
```
This will prompt you to log in using your Notifi Admin Portal credentials and will update your `notifi-config` accordingly.

### 2. Initialize Smart Link
Set up the basic project structure:
```bash
npm run init-smart-link
```
This command will:
- Generate basic unit tests
- Create an index file in the `/src` directory with automatically configured inputs based on your Smart Link ID
- Set up basic project scaffolding

### 3. Development and Testing

To verify your code builds correctly:
```bash
npm run build
```
This command compiles the TypeScript code and bundles it using Rollup, helping you identify any build issues.

### 4. Deployment

To deploy your Smart Link action:
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
- `/src`: Source code directory containing your Smart Link implementation
- Unit tests for your Smart Link logic
- Configuration files (TypeScript, Rollup, etc.)
- Package.json with all necessary dependencies

## Development Dependencies

The template comes pre-configured with essential development dependencies including:
- TypeScript support
- Rollup for bundling
- Jest for testing
- Notifi development utilities


