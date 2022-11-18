# Threat Model

### Information

1. Application Name: Xandria
2. Application Version: 1.0 (Development)
3. Description: Collaborative search engine and bookmarking tool running on a graph database using GraphQL. Users can use a browser extension to bookmark websites that will be imported to the platform (via the Scraper) and discoverable for all other users. Each user can make public comments and private notes on resources and bookmark them, to save for later
4. Document Owner: Sonja Sönnichsen & Athi Fongoqa
5. Participants: Sonja Sönnichsen, Athi Fongoqa & Joshua Knauber
6. Reviewer: Peter Ruppel

### External Dependencies

1. Apollo: The backend runs on Apollo Server, and the frontend uses Apollo Client to interact with the Backend
2. GraphQL: Query language for the database
3. Neo4j: Graph database
4. Express: REST Endpoints for Auth + Middleware for cookie handling
5. GCP Cloud Run: Serverless deployment
6. GitHub Actions: CI/CD
7. FastAPI: Backend will request resource details [via URL sent] from main/only endpoint
8. Redis: URL’s queued in caches
9. Celery: scraping task queue management

### Entry Points

| ID  | Name              | Description                                                    |
| --- | ----------------- | -------------------------------------------------------------- |
| 1   | HTTPS Port        | Main Access point for Frontend to connect with the backend     |
| 1.1 | /graphql          | Access point for GraphQL Post-Request                          |
| 1.2 | /login            | REST Endpoints for Auth                                        |
| 1.3 | /signup           | REST Endpoints for Auth                                        |
| 1.4 | /refresh          | REST Endpoints for Auth                                        |
| 1.5 | /signout          | REST Endpoints for Auth                                        |
| 2   | HTTPS Port        | Request access point (API → Scraper)                           |
| 2.1 | /                 | Resource URL passed                                            |
| 2.2 | HTML              | HTML parsed by scraper                                         |
| 3   | Browser Extension | Application that sends request to the scraper, through the API |

### Exit Points

- Response and Error Messages
- Extracting page content
- Logging, Monitoring?

| ID  | Name           | Description                         | Trust Levels |
| --- | -------------- | ----------------------------------- | ------------ |
| 1   | Responses      | Responses by Server and Scraper     | 2, 7, 8, 9   |
| 2   | Error messages | Thrown by Server, Scraper, Database | 2, 7, 8, 9   |
| 3   | Logging        | Write to error.log                  | 5, 6, 8, 9   |
| 4   | Monitoring     | On Google Cloud Dashboard           | 5, 6, 8, 9   |

### Trust Levels

| ID  | Name               | Description                                                                      | Access Rights       |
| --- | ------------------ | -------------------------------------------------------------------------------- | ------------------- |
| 1   | Anonymous Web User | A user who has connected to the platform but has not provided valid credentials. | - Access HTTPS Port |

- Login with valid credentials
- Sign up a new user
- (Future) Access the platform to search + read public resources |
  | 2 | Valid User | A user who has logged in with valid credentials and thus sends a valid JWT with each request. | - All that (1) can do
- Access browser extension
- Add new bookmarks/resources via browser extension
- Add notes and comments to resources
- Update their own profile data (username, name, email, password) |
  | 3 | Invalid User | A user who has attempted to log in with invalid credentials. | - All that (1) can do |
  | 4 | Browser Extension | Application running in a logged-in user’s browser. | - If it has valid JWT → (2)
- If it has no credentials → (1) |
  | 5 | Database Server Administrator | The DB server administrator has read and write access to the DB used by Xandria. | - Full administrative rights to database |
  | 6 | Database Read/Write User | The database user account is used to access the database for read and write access. | - Read and write access to database |
  | 7 | Frontend Developer | A developer that has access to the frontend code and deployments. | - Read and write access to frontend
- Read and write access to deployment |
  | 8 | Backend Administrator | A developer that has ownership of the API and its deployment pipelines. | - Full administrative rights to backend and delivery pipeline |
  | 9 | Backend Developer | A developer that has access to the API, scraper, database connection and deployment pipelines. | - Read and write access to backend
- Read and write access to scraper
- Database Read/Write User
- Read and write access to delivery pipeline |
  | 10 | API | This is the process in which the web server executes code as and authenticates itself against the database server as. | - Read and write access to database
- Write access to scraper |
  | 11 | Scraper | | |

### Assets

| ID                                                                             | Name                     | Description                                                                         | Trust Level                                                           |
| ------------------------------------------------------------------------------ | ------------------------ | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| 1                                                                              | User Login Details       | The login credentials that a respective valid user stores in the database           | 2, 6                                                                  |
| 2                                                                              | User Personal Data       | Personal Data (name, email etc) that a respective valid user stores in the database | 2, 6                                                                  |
| 3                                                                              | Availability of platform | Xandria should be available 24hrs/day                                               |
| Users should be able to interact with the resources, signup, signout and login | 5, 6, 7, 8, 9            |
| 4                                                                              | Availability of scraper  | Users should be able to bookmark a page 24hrs/day                                   | 8, 9                                                                  |
| 5                                                                              | JWT                      | The token stored in the browser of each logged-in user (as httpOnly cookie)         | 2, 10                                                                 |
| 6                                                                              | Scraper/API Secret       | The secrete/auth mechanism that the API uses to validate a request to the scraper   | 9, 10, 11                                                             |
| 7                                                                              | Resources                | All resources stored in the DB                                                      | - (2) All authenticated users should be able to read public resources |

