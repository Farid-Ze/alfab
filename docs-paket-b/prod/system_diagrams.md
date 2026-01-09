# PT. Alfa Beauty Cosmetica B2B Platform - System Diagrams

**Version:** 2.0
**Date:** January 08, 2026  
**Total Diagrams:** 25

---

## 1. ARCHITECTURE DIAGRAMS

### 1.1 System Context Diagram

```mermaid
flowchart LR
    subgraph Users
        P[Partner/Salon]
        AG[Agent/Salesman]
        AD[Admin HQ]
    end
    
    subgraph "B2B Platform"
        API[Order Facilitation<br/>Headless Catalog]
    end
    
    subgraph External
        SD[Sub-Distributor]
        ERP[(Legacy ERP)]
        WA[WhatsApp]
        EMAIL[Email]
    end
    
    P -->|Browse + Order| API
    AG -->|Shadow Mode| API
    AD -->|Monitor SLA| API
    
    API -->|Route via Deep Link| SD
    API <-->|Sync Stock + Credit| ERP
    API -->|Generate Link| WA
    API -->|Fallback Notify| EMAIL
    
    style API fill:#E8F5E9,stroke:#2E7D32
    style ERP fill:#FFF3E0,stroke:#EF6C00
```


### 1.2 Container Diagram

```mermaid
graph TB
    subgraph "Users"
        P[Partner Mobile/Web]
        A[Agent Dashboard]
        AD[Admin Panel]
    end
    
    subgraph "Frontend"
        FE[Next.js 16<br/>React + TypeScript<br/>httpOnly Cookie Auth]
    end
    
    subgraph "Backend - Go Fiber"
        MW[Middleware Stack<br/>JWT + RateLimit + Logger + Metrics]
        API[REST API<br/>Handlers + Validation]
        SVC[Services<br/>Business Logic]
        REPO[Repositories<br/>Data Access]
    end
    
    subgraph "Background Jobs"
        SLA[SLA Scheduler<br/>15min interval]
        SYNC[Stock Sync<br/>Circuit Breaker]
    end
    
    subgraph "Data Layer"
        PG[(PostgreSQL<br/>Primary + Soft Delete)]
        RD[(Redis<br/>Cache + Rate Limit + Token Store)]
    end
    
    subgraph "External"
        ERP[Legacy ERP<br/>ACL + Circuit Breaker]
        WA[WhatsApp<br/>Deep Link + Copy Fallback]
    end
    
    P --> FE
    A --> FE
    AD --> FE
    FE --> MW
    MW --> API
    API --> SVC
    SVC --> REPO
    REPO --> PG
    SVC -.-> RD
    SLA --> PG
    SYNC --> ERP
    SYNC --> RD
    API -.-> WA
    
    style MW fill:#E3F2FD
    style SYNC fill:#FFF3E0
```

### 1.3 Domain Module Dependencies

```mermaid
graph TD
    subgraph "Core Domain: Commercial"
        PRICING[Pricing Engine<br/>Tier-based pricing]
        CREDIT[Credit Limit<br/>Heuristics]
        ORDER[Order Service<br/>Submission + Routing]
        INVOICE[Invoice Service<br/>Payment Tracking]
    end
    
    subgraph "Supporting Domain: Supply Chain"
        INVENTORY[Inventory<br/>Stock + Buffer]
        ROUTING[SLA Routing<br/>Geo-based]
        SUBDIST[SubDist<br/>WA Deep Link]
    end
    
    subgraph "Supporting Domain: Loyalty"
        POINTS[Point Calculator<br/>Multiplier Logic]
        REDEMPTION[Redemption<br/>Catalog]
    end
    
    subgraph "Generic Subdomain: Identity"
        AUTH[Auth Service<br/>JWT + RBAC]
        AGENT[Agent Service<br/>Shadow Mode]
        PARTNER[Partner Profile<br/>Tier + Region]
    end
    
    subgraph "Infrastructure"
        AUDIT[Audit Service<br/>WHO/WHAT/WHEN]
        CONFIG[Config Service<br/>Runtime Config]
        ERP_ACL[ERP ACL<br/>Anti-Corruption Layer]
    end
    
    PRICING --> AUTH
    PRICING --> PARTNER
    CREDIT --> ERP_ACL
    ORDER --> CREDIT
    ORDER --> PRICING
    ORDER --> ROUTING
    ORDER --> AUDIT
    INVOICE --> ORDER
    INVOICE --> POINTS
    POINTS --> PARTNER
    ROUTING --> SUBDIST
    ROUTING --> PARTNER
    AGENT --> AUTH
    AGENT --> PARTNER
    AGENT --> AUDIT
    INVENTORY --> ERP_ACL
    
    style ERP_ACL fill:#f9f,stroke:#333,stroke-dasharray: 5 5
```

### 1.4 Data Flow Architecture

