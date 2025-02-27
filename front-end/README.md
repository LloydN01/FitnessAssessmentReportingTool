# Fitness Assessment Reporting Tool - Frontend

This is the frontend portion of the Fitness Assessment Reporting Tool, built using **React** and **TypeScript**. The platform allows students to enter, store, and visualize fitness assessment data, generating reports and dynamic fitness norms. Staff can generate and manage fitness assessment forms, oversee reports, and maintain the platform's integrity. It aims to modernize the fitness assessment process for UWA's Sport and Exercise Science program.

## Table of Contents

-   [Fitness Assessment Reporting Tool - Frontend](#fitness-assessment-reporting-tool---frontend)
    -   [Table of Contents](#table-of-contents)
    -   [Project Overview](#project-overview)
    -   [Requirements](#requirements)
    -   [Installation Guide](#installation-guide)
        -   [1. Install Node.js and TypeScript](#1-install-nodejs-and-typescript)
            -   [Installing Node.js:](#installing-nodejs)
            -   [Installing TypeScript:](#installing-typescript)
        -   [2. Clone the Repository](#2-clone-the-repository)
        -   [3. Install Dependencies](#3-install-dependencies)
        -   [4. Start the Development Server](#4-start-the-development-server)

## Project Overview

This tool serves the Sport and Exercise Science students at UWA by providing a user-friendly interface for logging fitness assessments, visualizing results, and generating detailed reports. Students can track their progress, compare against their peers, and identify areas for improvement.

## Requirements

Before starting, ensure you have the following installed on your machine:

-   **Node.js** (version 16 or later)
-   **npm** (Node Package Manager, typically installed with Node.js)
-   **TypeScript**

## Installation Guide

### 1. Install Node.js and TypeScript

#### Installing Node.js:

To run the React project, you'll need to have Node.js installed. You can download it from the official website:

-   [Download Node.js](https://nodejs.org/en)

Ensure you have a version that supports TypeScript (version 16.x or later is recommended).

#### Installing TypeScript:

Once Node.js is installed, you can install TypeScript globally using npm:

```bash
npm install -g typescript

```

You can verify the installation by checking the version of TypeScript:

```bash
tsc -v
```

### 2. Clone the Repository

**Skip this step if you have already cloned the repository (from the back-end README).**

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/Martin-EvansUWA/FitnessAssessmentReportingTool.git
```

Navigate to the `front-end` directory:

```bash
cd front-end
```

### 3. Install Dependencies

To install the required npm packages, use the following command:

```bash
npm install
```

This command will download and install all necessary dependencies listed in the package.json file, ensuring that the project can run smoothly.

### 4. Start the Development Server

Once the dependencies are installed, you can start the development server:

```bash
npm start
```

This will start the React development server, and you should be able to access the application in your browser at:

```
http://localhost:3000/
```

The server will automatically reload when you make changes to the code, allowing for quick and easy development.
