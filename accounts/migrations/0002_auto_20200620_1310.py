# Generated by Django 3.0.5 on 2020-06-20 06:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='apply',
            name='get_job_or_not',
            field=models.CharField(choices=[('', 'Choose yes or not'), ('1', 'Yes'), ('0', 'No')], default=0, max_length=1),
        ),
        migrations.AddField(
            model_name='apply',
            name='interview_desc',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='apply',
            name='interview_gone',
            field=models.CharField(choices=[('', 'Choose yes or not'), ('1', 'Yes'), ('0', 'No')], default=0, max_length=1),
        ),
    ]