- (11) Scraper should be the only one determining what the information about the resource is
- (1, 2, 3) User shouldn’t be able to update/change information about the resource
- (1, 2, 3) User shouldn’t be able to delete information about the resource
- (5, 6, 9, 10) CRUD operations |
  | 8 | API Keys/Secrets | Keys and secrets used in the API | - 8, 9, 10 |
  | 9 | Scraper Keys/Secrets | Keys and secrets used in the Scraper | - 8, 9, 10, 11 |
  | 10 | Deployment Keys/Secrets | Keys and secrets used in the delivery pipeline | - 8 |

# Threats and their Mitigations

Types of Actors

- **Accidental discovery**: done by regular users who make a functional mistake in your application and gain access to privileged information or functionality.
- **Automated malware**: programs or scripts searching for known vulnerabilities that report them back to a central collection site.
- **The curious attacker**: security researchers or regular users who notice something wrong with an application and decide to explore further.
- **The motivated attacker**: an attacker seeking financial or other gains from the attack.
- **Organized crime**: criminals seeking high stake payouts, such as cracking e-commerce or corporate banking applications, for financial gain.

DREAD (Meier et al., 2003):

- **Damage:** Understand the potential damage a particular threat is capable of causing.
- **Reproducibility:** Identify how easy it is to replicate an attack.
- **Exploitability:** Analyze the system’s vulnerabilities to ascertain susceptibility to cyberattacks.
- **Affected Users:** Calculate how many users would be affected by a cyberattack.
- **Discoverability:** Determine how easy it is to discover vulnerable points in the system infrastructure.

- Risk Assessment:
  - (A): Accept: Decide that business impact is acceptable
  - (E): Eliminate: Remove components that make the vulnerability possible
  - (M): Mitigate: Add checks or controls that reduce the risk impact or the chance of occurrence

| Threat                                           | Assessment | Potential Mitigation                                                                                                                                                           | STRIDE Code |
| ------------------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| DDoS Scraper → Unauthenticated access to Scraper | M          | - frontend sends URL and title to the backend, If scraper is down, the bookmark is still saved with the title + logging the URL to scrape it as soon as the scaper is up again |
| - a shared secret between Backend and Scraper    | D          |
| DoS API interface                                | M          | - throttling                                                                                                                                                                   | D           |
| Websites block Scraper                           | M          | - rotating proxies                                                                                                                                                             | D           |
| Information Disclosure                           | M          | - access resources with GraphQL query, that the user is not authorized to access → elaborate auth schema                                                                       | I           |
| Deploying insecure Code                          | M          | - having security check in the Pipeline → DevSecOps                                                                                                                            | I           |
| Elevation of Privilege                           | M          | - run with least privilege                                                                                                                                                     |
| - role-based auth                                | E          |
| Tampering with Queries                           | M          | - make sure Schema Introspection is disabled                                                                                                                                   |
| - limit query complexity                         | T          |
| Repudiation                                      | M          | - detailed and differentiated logging                                                                                                                                          |

- timestamps
- digital signatures?
- audit trails | R |
  | Dirty links (from frontend/extension to the backend/scraper) → into DB | M | - sanitize resource links, descriptions…
- block URLs from known malicious sources (Blocklist) | T |
  | Scrape protected pages | M | - ensure no private data is scraped by disabling the extension | I |
  | Hackers could write their own website with embedded malicious code and let it be scraped | M | - sanitize scraped content (Scraper)
- sanitize anything that is written into the database (Server) | E |
  | External access to DB | M | - Firewall
- Accessing DB via SSH
- VPC
- Protecting Auth Data with ENV Variables | T |
  | Server availability | M | - Scaling
- Rollbacks
- Load balancing | D |
  | Database availability | M | - Replication
- Sharding
- Scaling
- Backups
- Rollbacks | D |
  | Scraper Availability | M | - Scaling
- Rollbacks
- Load balancing | D |
  | Error Message discloses information | M | - make sure that malicious actors cannot access any information about internal resources via Error Messages or Logs
- write custom error messages | I |
  | Spam by making accounts | M | - rate limit
- verify email | S |
  | Unauthenticated read of resources | A | - auth flow | |
  | Server-Side Request Forgery | M | - Firewall policy or network access control rules to block all but essential intranet traffic
- Sanitize and validate input data | |
  | Cross-Site Request Forgery | M | - deploy frontend and backend on the same domain
  → set cookie sameSite-property to “lax” | |

## Currently Implemented Security Measures

