# Generated by Django 4.1.7 on 2023-02-22 18:25

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipeitem',
            name='timestamp',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]