```mermaid
flowchart LR
    subgraph "Request Flow"
        REQ[HTTP Request]
        MW[Middleware<br/>JWT + RateLimit]
        HANDLER[Handler<br/>Validation]
        SERVICE[Service<br/>Business Logic]
        REPO[Repository<br/>Data Access]
    end
    
    subgraph "Data Stores"
        PG[(PostgreSQL)]
        CACHE[(Redis Cache)]
    end
    
    subgraph "Response Flow"
        JSON[JSON Response]
    end
    
    REQ --> MW
    MW --> HANDLER
    HANDLER --> SERVICE
    SERVICE --> REPO
    SERVICE -.-> CACHE
    REPO --> PG
    REPO --> SERVICE
    SERVICE --> HANDLER
    HANDLER --> JSON
    
    CACHE -.->|Cache Hit| SERVICE
    PG -.->|Cache Miss| CACHE
```

---

## 2. BUSINESS FLOW DIAGRAMS

### 2.1 Order Lifecycle

```mermaid
stateDiagram-v2
    [*] --> DRAFT: Add to cart
    
    DRAFT --> SUBMITTED: Kirim via WA
    note right of SUBMITTED
        Actions:
        - Credit check
        - Route to SubDist
        - Generate Deep Link
        - Record routed_at
    end note
    
    SUBMITTED --> PROCESSING: SubDist confirms
    SUBMITTED --> TIMEOUT: No response 48h
    SUBMITTED --> REJECTED: Credit denied
    SUBMITTED --> CANCELLED: Partner cancels
    
    PROCESSING --> APPROVED: Admin approves
    note right of APPROVED
        Actions:
        - Create Invoice
        - Calculate points
    end note
    
    PROCESSING --> CANCELLED: Cancel
    
    TIMEOUT --> CANCELLED: Auto-cancel
    
    APPROVED --> SHIPPED: Mark shipped
    SHIPPED --> COMPLETED: Delivered
    
    COMPLETED --> [*]
    CANCELLED --> [*]
    REJECTED --> [*]
    TIMEOUT --> [*]
```

### 2.2 Credit Check Flow

```mermaid
flowchart TD
    START([Partner Checkout]) --> CB{Circuit Breaker?}
    
    CB -->|OPEN| DEGRADED[Degraded Mode<br/>Use Last Cache]
    CB -->|CLOSED| GET_CREDIT[Fetch Credit]
    
    GET_CREDIT --> CACHE{Cache Valid?}
    CACHE -->|Hit| USE_CACHE[Use Cached]
    CACHE -->|Miss| FETCH_ERP[Call ERP]
    
    FETCH_ERP --> ERP_OK{Response OK?}
    ERP_OK -->|Yes| UPDATE[Update Cache<br/>Reset CB]
    ERP_OK -->|Timeout| RECORD_FAIL[Record Failure]
    RECORD_FAIL --> CB_CHECK{Failures >= 5?}
    CB_CHECK -->|Yes| TRIP[Trip Circuit]
    CB_CHECK -->|No| DEGRADED
    TRIP --> DEGRADED
    
    UPDATE --> CALC
    USE_CACHE --> CALC
    DEGRADED --> AMBER_DEF[Default AMBER]
    
    CALC[Gap = Limit - Used - Order]
    
    CALC --> GAP{Gap >= 0?}
    GAP -->|Yes| GREEN[GREEN: Proceed]
    GAP -->|No| AMBER[AMBER: Warning]
    
    GREEN --> WA[Generate WA Link]
    AMBER --> WA
    AMBER_DEF --> WA
    
    WA --> END([Open WhatsApp])
    
    style GREEN fill:#90EE90
    style AMBER fill:#FFD700
    style DEGRADED fill:#FFA07A
    style TRIP fill:#FF6B6B
```

### 2.3 Invoice & Payment Flow

```mermaid
flowchart TD
    ORDER_APPROVED([Order APPROVED]) --> CREATE_INV[Auto-Create Invoice]
    
    CREATE_INV --> CALC_DUE[Calculate Due Date]
    
    CALC_DUE --> DUE_LOGIC{Partner Tier?}
    DUE_LOGIC -->|SILVER| CBD[Due: Order Date - CBD]
    DUE_LOGIC -->|GOLD| NET14[Due: Order Date + 14 days]
    DUE_LOGIC -->|PLATINUM| NET30[Due: Order Date + 30 days]
    
    CBD --> INV_UNPAID[Invoice Status: UNPAID]
    NET14 --> INV_UNPAID
    NET30 --> INV_UNPAID
    
    INV_UNPAID --> PAYMENT{Payment Received?}
    
    PAYMENT -->|Partial| CALC_PARTIAL[Update amount_paid]
    CALC_PARTIAL --> CHECK_FULL{Paid >= Amount?}
    CHECK_FULL -->|No| INV_PARTIAL[Status: PARTIAL]
    CHECK_FULL -->|Yes| INV_PAID[Status: PAID]
    
    PAYMENT -->|Full| INV_PAID
    
    INV_PARTIAL --> PAYMENT
    
    INV_PAID --> AWARD_POINTS[Trigger Point Award]
    
    AWARD_POINTS --> NOTIFY[Notify Partner]
    
    style INV_PAID fill:#90EE90
    style AWARD_POINTS fill:#FFD700
```

