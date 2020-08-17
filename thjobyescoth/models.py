from django.db import models

# Create your models here.

class Jobyescoth(models.Model):

    title = models.CharField(max_length=500)
    link = models.TextField()
    created_date = models.DateField()


    def __str__(self):
        return '%s %s %s' % (self.title, self.link, self.created_date)


    class Meta:
        """To use table already exists"""
        db_table = "jobyes"
        ordering = ['id']
