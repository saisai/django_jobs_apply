from django.db import models

# Create your models here.

class Thaijobcom(models.Model):

    title = models.CharField(max_length=500)
    link = models.TextField()
    #time = models.CharField(max_length=100)
    created_date = models.DateField()


    def __str__(self):
        return '%s %s %s' % (self.title, self.link, self.created_date)
        #return '%s %s %s %s' % (self.title, self.link, self.time, self.created_date)

    class Meta:
        db_table = "thaijobcom"
        ordering = ['id']