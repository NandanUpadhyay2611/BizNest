# 🚀 Biznest - CRM platform made for Xeno's SDE assesment 2025

---

## Table of Contents

- [What is this? (Intro & Features)](#what-is-this-intro--features)
- [How to Run Locally (Backend & Frontend)](#how-to-run-locally-backend--frontend)
- [`.env` Example](#env-example)
- [Architecture Diagram](#architecture-diagram)
- [AI Tools & APIs Used](#ai-tools--apis-used)
- [Known Limitations & Trade-Offs](#known-limitations--trade-offs)
- [Bonus Features](#bonus-features)

---

## Data Ingestion API 

### 📬 POST /api/customers

**Description:** Create a new customer.

### 🔸 Request Body

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "spend": 1200.75,
  "visits": 10,
  "lastActive": "2025-05-10T15:30:00.000Z"
}
```

### 📬 POST /api/orders

**Description:**  Create a new order for an existing customer.

### 🔸 Request Body

```json
{
  "customerId": "6649eb20981a5234f0a5d093", (replace with existing customer ID)
  "amount": 350.00,
  "date": "2025-05-18T12:00:00.000Z"
}

```

## What is this? (Intro & Features)

Welcome to the Xeno Mini CRM - a project so “mini” it uses **Redis Streams, Google Gemini, and a drag-and-drop React flow editor** just to send you a coupon. This is a full-stack, AI-powered, scalable CRM platform built for the Xeno SDE Internship Assignment 2025. It’s got more features than your average startup’s Series A pitch:

- **Secure REST APIs** for customer/order ingestion (with pub-sub, async, and validation, because why not be fancy?)
- **AI-powered campaign builder**: Describe your business goal in English, get a full campaign flow (segments, messages, delays, tags, CTAs) in JSON and as a beautiful, editable flowchart.
- **Dynamic rule builder**: AND/OR logic, nested groups, and live audience preview - basically, the “Excel for Marketers” experience.
- **Batch, event-driven delivery**: Campaigns are delivered via a simulated vendor API with real-world success/failure rates, and all delivery logs are batch-processed for scale (no more N+1 queries, thank you very much).
- **Campaign history page**: Stats, summaries, and more - all in a timeline that’s easier to read than your LinkedIn DMs.
- **Google OAuth 2.0 authentication**: Only real humans (and Google bots) can create or view campaigns.
- **AI-powered campaign performance summaries**: “Your campaign reached 1,284 users. 1,140 messages delivered. Customers with > ₹10K spend had a 95% delivery rate.” (Yes, AI wrote that for you.)
- **Modern, creative UI**: color-coded nodes, and enough Tailwind utility classes to make your laptop sweat.

---

## How to Run Locally (Backend & Frontend)


### Prerequisites

- Node.js (v18+)
- MongoDB
- Redis (for pub-sub magic)
- npm 
- Google Cloud account (for OAuth & Gemini API keys)

### 1. Clone the Repo

- git clone https://github.com/NandanUpadhyay2611/xeno-mini-crm.git
- cd xeno-crm

### 2. Set Up the Backend

- cd backend
- cp .env.example .env
- Fill in your MongoDB, Redis, Google OAuth, and Gemini API keys
- npm install && node server.js
- run all the services in src/consumers

### 3. Set Up the Frontend

- cd ../frontend
- cp .env.example .env
- Fill in your VITE_GOOGLE_CLIENT_ID (for React OAuth)
- npm install && npm run dev


### 4. Open the App

- Visit [http://localhost:3000](http://localhost:5173) (or whatever port Vite tells you)
- Login with Google
- Build a campaign, watch the magic, and bask in the AI-generated glory

---

## .env Example

<details>
<summary><code>backend/.env</code></summary>

<li> MONGODB_URI=your-mongodb-url</li>
<li> REDIS_URL=redis://localhost:6379</li>
<li> GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com </li>
<li>GEMINI_API_KEY=your-gemini-api-key</li>
<li>PORT=3000</li>

</details>

<details>
<summary>frontend/.env</summary>

<li>VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com</li>
<li>VITE_BASE_URL=https://biznest-4q06.onrender.com</li>
</details>

---

## Architecture Diagram


![xeno-mini-crm-architecture](https://github.com/user-attachments/assets/9e8023c7-a237-4ad9-be56-141e24ee93f0)
On Excalidraw: https://excalidraw.com/#json=JFqwqNM3D76o5RTsT6Upz,x4IF1CWZy8sNreJCqEqUpQ


**Components:**
- **Frontend (React):** Campaign builder, history, auth, flow editor, AI integration
- **Backend (Node.js/Express):** REST APIs, pub-sub, batch consumers, AI endpoints, auth middleware
- **Redis Streams:** Pub-sub for ingestion & delivery, batch processing
- **MongoDB:** Stores customers, orders, segments, campaigns, logs
- **Google Gemini API:** Campaign flow and summary generation
- **Google OAuth:** Auth for all the things

---

## AI Tools & APIs Used

- **Google Gemini API**  
  - Used for: Natural language → campaign flow, campaign performance summarization, smart tags/CTAs
  - Why: Fast, affordable, and less likely to hallucinate than your average LLM
- **@react-oauth/google**  
  - Used for: Frontend Google login
- **google-auth-library**  
  - Used for: Backend token verification (no imposters allowed)

---


## Known Limitations & Trade-Offs

- **No real SMS/email delivery**: The vendor API is as real as my gym membership (i.e., simulated).
- **No rate limiting or billing**: If you spam the AI endpoints, you might run out of tokens (or money).
- **No granular RBAC**: If you’re logged in, you’re an admin. (Hey, it’s a demo!)
- **No Kafka/RabbitMQ**: Redis Streams is plenty for this scale - but swap it out if you want to go full enterprise.
- **No mobile app**: But the UI is so responsive, you’ll think it’s Flutter.
- **No GDPR compliance**: Please don’t use this in production unless you like legal drama.

---

## Bonus Features

- **Batch, event-driven delivery & logging**: Scalable, async, and as close to real-world as you’ll get in a take-home.
- **AI-powered campaign summaries**: “Your campaign reached 1,284 users. 1,140 messages delivered. Customers with > ₹10K spend had a 95% delivery rate.” (AI wrote this so you don’t have to.)
- **Live audience preview**: No more “send and pray” - see your segment size in real time.
- **Smart tagging & scheduling**: AI can suggest campaign tags and send times (or at least pretend to).
- **Extensible architecture**: Want to add more AI, more channels, or more snark? Fork away.

---

## The End (or is it?)

> _“If you’ve read this far, you’re either my future interviewer or someone who really, really loves README files. Either way, thanks for checking out my work! May your campaigns be ever performant and your batch jobs never fail.”_

---

**Built with ❤️, ☕**




