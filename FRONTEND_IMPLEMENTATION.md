# B2B Marketplace Frontend Implementation

## Overview

The B2B Marketplace frontend is built with Next.js (not Angular as documented), using TypeScript, React, and a component-driven architecture. The application is designed to support the GCC/MENA region with bilingual support for English and Arabic with RTL layout for Arabic.

## Technology Stack

### Core Technologies
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Zustand, React Query (@tanstack/react-query)
- **Forms**: React Hook Form with Zod validation
- **Internationalization**: next-intl
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives with custom shadcn/ui wrapper components

### Key Dependencies
- `@tanstack/react-query` - Server state management and data fetching
- `zustand` - Client state management for cart and user data
- `next-intl` - Internationalization and localization
- `react-hook-form` - Form management
- `zod` - Schema validation
- `class-variance-authority` - Component styling variants
- `clsx` and `tailwind-merge` - Class name utilities

## Architecture & Structure

### Application Structure
```
frontend/
├── app/                    # Next.js App Router pages
│   ├── (public)/          # Public routes (catalog, etc.)
│   ├── [lng]/             # Locale-specific routes
│   ├── account/           # Account management
│   ├── admin/             # Admin functionality
│   ├── api/               # API routes
│   ├── invoices/          # Invoice management
│   ├── loyalty/           # Loyalty program
│   ├── orders/            # Order management
│   ├── payments/          # Payment functionality
│   ├── quotes/            # Quote management
│   ├── rfq/               # Request for Quotation
│   ├── wallet/            # Wallet functionality
│   ├── client-provider.tsx # Client-side provider wrapper
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── providers.tsx      # Provider wrapper
│   └── query-provider.tsx # React Query provider
├── components/            # Shared UI components
├── features/              # Feature-specific components
├── libs/                  # Shared libraries and utilities
├── public/                # Static assets
├── styles/                # Global styles
```

### Routing & Internationalization
The application uses Next.js App Router with internationalization support:
- Dynamic locale routing using `[lng]` segments
- Automatic locale detection and redirection
- RTL layout support for Arabic locale
- Server-side rendering with locale-specific content
- Middleware to handle locale routing and redirects

### Data Architecture
- **Server State**: Managed with React Query for API data fetching, caching, and synchronization
- **Client State**: Zustand for local application state (cart, user info)
- **Form State**: React Hook Form for form management and validation
- All API calls follow a centralized configuration pattern using API endpoints defined in `libs/config/api.ts`

## UI Component System

### Component Hierarchy
- **UI Library**: Located in `libs/ui/`, implementing shadcn/ui design system
- **Shared Components**: Located in `components/`, used across multiple features
- **Feature Components**: Located in `features/[feature]/`, specific to business domains
- **Page Components**: Located in `app/[route]/`, implementing page-level logic

### UI Components
- `Button` - Configurable button component with variants and sizes
- `Input` - Form input with styling
- `Modal` - Modal dialog implementation
- Custom components like `ProductCard`, `NavigationHeader`, `CatalogList`

## Feature Implementations

### Product Catalog
- **Catalog List Page**: `/catalog` - Displays products with search and pagination
- **Product Detail**: `/product/[id]` - Shows detailed product information
- **Search Feature**: Debounced search with feature flag control
- **Filtering**: Category-based filtering (planned)
- **Pagination**: Server-side pagination with page controls

### RFQ (Request for Quotation)
- **RFQ Creation**: Form to create new RFQs with multiple product lines
- **RFQ Management**: Tabbed interface to create RFQs and view quotes
- **Quote Submission**: Vendor interface to submit quotes for RFQs
- **Quote Comparison**: Buyer interface to compare and accept quotes
- **API Integration**: Full CRUD operations for RFQ lifecycle

### Navigation & Layout
- **Responsive Navigation Header**: Supports locale switching and main navigation
- **Feature Flag Integration**: Menu items appear/disappear based on feature flags
- **Locale Detection**: Automatic RTL layout for Arabic content
- **SEO Optimized**: Proper metadata and structured content

