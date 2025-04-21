# UI Components Documentation

This document provides an overview of the UI components used in the Apartment Listings Platform frontend.

## Overview

The frontend of the Apartment Listings Platform is built using Next.js and React, with a component-based architecture. The UI components are organized into two main categories:

1. **Domain-specific components**: Components that are specific to the apartment listings domain
2. **Reusable UI components**: Generic UI components that can be used across the application

## Domain-Specific Components

These components are tailored to the specific needs of the Apartment Listings Platform.

### Apartment Components

#### ApartmentCard

**File**: `UI/components/apartment-card.tsx`

A card component that displays a summary of an apartment, including:
- Image
- Price
- Name
- Location
- Key features (rooms, bathrooms, size)

**Usage**:
```tsx
<ApartmentCard apartment={apartmentData} />
```

#### ApartmentDetails

**File**: `UI/components/apartment-details.tsx`

A component that displays detailed information about an apartment, including:
- Image gallery
- Price and status
- Description
- Features and amenities
- Location information
- Contact information

**Usage**:
```tsx
<ApartmentDetails apartment={apartmentData} />
```

#### ApartmentListings

**File**: `UI/components/apartment-listings.tsx`

A component that displays a grid of apartment cards with pagination.

**Usage**:
```tsx
<ApartmentListings apartments={apartmentsData} />
```

#### AddApartmentModal

**File**: `UI/components/add-apartment-modal.tsx`

A multi-step form modal for adding a new apartment listing.

**Usage**:
```tsx
<AddApartmentModal isOpen={isOpen} onClose={handleClose} />
```

### Filter Components

#### FilterPanel

**File**: `UI/components/filter-panel.tsx`

A panel with filters for searching apartments by various criteria:
- Price range
- Property type
- Number of rooms
- Location
- Amenities

**Usage**:
```tsx
<FilterPanel onFilterChange={handleFilterChange} />
```

### Navigation Components

#### Header

**File**: `UI/components/header.tsx`

The application header with navigation links and user controls.

**Usage**:
```tsx
<Header />
```

#### Footer

**File**: `UI/components/footer.tsx`

The application footer with links and copyright information.

**Usage**:
```tsx
<Footer />
```

#### BackToListings

**File**: `UI/components/back-to-listings.tsx`

A navigation component to return to the listings page.

**Usage**:
```tsx
<BackToListings />
```

### Other Components

#### SimilarProperties

**File**: `UI/components/similar-properties.tsx`

A component that displays similar properties based on the current property being viewed.

**Usage**:
```tsx
<SimilarProperties currentApartmentId={id} />
```

#### Icons

**File**: `UI/components/icons.tsx`

A collection of SVG icons used throughout the application.

**Usage**:
```tsx
<Icons.Home />
<Icons.Bed />
<Icons.Bath />
```

## Reusable UI Components

The application uses a comprehensive set of reusable UI components based on the Shadcn UI library. These components are located in the `UI/components/ui` directory.

### Layout Components

- **Accordion**: Expandable content panels
- **AspectRatio**: Maintains a consistent width-to-height ratio
- **Card**: Container with header, content, and footer sections
- **Collapsible**: Toggle the visibility of content
- **Dialog**: Modal dialog boxes
- **Drawer**: Side panel that slides in from the edge of the screen
- **HoverCard**: Card that appears when hovering over an element
- **Popover**: Floating content that appears next to an element
- **ResizablePanel**: Panel that can be resized by the user
- **ScrollArea**: Scrollable container with custom scrollbars
- **Sheet**: Dialog that slides in from the edge of the screen
- **Sidebar**: Navigation sidebar with collapsible sections
- **Tabs**: Tabbed interface for organizing content

### Form Components

- **Button**: Standard button component with various styles
- **Checkbox**: Checkbox input component
- **Form**: Form component with validation
- **Input**: Text input component
- **InputOTP**: One-time password input
- **Label**: Form label component
- **RadioGroup**: Group of radio buttons
- **Select**: Dropdown select component
- **Slider**: Range slider component
- **Switch**: Toggle switch component
- **Textarea**: Multi-line text input component

### Data Display Components

- **Avatar**: User avatar component
- **Badge**: Small status indicator
- **Calendar**: Date picker calendar
- **Chart**: Data visualization component
- **Progress**: Progress indicator
- **Table**: Data table component
- **ToggleGroup**: Group of toggle buttons

### Navigation Components

- **Breadcrumb**: Breadcrumb navigation
- **Command**: Command palette for keyboard navigation
- **ContextMenu**: Right-click context menu
- **DropdownMenu**: Dropdown menu component
- **Menubar**: Horizontal menu bar
- **NavigationMenu**: Navigation menu component
- **Pagination**: Pagination controls

### Feedback Components

- **Alert**: Alert message component
- **AlertDialog**: Confirmation dialog
- **Skeleton**: Loading placeholder
- **Toast**: Notification toast
- **Tooltip**: Information tooltip

## Hooks

The application includes several custom hooks to enhance component functionality:

### useMobile

**File**: `UI/hooks/use-mobile.tsx`

A hook that detects if the current viewport is mobile-sized.

**Usage**:
```tsx
const isMobile = useMobile();
```

### useToast

**File**: `UI/hooks/use-toast.ts`

A hook for displaying toast notifications.

**Usage**:
```tsx
const { toast } = useToast();
toast({
  title: "Success",
  description: "Operation completed successfully",
});
```

## Theme Provider

**File**: `UI/components/theme-provider.tsx`

A provider component that manages the application's theme (light/dark mode).

**Usage**:
```tsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

## Best Practices

When working with the UI components in this project, follow these best practices:

1. **Composition over inheritance**: Compose components together rather than extending them
2. **Single responsibility**: Each component should have a single responsibility
3. **Reusability**: Create components that can be reused across the application
4. **Accessibility**: Ensure components are accessible to all users
5. **Responsive design**: Components should work well on all screen sizes
6. **Performance**: Optimize components for performance, using memoization where appropriate
7. **Testing**: Write tests for components to ensure they work as expected