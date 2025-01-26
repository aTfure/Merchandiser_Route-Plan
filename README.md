# Merchandiser Management System

## Overview

The Merchandiser Management System is a web application that allows organizations to manage their merchandiser workforce. The key features include:

1. **User Management**: Create and manage user accounts with different roles (administration, manager, Team Leader etc.).
2. **Merchandiser Assignment**: Assign merchandisers to specific outlets and track their activities.
3. **Outlet Management**: Create and manage outlet information, including channel type and location.

## Technologies Used

- **Backend**: Django, Django REST Framework
- **Frontend**: React & Ant Design (planned)
- **Database**: PostgreSQL

## Data Model

The system's data model consists of the following main entities:

1. **User**: Represents an individual user with contact information and authentication credentials.
2. **Group**: Defines user roles, such as Administration and Manager, with associated permissions.
3. **OutletMerchandisers**: Connects merchandisers to the outlets they are assigned to.
4. **Outlet**: Represents a physical sales outlet with a name, location, and channel type.
5. **ChannelType**: Categorizes outlets by their sales channel (e.g., Supermarket Mid Income Large (B), Supermarket Small Low Income).

## API Endpoints

The system exposes the following API endpoints:

1. `admin/auth/group/`: CRUD operations for user groups and permissions.
2. `/api/merchandisers/`: CRUD operations for user accounts.
3. `/api/outlets/`: CRUD operations for outlets.
4. `/api/channel-types/`: CRUD operations for channel types.
5. `/api/outlets-merchandisers/`: Manage the assignment of users to outlets.

## Installation and Setup

1. Clone the repository: `git clone https://github.com/aTfure/Merchandiser_Route-Plan.git`
2. Create a virtual environment: `python -m venv env`
3. Activate the virtual environment:
   - Windows: `env\Scripts\activate`
   - macOS/Linux: `source env/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Set up the database:
   - Create a PostgreSQL database
   - Update the `DATABASES` setting in `settings.py` with your database credentials
6. Apply database migrations: `python manage.py migrate`
7. Create a superuser: `python manage.py createsuperuser`
8. Start the development server: `python manage.py runserver`

## Usage

1. Access the admin panel at `/admin/` and log in with the superuser credentials.
2. Create user groups and assign permissions.
3. Create user accounts and assign them to the appropriate groups.
4. Create outlets and channel types.
5. Assign merchandiser to specific outlets using the `/api/user-outlets/` endpoint.
6. Use the API endpoints to manage users, outlets, and merchandiser assignments.

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit them: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is licensed under the [MIT License](LICENSE).
