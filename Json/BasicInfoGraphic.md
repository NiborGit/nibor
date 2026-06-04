```mermaid
flowchart TB
  %% =========================
  %% BASIC APP INFOGRAPHIC
  %% =========================

  U((User))

  subgraph UI[Client / UI]
    P[Profile Page\n {View + Edit}]
    F[Form Input\n{Create / Update Records}]
    S[Search Page\n{Query + Filters}]
  end

  subgraph API[Backend / API Layer]
    AUTH[Auth + Session\n{OAuth/JWT/Cookies}]
    PROF[Profile Service\nCRUD user profile]
    FORM[Form Service\nValidate + Save inputs]
    SEARCH[Search Service\nQuery builder + ranking]
  end

  subgraph DATA[Data Stores]
    UDB[(User DB\nProfiles, settings)]
    ADB[(App DB\nUser-submitted records)]
    IDX[(Search Index\nElasticsearch / OpenSearch)]
  end

  subgraph EXT[External Data Imports]
    SRC1[[External API #1\n(e.g., catalog, partners)]]
    SRC2[[External API #2\n(e.g., public datasets)]]
    ETL[Import/ETL Job\nSchedule + dedupe + normalize]
  end

  %% User flows
  U --> P
  U --> F
  U --> S

  %% UI -> API
  P --> AUTH --> PROF
  F --> AUTH --> FORM
  S --> AUTH --> SEARCH

  %% API -> Data
  PROF --> UDB
  FORM --> ADB
  SEARCH --> IDX

  %% Imports -> Index/DB
  SRC1 --> ETL
  SRC2 --> ETL
  ETL --> ADB
  ETL --> IDX

  %% Optional: keep index fresh from app DB too
  ADB -. reindex/updates .-> IDX