**Server**

- TLS/SSL → HTTP-Request Encryption
- JWT in httpOnly Cookies
  - JWT generation with secret only known to the server
  - cannot be accessed via the client, only send with each request
  - **TODO: Deploy frontend and backend on the same domain, to set sameSite-property to avoid CSRF-Attacks**
- CORS
- Scraper
  - make sure the scraper can be sidestepped (the extension provides title, URL that is saved in the database if the scraper doesn’t respond)
  - **TODO: prevent scraper from scraping URLs from blocklists**
- VPC:
  - Only route requests to private IPs (such as the scraper) through the VPC connector
- Express helmet middleware (setting security headers)
- Authentication → If JWT doesn’t hold the ID of valid User context creation for GraphQL will fail
  - separate Auth REST Endpoint to avoid GraphQL insecurities
  - if no JWT for GraphQL-endpoint is provided, context creation will fail and no query executed
- **TODO: Disable Introspection/schema autogeneration** (currently enabled for development reasons)
- Resolver-based access control
  - Mutations can only be executed with `{isAuthenticated: true}` and a valid current user
  - For updating data: Input to resolvers is only the data to be changed, never the UserID (that will always be the current user)
- Encryption of sensitive data
  - Password encrypted with scrypt-algorithm with a 32 Byte randomly generated salt
  - Password+Salt set to private in the schema → can only be accessed via OGM
  - Update password only possible with old password
  - Password needs to be at least 10 characters and at least have one lower and upper case characters + number + special character
- Input validation and Sanitation for REST- and GraphQL-Endpoints
  - Limit Query Complexity → We have circular relationships that can be exploited
  - **TODO: More thorough validation/sanitation for GraphQL-Endpoint**
  - **TODO: Rate limit GraphQL-queries**
- Custom Error Messages, to avoid enclosing any internal information
- **Container Image Security:**
  - Integrating security checks into our delivery pipeline on Github Actions
- **TODO: Binary Authorisation**
  - Securing against supply chain attacks in deploying docker images on Cloud Run which are hosted in Artifact Registry in our network
- Logging
  - GCP Logs Explorer
- Monitoring:
  - Cloud Run Metrics

**Scraper**

KEY: **WORK IN PROGRESS**

- TLS/SSL enabled on the Cloud Run endpoint
- CORS
- HTTPS Redirect
- VPC:
  - The scraper (Cloud Run serverless instance) should only be accessible for the API (also a Cloud Run serverless instance). They are both parts of the same VPC network (each connected to the VPC via a Serverless VPC Access connector) with the scraper’s ingress also set to `internal only` to ensure its traffic is solely to and from the API.
- Rotating proxies
  - Avoiding blacklisting from websites by routing through short-lived HTTP(S) proxies at runtime. The proxies are stored and updated in Redis every five minutes by means of a Cloud Function.
- Task management queue
  - To protect against overwhelming the server’s/container’s resources, Celery is used to handle scraping jobs separately.
- Headless browsers
  - **Sandboxed launches to prevent SSRF are still needed.**
- Input URL validation
  - Validating whether the URL is valid/exists and a public IP address
  - **Robots.txt: checking whether the User-Agent is set to \* (all) & the if the disallow path != URL given (or is root)**
  - **XSS in URL is currently mitigated by whitelisting safe characters.**
  - **Integrating Google’s Web Risk API**
- **Container Image Security:**
  - Integrating security checks into our delivery pipeline on GitHub Actions
- **Binary Authorisation:**
  - Securing against supply chain attacks in deploying docker images on Cloud Run which are hosted in Artifact Registry in our network
- Request security headers (**and explanations**):
  ```markdown
  "Access-Control-Allow-Credentials"
  "Access-Control-Allow-Origin"
  "Connection"
  "Content-Length"
  "Content-Security-Policy"
  "Date"
  "ETag"
  "Expect-CT"
  "Keep-Alive"
  "Referrer-Policy"
  "Strict-Transport-Security"
  "X-Content-Type-Options"
  "X-DNS-Prefetch-Control"
  "X-Download-Options"
  "X-Frame-Options"
  "X-XSS-Protection"
  ```
- Logging
  - Currently using the standard built-in python logging utility to output into GCP Logs Explorer
- Monitoring:
  - Cloud Run Metrics

**Data Stores**

- Neo4j
  - Schema-based access control
    - Any query can only be executed with a valid JWT that holds information for a valid user from the database
    - User generation is binding → The current user can only update or delete their own user data + access only notes and bookmarks that they have written themselves
    - Salt, Email, and Password are set to private → client is not able to query these, only accessible with OGM (server)
- Redis (MemoryStore on GCP)
  - Serverless VPC Access
    - Memorystore instance’s private IP address is visible to a single VPC network. It only permits connections from resources that are contained within the same region [eu-west-3].
    - Serverless VPC Access connector created in the same region [eu-west-3] as both Cloud Run and Memorystore and associated with the same VPC as Memorystore.
    - **Example diagram:**