## Internationalization (i18n)

### Language Support
- **Supported Languages**: English (en) and Arabic (ar)
- **RTL Support**: Automatic RTL layout for Arabic locale
- **Message Files**: JSON files in `messages/[locale].json` for translations
- **Server-Side Rendering**: Locale-specific content rendered on the server

### Implementation
- `next-intl` for internationalization
- Automatic locale detection
- Static generation of locale paths
- Client-side locale switching capability

## Feature Flag System

### Implementation
- Context-based feature flag provider
- Environment variable configuration
- Runtime flag updates
- Component-level flag checking

### Available Flags
- `catalog.publicBrowse` - Public catalog browsing
- `search.enabled` - Product search functionality
- `rfq.enabled` - RFQ creation
- `orders.checkout` - Order checkout process
- `payments.gateway1` - Payment gateway integration
- `wallet.basic` - Corporate wallet functionality
- `invoice.vat` - VAT invoice generation
- `loyalty.core` - Loyalty program
- `credit.controls` - Credit limit controls

## State Management

### Client State (Zustand)
1. **User Store** (`useUserStore`):
   - Authentication state management
   - User profile information
   - Login/logout functionality

2. **Cart Store** (`useCartStore`):
   - Shopping cart functionality
   - Item management (add, remove, update quantity)
   - Cart totals calculation
   - Persistent cart state

### Server State (React Query)
- **Automatic caching** of API responses
- **Background data synchronization**
- **Request deduplication**
- **Offline support capabilities**
- **Debounced API calls** for search operations

## API Integration

### API Configuration
- Centralized endpoint management in `libs/config/api.ts`
- Environment-based API URL configuration
- Consistent data fetching patterns across the application

### Service Layer
- API service files in `libs/api/[module]/service.ts`
- Type-safe API calls using TypeScript interfaces
- Error handling and fallback strategies
- React Query hooks for data fetching

### Data Models
- TypeScript interfaces for all data structures
- Zod schemas for validation (where applicable)
- Consistent naming and structure matching backend API
- Comprehensive type definitions for all business entities

## UI/UX Features

### Responsive Design
- Mobile-first approach with responsive layouts
- Grid-based product catalog display
- Adaptive navigation for different screen sizes
- Touch-friendly controls and interactions

### Accessibility
- Proper semantic HTML structure
- ARIA attributes for dynamic content
- Keyboard navigation support
- Screen reader compatibility
- High-contrast mode support (planned)

### Performance
- Client-side data caching with React Query
- Server-side rendering for improved initial load
- Code splitting and bundle optimization
- Lazy loading of components
- Debounced search to minimize API calls

## Development Patterns

### Component Architecture
- **Presentational Components**: Display data without business logic
- **Container Components**: Handle data fetching and state management
- **Controlled Components**: Form inputs with React Hook Form
- **Compound Components**: Complex components with multiple sub-components

### Error Handling
- Global error boundaries
- API error handling with user feedback
- Fallback UI for loading states
- Graceful degradation when API calls fail

### Testing
- Unit tests in `__tests__/` directories
- Component testing capabilities
- API mock implementations for development

## Security & Performance

### Security
- JWT token storage in localStorage
- Authorization headers for API calls
- Input sanitization in forms
- Secure API endpoint access

### Performance Optimizations
- Image optimization (planned)
- Component lazy loading
- Memoization for expensive computations
- Efficient state updates
- Optimized data fetching patterns

## Deployment & Environment

### Environment Variables
- `NEXT_PUBLIC_BACKEND_URL` - Backend API base URL
- Feature flag environment variables
- Localization configuration

### Build Configuration
- Next.js configuration with custom settings
- Tailwind CSS for styling
- TypeScript compilation with strict settings
- Production-ready optimization settings

## Future Scalability

The frontend architecture is designed for:
- Modular expansion of business features
- Multi-language support beyond Arabic/English
- Integration with additional payment gateways
- Advanced search and filtering capabilities
- Mobile application compatibility
- Analytics and performance monitoring integration