### 2.4 SLA Escalation Flow

```mermaid
flowchart TD
    SUBMIT([Order Submitted]) --> ROUTE[Route to SubDist]
    ROUTE --> START[Record routed_at<br/>Start SLA Timer]
    
    START --> POLL{Check every 15min}
    
    POLL --> STATUS{Status Changed?}
    STATUS -->|Yes| OK[SLA Met]
    STATUS -->|No| T18{Hours >= 18?}
    
    T18 -->|No| POLL
    T18 -->|Yes| REM_CHK{Reminder Sent?}
    
    REM_CHK -->|No| REMIND[Send Reminder]
    REMIND --> SET_REM[sla_reminder_sent = true]
    SET_REM --> POLL
    
    REM_CHK -->|Yes| T24{Hours >= 24?}
    T24 -->|No| POLL
    T24 -->|Yes| ESC_CHK{Escalated?}
    
    ESC_CHK -->|No| ESC[Escalate to HQ]
    ESC --> SET_ESC[sla_escalated = true]
    SET_ESC --> POLL
    
    ESC_CHK -->|Yes| T48{Hours >= 48?}
    T48 -->|No| POLL
    T48 -->|Yes| TIMEOUT[Set Status = TIMEOUT]
    
    TIMEOUT --> END([Notify Partner + Admin])
    OK --> END2([Continue Normal Flow])
    
    style OK fill:#90EE90
    style REMIND fill:#FFD700
    style ESC fill:#FFA07A
    style TIMEOUT fill:#FF6B6B
```


### 2.5 Agent Shadow Mode Flow

```mermaid
sequenceDiagram
    participant A as Agent/Salesman
    participant FE as Frontend
    participant API as Backend API
    participant DB as Database
    participant P as Partner Owner
    
    Note over A,P: Shadow Mode Flow (FSD §4.2)
    
    A->>FE: Login dengan kredensial Agent
    FE->>API: POST /agent/auth/login
    API->>DB: Verify Agent credentials
    DB-->>API: Agent data + role
    API-->>FE: JWT Token (role=AGENT)
    
    A->>FE: Pilih Partner untuk di-shadow
    FE->>API: POST /agent/shadow/{partner_id}
    API->>DB: Create AgentSession record
    Note over API: Record: agent_id, partner_id, started_at, ip_address
    API-->>FE: Shadow Token + Session ID
    
    Note over A,FE: Agent now sees Partner's view
    
    A->>FE: Browse catalog, add to cart
    A->>FE: Checkout order
    FE->>API: POST /orders (with x-agent-id header)
    API->>DB: Create Order with agent_id
    API->>DB: Log AUDIT_IMPERSONATION
    
    Note over API,P: Mandatory Notification (Blueprint)
    API->>P: 📱 WA/Email: "Salesman X membuat order atas nama Anda"
    
    A->>FE: End Shadow Mode
    FE->>API: POST /agent/shadow/{session_id}/end
    API->>DB: Update ended_at timestamp
    API-->>FE: Session ended
```

### 2.6 Loyalty Points Flow

```mermaid
flowchart TD
    ORDER([Order Completed]) --> CHECK_ELIGIBLE{Eligible for points?}
    
    CHECK_ELIGIBLE -->|No - Below 500k| NO_POINTS[points_earned = 0]
    CHECK_ELIGIBLE -->|Yes| CALC_BASE[Calculate Base Points]
    
    CALC_BASE --> GET_MULT[Get Tier Multiplier]
    
    GET_MULT --> MULT_CHECK{Partner Tier?}
    MULT_CHECK -->|SILVER| MULT_1[Multiplier = 1.0x]
    MULT_CHECK -->|GOLD| MULT_12[Multiplier = 1.2x]
    MULT_CHECK -->|PLATINUM| MULT_15[Multiplier = 1.5x]
    
    MULT_1 --> CALC_FINAL
    MULT_12 --> CALC_FINAL
    MULT_15 --> CALC_FINAL
    
    CALC_FINAL[Final Points = Base x Multiplier]
    
    CALC_FINAL --> STORE_PENDING[Store as PENDING]
    
    STORE_PENDING --> WAIT_PAYMENT[Wait for Invoice PAID]
    
    WAIT_PAYMENT --> INV_PAID{Invoice Paid?}
    INV_PAID -->|No| WAIT_PAYMENT
    INV_PAID -->|Yes| CREDIT_POINTS[Credit to point_balance]
    
    CREDIT_POINTS --> CREATE_TX[Create POINT_TRANSACTION]
    
    CREATE_TX --> NOTIFY[Notify Partner]
    
    style CREDIT_POINTS fill:#90EE90
    style STORE_PENDING fill:#FFD700
```

