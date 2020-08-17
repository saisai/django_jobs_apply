from celery import shared_task 

import os
from time import sleep
from shutil import copyfile

from django.core.mail import send_mail, EmailMessage
from django.conf import settings
from django.template.loader import render_to_string

@shared_task
def sleepy(duration):
    sleep(duration)
    return None
    
@shared_task    
def send_email_task(user_id, to_list, subject, template_name, context, filenames, sender):

    sleep(10)

    STUDENT_IMAGE_PATH = os.path.join(settings.MEDIA_ROOT)
        
    msg_html = render_to_string(template_name, context)
    
    msg = EmailMessage(subject, msg_html, sender, to_list)
    for ff in filenames:
        
        STUDENT_IMAGE = '{}/{}/{}'.format(STUDENT_IMAGE_PATH, user_id, ff)
        
        new_filename = STUDENT_IMAGE.split('.')
        new_filename_path = '/'.join(new_filename[0].split('/')[:-1])
        new_filename_result = '%s/%s.%s' % (new_filename_path, 'resume', new_filename[1])
        
        
        copyfile(STUDENT_IMAGE, new_filename_result)  # copy file 
        msg.attach_file(new_filename_result)
        os.remove(new_filename_result)                # remove file
        
        
    msg.content_subtype = "html"  # Main content is now text/html
    msg.send()    
    
    return None
    