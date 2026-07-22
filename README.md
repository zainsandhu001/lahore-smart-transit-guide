# Lahore Smart Transit Guide: AI-Powered Multi-Modal Public Transport Navigator

An intelligent, real-time transit routing web application engineered specifically for Lahore, Pakistan. Built using Next.js and powered by Google’s Gemini AI, this system optimizes daily commutes by seamlessly bridging the gaps between the Orange Line Metro Train (OLMT), Metro Bus, Speedo feeder buses, and the emerging Electric Vehicle (EV) transit networks. 

By providing instant, optimal route calculations, this platform directly **saves daily travel time**, **significantly reduces transportation costs**, and **improves the overall public travel facility** for citizens across the city.

---

## 🔗 Live Application & Repository
* **Live Production Deployment:** https://lahore-smart-transit-guide.vercel.app
* **GitHub Repository:** https://github.com/zainsandhu001/lahore-smart-transit-guide

---

## 💡 Background & Problem Statement

### The Challenge of Navigation in Lahore
Lahore possesses a rapidly expanding public transportation infrastructure, yet it lacks a centralized, unified digital platform that connects all individual transit modes. While systems like the Orange Line Train, the Green Line Metro Bus, and various Speedo routes operate efficiently in isolation, navigating across these disjointed networks presents a significant challenge.

### Impact on Newcomers and Students
New residents, university freshmen, and out-of-city visitors frequently struggle to identify optimal interchange stations and connecting routes. This lack of clear, accessible information leads to:
* **Financial Waste:** Commuters often fall back on expensive private ride-hailing services (such as Rickshaws, InDrive, or Yango) because they are unaware of affordable public transport paths that serve their destination.
* **Time Inefficiency:** Taking suboptimal or circuitous routes due to a lack of knowledge regarding interchange points.
* **Cognitive Overload:** The stress of navigating an unfamiliar city without a reliable, unified digital travel planner.

### Socio-Economic Impact: Saving Time, Reducing Costs, and Improving Facilities
Public transportation is only effective if citizens know how to use it seamlessly. This project directly addresses three critical civic needs:
1. **Saving Costs for Citizens:** By mapping multi-modal public transit routes with accurate PKR fare estimates, the application helps students and daily wage earners avoid expensive private ride-hailing fares, keeping transportation affordable.
2. **Saving Valuable Travel Time:** Intelligent AI pathfinding calculates the fastest possible routes, factoring in interchange walking times and connecting lines, removing the guesswork from daily commutes.
3. **Improving the Public Travel Facility:** By putting a clean, mobile-friendly digital guide into the hands of every citizen, the app modernizes the user experience of Lahore’s transit network, making public infrastructure more accessible, reliable, and user-friendly for everyone.

### Project Inspiration
This application was born out of direct personal experience. Arriving in Lahore for the first time as a student highlighted a critical infrastructure gap: navigating the city's extensive transit system without a localized guide was overwhelming and costly. The **Lahore Smart Transit Guide** was designed to solve this exact problem, democratizing public transport access for students, newcomers, and daily commuters alike.

---

## ⚙️ The Solution & Core Architecture

The **Lahore Smart Transit Guide** acts as a centralized spatial and relational navigation engine. Instead of relying on static, rigid route databases that fail to account for multi-modal transfers, the application leverages Large Language Model (LLM) reasoning through the **Google GenAI SDK**.

When a user inputs an origin and destination:
1. **Query Processing:** The system captures the user's spatial intent and constraints (e.g., prioritizing speed, cost, or minimal transfers).
2. **AI Routing Backend:** Powered by Gemini Flash (`gemini-3.5-flash`), the engine analyzes Lahore's geographical layout and maps the intersection points between the Orange Line, Metro Bus, and feeder networks.
3. **Synthesis & Comparison:** The application generates comparative travel cards that present distinct route options, allowing the commuter to make an informed decision based on time and budget.

---

## ✨ Key Features & Comprehensive Analysis

| Feature | Technical Implementation | Practical Benefit to Commuter |
| :--- | :--- | :--- |
| **Multi-Modal Integration** | Combines OLMT, Green Line Metro Bus, Speedo feeder routes, and EV transit lines into a single routing engine. | **Improves Travel Facility:** Eliminates the need to switch between multiple apps or ask around for connecting bus numbers. |
| **Intelligent Pathfinding** | Generates step-by-step navigation instructions, including exact interchange stations for route switching. | **Saves Time:** Prevents getting lost at complex transit hubs like Anarkali, MAO College, or Ali Town, ensuring the fastest path. |
| **PKR Fare Estimation** | Calculates accurate, estimated ticket costs across combined transit systems in Pakistani Rupees (Rs.). | **Saves Cost:** Protects students from overspending on private transport by highlighting ultra-affordable public transit alternatives. |
| **Travel Time Forecasting** | Estimates total journey duration by accounting for transit speeds and interchange walk times. | Helps commuters and students manage their schedules effectively to arrive at classes or workplaces on time. |
| **Mobile-First Responsive UI** | Built with modern CSS grids and flexible layouts to ensure seamless performance on mobile browsers. | Provides on-the-go accessibility for users standing at bus stops or train stations without needing a laptop. |

---

## 🛠️ Technical Stack & Development Methodology

* **Frontend Framework:** Next.js / React — Chosen for server-side rendering performance, fast page loads, and structured component architecture.
* **Development Environment:** Bolt.new — Utilized for rapid prototyping, instant environment configuration, and seamless code generation.
* **Artificial Intelligence Engine:** Google GenAI SDK (`gemini-3.5-flash`) — Acts as the intelligent backend processing unit, interpreting spatial queries and generating structured routing data without requiring complex backend database maintenance.
* **Cloud Hosting & CI/CD:** Vercel — Provides continuous integration, automatic production builds on GitHub pushes, and globally distributed edge network delivery for zero-latency access in Pakistan.

---

## 🚀 Future Roadmap & Expansion Prospects

To transform this academic prototype into a permanent civic utility for the province, the following strategic advancements are planned:

### 1. Provincial Expansion to District E-Bus Networks
The Government of Punjab is actively rolling out eco-friendly Electric Vehicle (EV) bus networks across major districts. The next iteration of this system will scale beyond Lahore, mapping e-bus routes in Faisalabad, Rawalpindi, Multan, and Gujranwala, eventually creating a unified **Punjab Smart Transit Network** that further improves travel facilities statewide.

### 2. Collaboration with the Punjab Mass Transit Authority (PMA)
Future development aims to establish an official integration with the Punjab Mass Transit Authority (PMA). By tapping into official municipal data streams, the project seeks to implement:
* **Live GPS Vehicle Tracking:** Showing the exact real-time physical location of approaching buses and trains on an interactive map.
* **Dynamic Arrival Countdown:** Providing minute-by-minute estimated arrival times at specific stops to minimize waiting times at stations.
* **Service Alert Notifications:** Alerting users instantly regarding route blockages, maintenance delays, or temporary schedule changes.

---

## 💻 Local Setup & Installation Instructions

To review the codebase, verify the architecture, or run the project locally on a machine, follow these instructions:

### Prerequisites
* Node.js (Version 18 or higher)
* An active Google AI Studio API Key

### Step-by-Step Execution
1. **Clone the Repository:**
   Open your terminal and download the project files:
   ```bash
   git clone [https://github.com/zainsandhu001/lahore-smart-transit-guide.git](https://github.com/zainsandhu001/lahore-smart-transit-guide.git)