---

## 3. SEQUENCE DIAGRAMS

### 3.1 Partner Login Sequence

```mermaid
sequenceDiagram
    participant U as Partner Browser
    participant FE as Frontend
    participant API as Backend API
    participant DB as PostgreSQL
    participant CACHE as Redis
    
    U->>FE: Enter email + password
    FE->>API: POST /api/v1/auth/login
    
    API->>DB: SELECT * FROM partners WHERE email = ?
    DB-->>API: Partner record with password_hash
    
    API->>API: bcrypt.Compare password hash
    
    alt Password Valid
        API->>API: Generate JWT access + refresh
        API->>CACHE: Store refresh_token for rotation
        API-->>FE: Set-Cookie httpOnly + 200 OK
        Note over FE: Token stored in httpOnly cookie
        Note over FE: NOT localStorage - XSS protected
        FE->>U: Redirect to /dashboard
    else Password Invalid
        API-->>FE: 401 Unauthorized
        FE->>U: Show error message
    end
```

### 3.2 Order Submission Sequence

```mermaid
sequenceDiagram
    participant P as Partner
    participant FE as Frontend
    participant API as Backend API
    participant DB as PostgreSQL
    participant REDIS as Redis Cache
    
    P->>FE: Click "Kirim via WhatsApp"
    FE->>API: POST /api/v1/orders
    
    Note over API: Validate JWT, extract partner_id
    
    API->>DB: Get Partner (tier, region_id, credit)
    DB-->>API: Partner data
    
    API->>API: Credit Check (limit - used - total)
    
    API->>DB: Get SubDist by region_id
    DB-->>API: SubDist (wa_number)
    
    alt No SubDist in Region
        API-->>FE: 422 "Tidak ada SubDist di wilayah Anda"
    end
    
    API->>DB: INSERT Order + OrderItems
    Note over DB: Trigger generates order_number
    
    API->>DB: UPDATE Partner.credit_used += total
    
    API->>API: Generate WA Deep Link
    Note over API: wa.me/{subdist_wa}?text={order_summary}
    
    API-->>FE: 201 Created + wa_deep_link
    
    FE->>P: Open WhatsApp with pre-filled message
```

### 3.3 ERP Stock Sync Sequence

```mermaid
sequenceDiagram
    participant CRON as Stock Sync Scheduler
    participant ERP_CLIENT as ERP Client
    participant CB as Circuit Breaker
    participant ERP as Legacy ERP
    participant DB as PostgreSQL
    participant CACHE as Redis
    
    Note over CRON: Runs every 15 minutes
    
    CRON->>DB: Get products with erp_product_id
    DB-->>CRON: Product list
    
    loop For each product
        CRON->>CB: Check circuit state
        
        alt Circuit CLOSED (normal)
            CB->>ERP_CLIENT: GetStock(erp_product_id)
            ERP_CLIENT->>ERP: HTTP GET /stock/{id}
            
            alt ERP responds < 3s
                ERP-->>ERP_CLIENT: Stock quantity
                ERP_CLIENT->>CB: RecordSuccess()
                CB->>DB: UPSERT inventory_cache
                CB->>CACHE: Set stock:{product_id}
            else Timeout/Error
                ERP--xERP_CLIENT: Timeout
                ERP_CLIENT->>CB: RecordFailure()
                Note over CB: failure_count++
                
                alt failure_count >= 5
                    CB->>CB: State = OPEN
                    Note over CB: Circuit tripped!
                end
            end
            
        else Circuit OPEN
            Note over CB: Reject call, use cached data
            CB-->>CRON: ErrCircuitOpen
        end
    end
```

### 3.4 Impersonation Checkout with Notification

```mermaid
sequenceDiagram
    participant AG as Agent
    participant FE as Frontend
    participant API as Backend API
    participant DB as PostgreSQL
    participant AUDIT as Audit Service
    participant NOTIFY as Notification Service
    participant OWNER as Partner Owner
    
    Note over AG,OWNER: Shadow Mode Checkout (FSD §4.2)
    
    AG->>FE: Checkout in Shadow Mode
    FE->>API: POST /orders<br/>Header: x-agent-id: {agent_id}
    
    API->>API: Detect Shadow Mode from header
    
    API->>DB: Create Order<br/>submitted_by: partner_id<br/>agent_id: agent_id
    DB-->>API: Order created
    
    API->>AUDIT: LogImpersonationAction()
    Note over AUDIT: [AUDIT_IMPERSONATION]<br/>Agent:SALES_001 acted_as Partner:USR_001<br/>action:SUBMIT_ORDER
    AUDIT->>DB: INSERT audit_logs
    
    API->>NOTIFY: SendImpersonationNotification()
    
    alt WA Available
        NOTIFY->>OWNER: 📱 WhatsApp Message
        Note over OWNER: "Halo [Toko], Salesman [X]<br/>membuat order [ID] senilai Rp [Y]"
    else WA Failed
        NOTIFY->>OWNER: 📧 Email Fallback
    end
    
    NOTIFY->>DB: INSERT audit_logs (IMPERSONATION_NOTIFIED)
    
    API-->>FE: 201 Created + wa_deep_link
```

