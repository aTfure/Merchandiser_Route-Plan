from routes.models import RouteSchedule
from django.core.mail import EmailMessage
from django.conf import settings
from icalendar import Calendar, Event, Timezone
import pytz
from datetime import datetime, timedelta, time
from django.template.loader import render_to_string

class EmailService:
    @staticmethod
    def send_email(subject, body, to_email, attachments=None, content_subtype='plain'):
        try:
            email = EmailMessage(
                subject=subject,
                body=body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[to_email]
            )
            email.content_subtype = content_subtype

            if attachments:
                for attachment in attachments:
                    email.attach(
                        attachment['filename'],
                        attachment['content'],
                        attachment['mimetype']
                    )
            return email.send()

        except Exception as e:
            print(f'Error sending email: {str(e)}')
            return False


def send_schedule_notification(schedule: RouteSchedule):
    route = schedule.route
    merchandiser = route.merchandiser

    if not merchandiser or not merchandiser.email:
        return False

    calendar_data = create_calendar_event(schedule)

    # Email Data
    email_data = {
        'subject': f'Route Visit Scheduled: {schedule.route.name}',
        'to_email': schedule.route.merchandiser.email,
        'attachments': [{
            'filename': 'route_schedule.ics',
            'content': calendar_data['calendar'].to_ical(),
            'mimetype': 'text/calendar'
        }],
        'content_subtype': 'html'
    }
    end_date_str = schedule.end_date.strftime("%d %b %Y") if schedule.end_date else None

    # Render the HTML template
    email_data['body'] = render_to_string('email/route_schedule_email.html', {
        'schedule': schedule,
        'start_time_str': calendar_data['start_time_str'],
        'end_time_str': end_date_str,
    })

    # Send Email
    return EmailService.send_email(**email_data)


def create_calendar_event(schedule):
    cal = Calendar()
    cal.add('prodid', '-//Route Plan//Route Schedule//EN')
    cal.add('version', '2.0')
    cal.add('calscale', 'GREGORIAN')

    vtimezone = Timezone.from_ical(
        """BEGIN:VTIMEZONE\r\nTZID:UTC\r\nEND:VTIMEZONE"""
    )
    cal.add_component(vtimezone)

    event = Event()
    route = schedule.route

    event.add('summary', f'Route Visit: {route.name}')

    available_times = schedule.available_time.all()

    start_time = None
    end_date = None
    start_time_str = None
    end_time_str = None
    
    if available_times.exists():
        first_available_time = available_times[0]
        start_time = first_available_time.start_time
        end_time = first_available_time.end_time
        start_time_str = start_time.strftime('%I:%M %p')
        end_time_str = end_time.strftime('%I:%M %p')
    else:
        # Handle the case where no available times are defined
        print("No available times defined for this schedule!")
        start_time_str = "No Time Specified"
        end_time_str = "No Time Specified"

    # Combine date and time into datetime
    if start_time and end_time:
        start_dt = datetime.combine(
            schedule.start_date,
            start_time
        ).replace(tzinfo=pytz.UTC)
        
        
        # Use end_date if available, otherwise use schedule_date
        end_date = schedule.end_date if schedule.end_date else schedule.start_date
        
        end_dt = datetime.combine(
            end_date,
            end_time
        ).replace(tzinfo=pytz.UTC)
        
        event.add('dtstart', start_dt)
        event.add('dtend', end_dt)

    return {
        'calendar': cal,
        'start_time_str': start_time_str,
        'end_time_str': end_time_str
    }