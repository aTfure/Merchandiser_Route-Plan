from typing import Optional, List, Dict, Any
from django.core.mail import EmailMessage
from django.conf import settings
import logging
from dataclasses import dataclass
from django.template.loader import render_to_string
from services.calendar_service import create_calendar_event

# Configure logging
logger = logging.getLogger(__name__)

@dataclass
class EmailAttachment:
    filename: str
    content: bytes
    mimetype: str

class EmailServiceException(Exception):
    """Custom exception for email service errors"""
    pass

class EmailService:
    @staticmethod
    def send_email(
        subject: str,
        body: str,
        to_email: str,
        attachments: Optional[List[Dict[str, Any]]] = None,
        content_subtype: str = 'plain'
    ) -> bool:
        """
        Send an email with improved error handling and logging.
        
        Args:
            subject: Email subject
            body: Email body content
            to_email: Recipient email address
            attachments: List of attachment dictionaries
            content_subtype: Email content type (plain/html)
            
        Returns:
            bool: True if email was sent successfully, False otherwise
            
        Raises:
            EmailServiceException: If there's an error in email configuration
        """
        try:
            # Validate inputs
            if not to_email:
                raise EmailServiceException("Recipient email address is required")
            if not subject or not body:
                raise EmailServiceException("Subject and body are required")

            # Configure email
            email = EmailMessage(
                subject=subject,
                body=body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[to_email]
            )
            email.content_subtype = content_subtype

            # Attach files if provided
            if attachments:
                for attachment in attachments:
                    try:
                        email.attach(
                            attachment['filename'],
                            attachment['content'],
                            attachment['mimetype']
                        )
                    except KeyError as ke:
                        logger.error(f"Invalid attachment format: {ke}")
                        raise EmailServiceException(f"Invalid attachment format: {ke}")
                    except Exception as e:
                        logger.error(f"Error attaching file {attachment.get('filename')}: {str(e)}")
                        raise EmailServiceException(f"Error attaching file: {str(e)}")

            # Send email
            sent = email.send()
            if sent:
                logger.info(f"Email sent successfully to {to_email}")
                return True
            else:
                logger.error(f"Failed to send email to {to_email}")
                return False

        except Exception as e:
            logger.error(f"Error sending email to {to_email}: {str(e)}")
            raise EmailServiceException(f"Error sending email: {str(e)}")

def send_schedule_notification(schedule) -> bool:
    """
    Send schedule notification with enhanced error handling.
    
    Args:
        schedule: RouteSchedule instance
        
    Returns:
        bool: True if notification was sent successfully, False otherwise
    """
    try:
        # Validate required data
        if not schedule.route:
            logger.error("No route associated with schedule")
            return False
            
        merchandiser = schedule.route.merchandiser
        if not merchandiser or not merchandiser.email:
            logger.error(f"No merchandiser or email for route {schedule.route.name}")
            return False

        # Prepare calendar data
        try:
            calendar_data = create_calendar_event(schedule)
        except Exception as e:
            logger.error(f"Error creating calendar event: {str(e)}")
            return False

        # Format dates
        start_date_str = schedule.start_date.strftime("%d %b %Y")
        end_date_str = schedule.end_date.strftime("%d %b %Y") if schedule.end_date else None
        date_range_str = f"{start_date_str} - {end_date_str}" if end_date_str else start_date_str

        # Prepare schedule information
        available_times = schedule.available_time.all()
        days_of_week = sorted(set(at.day_of_week for at in available_times))
        day_names_list = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

        days_with_info = []
        for day_num in days_of_week:
            if 0 <= day_num < len(day_names_list):
                times_for_day = available_times.filter(day_of_week=day_num)
                days_with_info.append({
                    'day_name': day_names_list[day_num],
                    'times': [{
                        'start_time': at.start_time,
                        'end_time': at.end_time
                    } for at in times_for_day]
                })

        # Prepare email content
        context = {
            'schedule': schedule,
            'date_range_str': date_range_str,
            'days_with_info': days_with_info,
        }

        try:
            email_body = render_to_string('email/route_schedule_email.html', context)
        except Exception as e:
            logger.error(f"Error rendering email template: {str(e)}")
            return False

        # Send email
        return EmailService.send_email(
            subject=f'Route Visit Scheduled: {schedule.route.name} ({date_range_str})',
            body=email_body,
            to_email=merchandiser.email,
            attachments=[{
                'filename': 'route_schedule.ics',
                'content': calendar_data['calendar'].to_ical(),
                'mimetype': 'text/calendar'
            }],
            content_subtype='html'
        )

    except Exception as e:
        logger.error(f"Error in send_schedule_notification: {str(e)}")
        return False