### 3.5 Invoice Payment Recording

```mermaid
sequenceDiagram
    participant AD as Admin
    participant FE as Frontend
    participant API as Backend API
    participant DB as PostgreSQL
    participant LOYALTY as Loyalty Service
    participant PARTNER as Partner
    
    AD->>FE: Record payment for Invoice
    FE->>API: POST /invoices/{id}/payments<br/>{amount, method, reference}
    
    API->>DB: Get Invoice with existing payments
    DB-->>API: Invoice + Payments[]
    
    API->>DB: INSERT payment record
    
    API->>API: Calculate total_paid
    
    alt total_paid >= invoice.amount
        API->>DB: UPDATE invoice<br/>status=PAID, paid_at=NOW()
        
        Note over API,LOYALTY: Trigger Point Award
        API->>LOYALTY: AwardPoints(order_id)
        
        LOYALTY->>DB: Get Order.points_earned
        DB-->>LOYALTY: 100 points
        
        LOYALTY->>DB: UPDATE partners<br/>point_balance += 100
        
        LOYALTY->>DB: INSERT point_transactions<br/>type=EARNED, amount=100
        
        LOYALTY-->>PARTNER: 📱 "100 poin sudah ditambahkan!"
        
    else total_paid < invoice.amount
        API->>DB: UPDATE invoice status=PARTIAL
    end
    
    API-->>FE: 200 OK + updated invoice
```

---

## 4. ENTITY RELATIONSHIP DIAGRAMS

### 4.1 Core Business ERD

```mermaid
erDiagram
    PARTNERS ||--o{ ORDERS : places
    PARTNERS ||--o{ INVOICES : receives
    PARTNERS ||--o{ POINT_TRANSACTIONS : earns
    ORDERS ||--|{ ORDER_ITEMS : contains
    ORDERS ||--o| INVOICES : generates
    INVOICES ||--o{ PAYMENTS : receives
    ORDERS }o--|| SUB_DISTRIBUTORS : routed_to
    REGIONS ||--o{ PARTNERS : contains
    REGIONS ||--o{ SUB_DISTRIBUTORS : serves
    
    PARTNERS {
        uuid id PK
        string email UK
        string password_hash
        string business_name
        enum tier "SILVER|GOLD|PLATINUM"
        uuid region_id FK
        decimal credit_limit
        decimal credit_used
        int point_balance
        boolean is_active
        timestamp deleted_at "Soft Delete"
    }
    
    ORDERS {
        uuid id PK
        string order_number UK
        uuid partner_id FK
        uuid agent_id FK "nullable"
        uuid routed_subdist_id FK
        enum status
        decimal subtotal
        decimal discount_amount
        decimal grand_total
        int points_earned
        int points_used
        decimal point_discount
        boolean sla_reminder_sent
        boolean sla_escalated
        timestamp routed_at
    }
    
    ORDER_ITEMS {
        uuid id PK
        uuid order_id FK
        uuid product_id FK
        int quantity
        decimal unit_price
        decimal line_total
    }
    
    INVOICES {
        uuid id PK
        string invoice_number UK
        uuid order_id FK
        uuid partner_id FK
        decimal amount
        enum status "UNPAID|PARTIAL|PAID|CANCELLED"
        date due_date
        timestamp paid_at
    }
    
    PAYMENTS {
        uuid id PK
        uuid invoice_id FK
        decimal amount
        string payment_method
        string reference_number
        uuid recorded_by FK
    }
```

### 4.2 Catalog ERD

```mermaid
erDiagram
    PRODUCTS ||--o{ ORDER_ITEMS : sold_in
    PRODUCTS ||--o{ TIER_PRICES : has
    PRODUCTS ||--o{ VOLUME_DISCOUNTS : has
    PRODUCTS }o--|| BRANDS : belongs_to
    PRODUCTS }o--|| CATEGORIES : belongs_to
    PRODUCTS ||--o| INVENTORY_CACHE : has_stock
    
    PRODUCTS {
        uuid id PK
        string sku UK
        string name
        text description
        uuid brand_id FK
        uuid category_id FK
        decimal base_price
        decimal retail_price
        string image_url
        string erp_product_id
        boolean is_active
    }
    
    BRANDS {
        uuid id PK
        string name
        string logo_url
        boolean is_active
    }
    
    CATEGORIES {
        uuid id PK
        string name
        string slug UK
        uuid parent_id FK "self-reference"
    }
    
    TIER_PRICES {
        uuid id PK
        uuid product_id FK
        enum tier "SILVER|GOLD|PLATINUM"
        decimal price
        date effective_from
        date effective_to
    }
    
    VOLUME_DISCOUNTS {
        uuid id PK
        uuid product_id FK
        int min_quantity
        int max_quantity
        decimal discount_percent
        boolean is_active
    }
    
    INVENTORY_CACHE {
        uuid product_id PK,FK
        int erp_stock
        int safety_buffer
        int stock_available
        timestamp last_sync_at
    }
```

