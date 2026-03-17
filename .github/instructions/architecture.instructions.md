---
applyTo: "**/*.ts,**/*.css,**/*.html"
---

# Project Architecture

## Structure

```bash
/my-app
  ├── /apps
  │   ├── /app-name-1
  │   │   ├── /src
  │   │   ├── /public
  │   ├── /app-name-2
  │   │   ├── /src
  │   │   ├── /public
  ├── /libs
  │   ├── /front-end
  │   │   ├── /pages        
  │   │   │   ├── /src                  
  │   │   │   │   ├── /lib              
  │   │   │   │   │   ├── /pages
  │   │   │   │   │   │   ├── /home-page             # Home Page
  │   │   │   │   │   │   │   ├── home-page.ts        # HomePage Angular component
  │   │   │   │   │   │   │   ├── home-page.css       # HomePage CSS
  │   │   │   │   │   │   │   ├── home-page.html      # HomePage View
  │   │   │   │   │   │   │   ├── home-page.spec.ts   # HomePage Tests
  │   │   │   │   │   ├── routes.ts                   # all application routes
  │   │   │   │   ├── index.ts
  │   │   ├── /core        
  │   │   │   ├── /src                  
  │   │   │   │   ├── /lib              
  │   │   │   │   │   ├── /components                # UI Components related to core
  │   │   │   │   │   │   ├── /header
  │   │   │   │   │   │   │   ├── header.ts           # Header Angular component
  │   │   │   │   │   │   │   ├── header.css          # Header CSS
  │   │   │   │   │   │   │   ├── header.html         # Header View
  │   │   │   │   │   │   │   ├── header.spec.ts      # Header Tests
  │   │   │   │   │   │   ├── /footer
  │   │   │   │   │   │   │   ├── footer.ts           # Footer Angular component
  │   │   │   │   │   │   │   ├── footer.css          # Footer CSS
  │   │   │   │   │   │   │   ├── footer.html         # Footer View
  │   │   │   │   │   │   │   ├── footer.spec.ts      # Footer Tests
  │   │   │   │   │   ├── /directives                 # Angular directives related to core
  │   │   │   │   │   ├── /services                   # Angular services related to core
  │   │   │   │   │   │   ├── /navigation
  │   │   │   │   │   │   │   ├── navigation.ts        # Navigation Service
  │   │   │   │   │   │   │   ├── navigation.spec.ts   # Navigation Service Tests
  │   │   │   │   ├── index.ts
  │   │   ├── /shared                         # It has to have configuration to export each file individually, 
  │   │   │   │                               # not all via index.ts because all shared logic can increase bundle size.   
  │   │   │   ├── /src                  
  │   │   │   │   ├── /lib              
  │   │   │   │   │   ├── /components                  # UI Components related to shared
  │   │   │   │   │   │   ├── /button
  │   │   │   │   │   │   │   ├── button.ts            # Button Angular component
  │   │   │   │   │   │   │   ├── button.css           # Button CSS
  │   │   │   │   │   │   │   ├── button.html          # Button View
  │   │   │   │   │   │   │   ├── button.spec.ts       # Button Tests
  │   │   │   │   │   │   ├── /img
  │   │   │   │   │   │   │   ├── img.ts               # Responsive Image Angular component
  │   │   │   │   │   │   │   ├── img.css              # Image CSS
  │   │   │   │   │   │   │   ├── img.html             # Image View
  │   │   │   │   │   │   │   ├── img.spec.ts          # Image Tests
  │   │   │   │   │   ├── /directives                  # Angular directives related to shared
  │   │   │   │   │   │   ├── /scroll-to
  │   │   │   │   │   │   │   ├── scroll-to.ts         # Srcoll To Angular directive
  │   │   │   │   │   │   │   ├── scroll-to.spec.ts    # Tests for Srcoll To Angular directive
  │   │   │   │   │   │   │   ├── img.spec.ts          # Image Tests
  │   │   │   │   │   ├── /pipes                       # Angular pipes related to shared
  │   │   │   │   │   │   ├── /a-pipe
  │   │   │   │   │   │   │   ├── a-pipe.ts             # A Pipe Angular directive
  │   │   │   │   │   │   │   ├── a-pipe.spec.ts        # Tests for A Pipe Angular directive
  │   │   │   │   │   ├── /services                     # Angular services related to shared
  │   │   │   │   │   │   ├── /cookie
  │   │   │   │   │   │   │   ├── cookie.ts             # Cookie Service
  │   │   │   │   │   │   │   ├── cookie.spec.ts        # Cookie Tests
  │   │   │   │   │   ├── /tokens                       # Angular tokens
  │   │   │   │   │   │   ├── config.ts                 # Configuration token
  │   │   │   │   │   ├── routes.ts                     # all application routes
  │   │   │   │   ├── index.ts
  │   │   ├── /features                          # Each domain entity has its own folder
  │   │   │   ├── /user
  │   │   │   │   ├── /src                  
  │   │   │   │   │   ├── /lib              
  │   │   │   │   │   │   ├── /domain                  # Business model and data access logic
  │   │   │   │   │   │   │   ├── user.model.ts        # Business model (pure JS/TS)
  │   │   │   │   │   │   │   ├── user.store.spec.ts   # Tests for the logic in user.store.ts
  │   │   │   │   │   │   │   ├── user.store.ts   # Data access from store (Redux, Firebase). Persistence logic. It has methods like
  │   │   │   │   │   │   │   │                   # getById, getAll, updateOne, removeOne, removeMany, etc. Also for every entry it has state isLoading, 
  │   │   │   │   │   │   │   │                   # error, etc. and methods to update this state. 
  │   │   │   │   │   │   │   │                   # It has methods that call API methods from user.service.ts to fetch data from the server
  │   │   │   │   │   │   │   │                   # and update the store. In some meaning it also has use-cases logic 
  │   │   │   │   │   │   │   │                   # as it has methods getEntityById(), getEntityByUrl(), getEntities(), that return 
  │   │   │   │   │   │   │   │                   # Observable<{ data: Entity, isLoading, error }> | Observable<{ data: Entity[], isLoading, error }>
  │   │   │   │   │   │   ├── /infrastructure          # all about REST, GraphQL, and data transformation (DTO)
  │   │   │   │   │   │   │   ├── user.api.ts          # API interactions (REST/GraphQL) - just requests to the server (GET, POST, PUT, DELETE)
  │   │   │   │   │   │   │   ├── user.api.spec.ts     # Tests for API interactions (REST/GraphQL) - just requests to the server (GET, POST, PUT, DELETE)
  │   │   │   │   │   │   │   ├── user.dto.ts          # Data transform object model got from third party API | only needed if DTO differs
  │   │   │   │   │   │   │   │                        # from domain model
  │   │   │   │   │   │   │   ├── user.transform.ts    # Functions that transform DTO to domain model | only needed if DTO differs 
  │   │   │   │   │   │   │   │                        # from domain model
  │   │   │   │   │   │   │   ├── user.service.spec.ts # Test for functions that transform input data, use methods from `user.api.ts` 
  │   │   │   │   │   │   │   ├── user.service.ts      # Functions that transform input data, use methods from `user.api.ts` 
  │   │   │   │   │   │   │   │                        # to make request to the server, and transform response data to domain model 
  │   │   │   │   │   │   │   │                        # using `user.transform.ts` functions | it not always needed
  │   │   │   │   │   │   ├── /components              # UI Components related to User
  │   │   │   │   │   │   │   ├── /user-card         
  │   │   │   │   │   │   │   │   ├── user-card.ts        # UserCard Angular component
  │   │   │   │   │   │   │   │   ├── user-card.css       # UserCard component
  │   │   │   │   │   │   │   │   ├── user-card.html      # UserCard View
  │   │   │   │   │   │   │   │   ├── user-card.spec.ts   # UserCard Tests
  │   │   │   │   │   │   │   ├── /user-form         
  │   │   │   │   │   │   │   │   ├── user-form.ts        # UserForm Angular component
  │   │   │   │   │   │   │   │   ├── user-form.css       # UserForm CSS
  │   │   │   │   │   │   │   │   ├── user-form.html      # UserForm View
  │   │   │   │   │   │   │   │   ├── user-form.spec.ts   # UserForm Tests
  │   │   │   │   │   │   ├── index.ts                    # Barrel export for easy imports
  │   │   ├── /utils                           # Utilities (isSafari, isMobile), helpers (NO usually they are handle domain logic), constants
  │   │   │   ├── /src                         # It has to have configuration to export each file individually, 
  │   │   │   │   ├── /lib              
  │   │   │   │   │   ├── isSafari.ts    
  │   │   │   │   │   ├── getId.ts      
  │   │   │   │   ├── index.ts                 # Barrel export for easy imports
  │   ├── /back-end 
  │   │   ├── /features                         # Each domain entity has its own folder
  │   │   │   ├── /user
  │   │   │   │   ├── /src                  
  │   │   │   │   │   ├── /lib  
  │   │   │   │   │   │   ├── user.model.ts      # database model (MongoDB, Firebase, POSTGres, etc)
  │   │   │   │   │   │   ├── user.repository.ts # Access to db model with basic methods like getById, getAll, updateOne, removeOne, removeMany, etc.
  │   │   │   │   │   │   ├── user.service.ts    # Service with complex logic, validations, can use many repositories
  │   │   ├── /utils                           # Contains utilities only on the BE side, usually they are  pure simple functions
  │   │   │   ├── /src                         # It has to have configuration to export each file individually, 
  │   │   │   │   ├── /lib              
  │   │   │   │   │   ├── getId.ts    
  │   │   ├── /shared-lib                      # library with more complex logic than utitilies: CustomError, ApiClient, etc
  │   │   │   ├── /src                         
  │   │   │   │   ├── /lib              
  │   │   │   │   │   ├── dbConnect.ts    
  │   │   │   │   │   ├── auto-increment-mongoose.ts
  │   ├── /shared
  │   │   ├── /src                         # It has to have configuration to export each file individually, 
  │   │   │   ├── /lib
  │   │   │   │   ├── /constants      # constants
  │   │   │   │   ├── /utils          # utilities - usually pure simple functions
  │   │   │   │   ├── /lib            # library with more complex logic than utitilies: CustomError, ApiClient, etc
  │   │   │   │   ├── /features       # everything that has data structure: image, seo, etc. 
  │   │   │   │   │   │                # There could be no domain logic here (functions that    work with data, validations, etc).
  │   │   │   │   │   ├── /user
  │   │   │   │   │   │   ├── /domain                  # Business model and data access logic
  │   │   │   │   │   │   │   ├── user.model.ts        # Business model (pure JS/TS)
  │   │   │   │   │   │   │   ├── user.repository.ts   # Class with methods or just functions to work with user data. It has methods like
  │   │   │   │   │   │   │   │                       # getById, getAll, updateOne, removeOne, removeMany, etc.   
  │   │   │   │   │   │   ├── /validation-schemas      # next.js only, to validate form inputs on FE and in backend API endpoints. ???
  │   │   │   │   │   │   │   │                        # Partially actions can reduce their logic. Only on BE.  
  │   │   │   │   │   │   │   ├── user.sign-up.schema.ts        # Business model (pure JS/TS)
  │   │   │   │   ├── index.ts                 # Barrel export for easy imports
  ├── /config      
  │   ├── config.ts       # file that has configuration options. It consumes process.env. variables for BE and app folder only. 
  │   │                   # Not to import in FE
  ├── package.json
  ├── README.md
```
