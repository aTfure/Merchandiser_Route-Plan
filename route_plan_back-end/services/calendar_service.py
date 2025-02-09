from icalendar import Calendar, Event, Timezone
import pytz
from datetime import datetime
from typing import Dict, Any
import logging

logger = logging.getLogger(__name__)

def create_calendar_event(schedule) -> Dict[str, Any]:
    """
    Creates an iCalendar event for a route schedule.
    
    Args:
        schedule: RouteSchedule instance
        
    Returns:
        Dict containing calendar object and time strings
        
    Raises:
        Exception: If there's an error creating the calendar event
    """
    try:
        # Create calendar
        cal = Calendar()
        cal.add('prodid', '-//Route Plan//Route Schedule//EN')
        cal.add('version', '2.0')
        cal.add('calscale', 'GREGORIAN')

        # Add timezone
        tz = pytz.timezone('UTC')
        vtimezone = Timezone()
        vtimezone.add('TZID', 'UTC')
        cal.add_component(vtimezone)

        # Get available times
        available_times = schedule.available_time.all()

        if not available_times:
            logger.warning(f"No available times found for schedule {schedule.id}")
            return {
                'calendar': cal,
                'start_time_str': "No Time Specified",
                'end_time_str': "No Time Specified"
            }

        # Create event
        event = Event()
        event.add('summary', f'Route Visit: {schedule.route.name}')

        # Calculate start and end times
        start_times = [
            datetime.combine(schedule.start_date, at.start_time).replace(tzinfo=pytz.UTC)
            for at in available_times
        ]
        end_times = [
            datetime.combine(schedule.start_date, at.end_time).replace(tzinfo=pytz.UTC)
            for at in available_times
        ]

        start_dt = min(start_times)
        end_dt = max(end_times)

        event.add('dtstart', start_dt)
        event.add('dtend', end_dt)

        # Add recurrence rule if end date is specified
        if schedule.end_date:
            until_date = datetime.combine(
                schedule.end_date,
                max([at.end_time for at in available_times])
            ).replace(tzinfo=pytz.UTC)

            # Get unique days of week
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

        # Format time strings
        start_time_str = min([at.start_time for at in available_times]).strftime('%I:%M %p')
        end_time_str = max([at.end_time for at in available_times]).strftime('%I:%M %p')

        return {
            'calendar': cal,
            'start_time_str': start_time_str,
            'end_time_str': end_time_str
        }

    except Exception as e:
        logger.error(f"Error creating calendar event: {str(e)}")
        raise