### 4.3 Loyalty ERD

```mermaid
erDiagram
    PARTNERS ||--o{ POINT_TRANSACTIONS : has
    PARTNERS ||--o{ REDEMPTIONS : makes
    CATALOG_ITEMS ||--o{ REDEMPTIONS : redeemed_as
    ORDERS ||--o| POINT_TRANSACTIONS : earns
    
    POINT_TRANSACTIONS {
        uuid id PK
        uuid partner_id FK
        uuid order_id FK "nullable"
        enum type "EARNED|REDEEMED|EXPIRED|ADJUSTED"
        int amount
        int balance_after
        string description
        timestamp created_at
    }
    
    CATALOG_ITEMS {
        uuid id PK
        string name
        text description
        int points_required
        string image_url
        enum category "PRODUCT|VOUCHER|EXPERIENCE"
        int stock_quantity
        boolean is_active
    }
    
    REDEMPTIONS {
        uuid id PK
        uuid partner_id FK
        uuid catalog_item_id FK
        int points_used
        enum status "PENDING|APPROVED|SHIPPED|DELIVERED|CANCELLED"
        string shipping_address
        string tracking_number
        timestamp created_at
    }
    
    POINT_SUMMARY {
        uuid partner_id PK
        int total_earned
        int total_redeemed
        int total_expired
        int current_balance
        timestamp last_transaction_at
    }
```

### 4.4 Agent & Audit ERD

```mermaid
erDiagram
    AGENTS ||--o{ AGENT_SESSIONS : starts
    AGENTS ||--o{ AUDIT_LOGS : creates
    AGENTS }o--|| REGIONS : assigned_to
    AGENT_SESSIONS }o--|| PARTNERS : impersonates
    
    AGENTS {
        uuid id PK
        string email UK
        string password_hash
        string full_name
        enum role "SALESMAN|ADMIN|SUPERADMIN"
        uuid region_id FK "nullable"
        boolean is_active
        timestamp last_login_at
    }
    
    AGENT_SESSIONS {
        uuid id PK
        uuid agent_id FK
        uuid impersonated_partner_id FK
        timestamp started_at
        timestamp ended_at "nullable"
        string ip_address
    }
    
    AUDIT_LOGS {
        uuid id PK
        uuid actor_id FK
        enum actor_type "PARTNER|AGENT|ADMIN|SYSTEM"
        uuid target_id FK
        enum target_type "ORDER|INVOICE|PARTNER|CONFIG"
        string action
        jsonb old_value
        jsonb new_value
        string ip_address
        timestamp created_at
    }
    
    SLA_ESCALATION_LOGS {
        uuid id PK
        uuid order_id FK
        enum escalation_type "REMINDER|ESCALATION"
        uuid notified_user_id FK
        timestamp escalated_at
        string notes
    }
    
    IMPERSONATION_NOTIFICATIONS {
        uuid id PK
        uuid session_id FK
        uuid order_id FK
        enum channel "WHATSAPP|EMAIL"
        enum status "SENT|FAILED"
        timestamp sent_at
    }
```

---

## 5. STATE DIAGRAMS

### 5.1 Order Status State Machine

```mermaid
stateDiagram-v2
    [*] --> DRAFT: Add to cart
    
    DRAFT --> SUBMITTED: Submit order
    note right of SUBMITTED
        Guards:
        - region_id assigned
        - SubDist available
    end note
    
    SUBMITTED --> PROCESSING: SubDist confirms
    
    SUBMITTED --> REJECTED: Credit denied
    
    SUBMITTED --> TIMEOUT: No response 48h
    note right of TIMEOUT
        Trigger: SLA Scheduler
        Actions:
        - Escalate to HQ
        - Auto-reassign option
    end note
    
    PROCESSING --> APPROVED: Admin approves
    note right of APPROVED
        Actions:
        - Create Invoice
        - Calculate points_earned
    end note
    
    SUBMITTED --> CANCELLED: Cancel order
    PROCESSING --> CANCELLED: Cancel order
    TIMEOUT --> CANCELLED: Cancel after timeout
    note left of CANCELLED
        Actions:
        - Restore credit_used
        - Cancel pending points
    end note
    
    APPROVED --> SHIPPED: Mark shipped
    
    SHIPPED --> COMPLETED: Delivery confirmed
    
    COMPLETED --> [*]
    CANCELLED --> [*]
    REJECTED --> [*]
    TIMEOUT --> [*]
```

