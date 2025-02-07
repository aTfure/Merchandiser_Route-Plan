from icalendar import Calendar, Event
from django.core.mail import EmailMessage
from django.conf import settings
import pytz
from datetime import datetime, timedelta


def send_route_email(merchandiser, route):
    # Create calendar event
    cal = Calendar()
    cal.add('propdid', '-//Route Plan//Route Assignment//EN')
    cal.add('version', '2.0')


    event = Event()
    event.add('summary', f'Route Assignment: {route.name}')
    event.add('dtstart', datetime.now(pytz.utc) + timedelta(hours=24))
    event.add('dtend', datetime.now(pytz.utc) + timedelta(hours=25))
    event.add('description', f"Route includes {route.route_outlets.count()} outlets")

    cal.add_component(event)

    # Create email
    email = EmailMessage(
        subject=f"New Route Assignment: {route.name}",
        body=f'You have been assigned to route {route.name}',
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[merchandiser.email],
    )

    # Attach ICS file
    email.attach('route_schedule.ics', cal.to_ical(), 'text/calendar')


    # Send Email
    email.send()