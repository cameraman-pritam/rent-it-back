# RentBack

The Digital Commons  
A community platform for local renting, selling and sharing of goods.

## Overview

RentBack is a web application that enables individuals and communities to list, discover and transact physical items locally. The platform promotes a circular economy by facilitating reuse, rental and resale instead of new consumption.

Built as a minimal, production-ready full-stack application with strict separation of concerns and modern tooling.

## Technology Stack

- **Frontend**: ReactJS (Vite)
- **Styling**: Tailwind CSS
- **UI Components**: PrimeReact + PrimeIcons
- **Animations**: Framer Motion
- **Build Tool**: Bun
- **Routing**: React Router DOM
- **Backend & Database**: Supabase
- **Hosting**: Firebase Hosting

## Architecture

- Code-split routes using `React.lazy()` and `<Suspense>` with PrimeReact `Skeleton` loaders
- Supabase Auth with profile synchronization via database trigger
- Public `listings` storage bucket for item images
- RLS policies enforcing ownership on user data and listings
- Client-side filtering on the browse interface

## Features

- User authentication and profile management
- Create listings with multiple image uploads to Supabase Storage
- Browse all listings in a responsive card grid
- Search and multi-criteria filters (category, transaction type, condition, price range, location)
- Image gallery modal for detailed viewing
- Responsive layout optimized for mobile and desktop

## Project Structure

```
src/
├── components/
├── contexts/
├── pages/
│   ├── Home.jsx
│   ├── Auth.jsx
│   ├── AddListing.jsx
│   ├── Browse.jsx
│   └── About.jsx
├── App.jsx
└── main.jsx
```

## License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0).

Version 3, 29 June 2007
Copyright © 2007 Free Software Foundation, Inc. <http://fsf.org/>

Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is not allowed.

Direct copy-paste deployment of this exact codebase to run an identical competing service without meaningful contribution is strongly discouraged. The purpose of releasing the source code is to share knowledge, patterns, and technical solutions within the open-source community, not to facilitate effortless replication for commercial competition.

Contributions that improve the codebase, fix issues, or add meaningful features are welcome through pull requests.

Full license text is available in the [LICENSE](LICENSE) file.

## Philosophy

RentBack exists to support a more sustainable relationship with material goods.  
Reducing unnecessary consumption and extending the life of existing items benefits both communities and the environment.

The platform remains free to use indefinitely.

Made with Bun, PrimeReact, and Tailwind CSS.  
Backend powered by Supabase. Hosted on Firebase.

---

**cameraman-pritam**  
Kolkata, West Bengal