### 5.2 Invoice Status State Machine


```mermaid
stateDiagram-v2
    [*] --> UNPAID: Invoice created
    note right of UNPAID
        Trigger: Order.status = APPROVED
        Actions:
        - Calculate due_date by tier
        - Generate invoice_number
    end note
    
    UNPAID --> PARTIAL: Partial payment
    note right of PARTIAL
        Guards:
        - payment.amount < remaining
        Actions:
        - Record payment
        - Update amount_paid
    end note
    
    UNPAID --> PAID: Full payment
    note right of PAID
        Guards:
        - total_paid >= amount
        Actions:
        - Set paid_at
        - Award points to partner
    end note
    
    PARTIAL --> PARTIAL: Another partial
    
    PARTIAL --> PAID: Final payment
    
    UNPAID --> CANCELLED: Cancel invoice
    
    UNPAID --> OVERDUE: Past due_date
    note right of OVERDUE
        Trigger: Scheduled job
        Actions:
        - Flag overdue
        - Notify partner
    end note
    
    OVERDUE --> PAID: Late payment
    
    PAID --> [*]
    CANCELLED --> [*]
```

### 5.3 Partner Tier State Machine

```mermaid
stateDiagram-v2
    [*] --> SILVER: New registration
    note right of SILVER
        Default tier
        Payment: CBD (Cash Before Delivery)
        Point multiplier: 1.0x
    end note
    
    SILVER --> GOLD: Upgrade criteria met
    note right of GOLD
        Criteria:
        - 6 months active
        - Total order > Rp 50M
        - No overdue > 30 days
        
        Payment: NET-14
        Point multiplier: 1.2x
    end note
    
    GOLD --> PLATINUM: Premium criteria met
    note right of PLATINUM
        Criteria:
        - 12 months active
        - Total order > Rp 200M
        - Payment history excellent
        
        Payment: NET-30
        Point multiplier: 1.5x
    end note
    
    GOLD --> SILVER: Downgrade
    note left of SILVER
        Trigger:
        - Overdue > 60 days
        - Inactive > 6 months
    end note
    
    PLATINUM --> GOLD: Downgrade
    
    PLATINUM --> SUSPENDED: Serious violation
    GOLD --> SUSPENDED: Serious violation
    SILVER --> SUSPENDED: Serious violation
    
    SUSPENDED --> SILVER: Re-activated
    
    note right of SUSPENDED
        Trigger:
        - Fraud detected
        - Unpaid > 90 days
        Actions:
        - Block orders
        - Notify sales
    end note
```

---

## 6. COMPONENT DIAGRAMS

### 6.1 Service Layer Architecture

```mermaid
classDiagram
    class AuthService {
        -partnerRepo PartnerRepository
        -jwtService JWTService
        +Login(req) TokenPair
        +Register(req) Partner
        +RefreshTokens(token) TokenPair
    }
    
    class AgentAuthService {
        -agentRepo AgentRepository
        -partnerRepo PartnerRepository
        -jwtService JWTService
        +Login(req) AgentLoginResponse
        +StartImpersonation(req) SessionResponse
        +EndImpersonation(sessionId)
    }
    
    class OrderService {
        -orderRepo OrderRepository
        -partnerRepo PartnerRepository
        -productRepo ProductRepository
        -subdistRepo SubDistRepository
        -configRepo ConfigRepository
        -auditService AuditNotifier
        -invoiceCreator InvoiceCreator
        +CreateOrder(req) Order
        +UpdateOrderStatus(id, status)
        +ApplyVolumeDiscount(items) float64
    }
    
    class InvoiceService {
        -invoiceRepo InvoiceRepository
        -partnerRepo PartnerRepository
        -loyaltyAwarder LoyaltyAwarder
        +CreateFromOrder(order) Invoice
        +RecordPayment(invoiceId, payment)
        +GetByPartner(partnerId) []Invoice
    }
    
    class LoyaltyService {
        -loyaltyRepo LoyaltyRepository
        -partnerRepo PartnerRepository
        +GetPointSummary(partnerId) Summary
        +AwardPoints(orderId)
        +CreateRedemption(req) Redemption
    }
    
    class CreditService {
        -partnerRepo PartnerRepository
        +Check(req) CheckResult
    }
    
    class ConfigService {
        -configRepo ConfigRepository
        -auditLogger AuditLogger
        +GetAllConfigs() []Config
        +SetConfig(key, value)
    }
    
    class SLAService {
        -db Database
        -config SLAConfig
        +Start()
        +Stop()
        +CheckPendingOrders()
        +SendReminder(orderId)
        +Escalate(orderId)
    }
    
    AuthService --> PartnerRepository
    AgentAuthService --> AgentRepository
    AgentAuthService --> PartnerRepository
    OrderService --> OrderRepository
    OrderService --> SubDistRepository
    OrderService ..> InvoiceService : creates invoice
    InvoiceService --> InvoiceRepository
    InvoiceService ..> LoyaltyService : awards points
    LoyaltyService --> LoyaltyRepository
    ConfigService --> ConfigRepository
```

