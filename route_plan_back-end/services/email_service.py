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

    start_date_str = schedule.start_date.strftime("%d %b %Y")
    end_date_str = schedule.end_date.strftime("%d %b %Y") if schedule.end_date else None
    date_range_str = f"{start_date_str} - {end_date_str}" if end_date_str else start_date_str

    # Email Data
    email_data = {
        'subject': f'Route Visit Scheduled: {schedule.route.name} ({date_range_str})',
        'to_email': schedule.route.merchandiser.email,
        'attachments': [{
            'filename': 'route_schedule.ics',
            'content': calendar_data['calendar'].to_ical(),
            'mimetype': 'text/calendar'
        }],
        'content_subtype': 'html'
    }

    available_times = schedule.available_time.all()
    days_of_week = sorted(set(at.day_of_week for at in available_times))
    day_names_list = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    days_with_info = []
    for day_num in days_of_week:
        times_for_day = available_times.filter(day_of_week=day_num)
        day_info = {
            'day_name': day_names_list[day_num],
            'times': []
        }
        for at in times_for_day:
            day_info['times'].append({
                'start_time': at.start_time,
                'end_time': at.end_time
            })
        days_with_info.append(day_info)

    # Render the HTML template
    context = {
        'schedule': schedule,
        'date_range_str': date_range_str,
        'days_with_info': days_with_info,
        # 'available_times': schedule.available_time.all(),
        # 'days_of_week': days_of_week,
        # 'day_names': day_names,
    }
    email_data['body'] = render_to_string('email/route_schedule_email.html', context)

    # Send Email
    return EmailService.send_email(**email_data)


def create_calendar_event(schedule):
    cal = Calendar()
    cal.add('prodid', '-//Route Plan//Route Schedule//EN')
    cal.add('version', '2.0')
    cal.add('calscale', 'GREGORIAN')

    tz = pytz.timezone('UTC')
    vtimezone = Timezone()
    vtimezone.add('TZID', 'UTC')
    cal.add_component(vtimezone)

    available_times = schedule.available_time.all()

    if not available_times:
        return {'calendar': cal,'start_time_str': "No Time Specified", 'end_time_str': "No Time Specified"}

    event = Event()
    event.add('summary', f'Route Visit: {schedule.route.name}')


    start_times = [datetime.combine(schedule.start_date, at.start_time).replace(tzinfo=pytz.UTC) for at in available_times]
    end_times = [datetime.combine(schedule.start_date, at.end_time).replace(tzinfo=pytz.UTC) for at in available_times]

    start_dt = min(start_times)
    end_dt = max(end_times)

    event.add('dtstart', start_dt)
    event.add('dtend', end_dt)

    if schedule.end_date:
        until_date = datetime.combine(schedule.end_date, max([at.end_time for at in available_times])).replace(tzinfo=pytz.UTC)

        day_names = []
        for at in available_times:
            day_name = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'][at.day_of_week]
            if day_name not in day_names:
                day_names.append(day_name)

        rrule = {
            'freq': 'WEEKLY',
            'byday': day_names,
            'until': until_date
        }
        
        event.add('rrule', rrule)  

    
    cal.add_component(event)
    
    start_time_str = min([at.start_time for at in available_times]).strftime('%I:%M %p')
    end_time_str = max([at.end_time for at in available_times]).strftime('%I:%M %p')

    return {'calendar': cal, 'start_time_str': start_time_str, 'end_time_str': end_time_str}