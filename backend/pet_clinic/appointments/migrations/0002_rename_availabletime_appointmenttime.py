# Generated by Django 4.2.17 on 2024-12-22 10:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='AvailableTime',
            new_name='AppointmentTime',
        ),
    ]