### 6.2 Repository Pattern

```mermaid
classDiagram
    class PartnerRepository {
        <<interface>>
        +GetByID(id) Partner
        +GetByEmail(email) Partner
        +Create(partner) error
        +Update(partner) error
        +Delete(id) error
        +List(opts) []Partner, int64
        +UpdateCredit(id, amount) error
        +UpdatePoints(id, points) error
    }
    
    class PostgresPartnerRepository {
        -db *gorm.DB
        +GetByID(id) Partner
        +GetByEmail(email) Partner
        +Create(partner) error
        +Update(partner) error
        +Delete(id) error
        +List(opts) []Partner, int64
        +UpdateCredit(id, amount) error
        +UpdatePoints(id, points) error
    }
    
    class OrderRepository {
        <<interface>>
        +GetByID(id) Order
        +GetByOrderNumber(num) Order
        +Create(order) error
        +Update(order) error
        +UpdateStatus(id, status) error
        +List(opts) []Order, int64
        +ListByPartner(partnerId, opts) []Order, int64
    }
    
    class PostgresOrderRepository {
        -db *gorm.DB
        +GetByID(id) Order
        +GetByOrderNumber(num) Order
        +Create(order) error
        +Update(order) error
        +UpdateStatus(id, status) error
        +List(opts) []Order, int64
        +ListByPartner(partnerId, opts) []Order, int64
    }
    
    PartnerRepository <|.. PostgresPartnerRepository : implements
    OrderRepository <|.. PostgresOrderRepository : implements
    
    note for PartnerRepository "Domain interface\n(internal/domain/partner)"
    note for PostgresPartnerRepository "Implementation\n(internal/repository/postgres)"
```

### 6.3 Handler-Service-Repository Stack

```mermaid
flowchart TB
    subgraph "Presentation Layer"
        H1[AuthHandler]
        H2[OrderHandler]
        H3[InvoiceHandler]
        H4[LoyaltyHandler]
        H5[ConfigHandler]
    end
    
    subgraph "Application Layer (Services)"
        S1[AuthService]
        S2[OrderService]
        S3[InvoiceService]
        S4[LoyaltyService]
        S5[ConfigService]
        S6[AuditService]
        S7[SLAService]
    end
    
    subgraph "Domain Layer (Entities & Interfaces)"
        D1[Partner Entity]
        D2[Order Entity]
        D3[Invoice Entity]
        D4[Loyalty Entities]
        D5[Config Entity]
        R1[PartnerRepository Interface]
        R2[OrderRepository Interface]
        R3[InvoiceRepository Interface]
        R4[LoyaltyRepository Interface]
        R5[ConfigRepository Interface]
    end
    
    subgraph "Infrastructure Layer"
        PG[(PostgreSQL)]
        RD[(Redis)]
        ERP[ERP Adapter]
    end
    
    H1 --> S1
    H2 --> S2
    H3 --> S3
    H4 --> S4
    H5 --> S5
    
    S1 --> R1
    S2 --> R2
    S2 -.-> S6
    S3 --> R3
    S3 -.-> S4
    S4 --> R4
    S5 --> R5
    S5 -.-> S6
    S7 --> R2
    
    R1 --> PG
    R2 --> PG
    R3 --> PG
    R4 --> PG
    R5 --> PG
    
    S2 -.-> RD
    ERP -.-> RD
    
    style H1 fill:#E8F5E9
    style H2 fill:#E8F5E9
    style H3 fill:#E8F5E9
    style H4 fill:#E8F5E9
    style H5 fill:#E8F5E9
    style S1 fill:#E3F2FD
    style S2 fill:#E3F2FD
    style S3 fill:#E3F2FD
    style S4 fill:#E3F2FD
    style S5 fill:#E3F2FD
    style S6 fill:#E3F2FD
    style S7 fill:#E3F2FD
```

---

## Summary

| Category | Count | Purpose |
|----------|-------|---------|
| Architecture | 4 | System structure & boundaries |
| Business Flows | 6 | Core business processes |
| Sequences | 5 | Detailed interaction flows |
| ERD | 4 | Database relationships |
| State Machines | 3 | Status transitions |
| Components | 3 | Code architecture |
| **TOTAL** | **25** | Complete system documentation |

---

*Generated by CTO/CIO Analysis*  
*PT. Alfa Beauty Cosmetica B2B Platform*
